import re
import os

from django.conf import settings
from django.http import JsonResponse
from django.db import transaction
from django.db.models import F
from django.core.exceptions import ValidationError

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError

from ..serializers.dancer_post_serializers import (
    DancerPostInfoSerializer,
    DancerPostGetListSerializer,
    DancerPostGetRetrieveSerializer,
    DancerPostPostSerializer,
    DancerPostPatchSerializer,
)
from video_section.models import VideoSection
from .base_post_view import BasePostViewSet
from ..models import DancerPost
from accounts.models import User
from accounts.authentication import get_user_info_from_token, is_logined
from s3_modules.upload import (
    upload_video_with_metadata_to_s3,
    upload_splitted_video_to_s3,
)
from view_history.models import ViewHistory
from search_history.models import SearchHistory


class DancerPostViewSet(BasePostViewSet):
    lookup_field = 'post_id'
    queryset = DancerPost.objects.all()
    pagination_class = BasePostViewSet.pagination_class

    def get_serializer_class(self):
        if self.action in ('list'):
            return DancerPostGetListSerializer

        if self.action in ('retrieve'):
            return DancerPostGetRetrieveSerializer

        if self.action in ('create'):
            return DancerPostPostSerializer

        if self.action in ('update', 'partial_update'):
            return DancerPostPatchSerializer

    def list(self, request, *args, **kwargs):
        q = self.request.GET.get('q', None)
        genre = self.request.GET.get('genre', None)

        if q is not None and q.strip() != '':
            q = re.sub(r'\s+', ' ', q.strip())
            search_history, created = SearchHistory.objects.update_or_create(
                search_keyword=q,
                defaults={'post_category': 'VIDEO'}
            )

            if not created:
                search_history.search_count = F('search_count') + 1
                search_history.save()

        if genre is not None:
            self.queryset = self.queryset.filter(genre=genre)

        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        post_id = kwargs['post_id']

        if is_logined(request):
            try:
                user_info = get_user_info_from_token(request)

                user_id = user_info['userId']
                user = User.objects.get(user_id=user_id)
                ViewHistory.objects.update_or_create(
                    dancer_post=DancerPost.objects.get(post_id=post_id),
                    user=user
                )

                return super().retrieve(request, *args, **kwargs)
            except (User.DoesNotExist):
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            except (DancerPost.DoesNotExist):
                return Response(status=status.HTTP_404_NOT_FOUND)
            except (TokenError, KeyError):
                return super().retrieve(request, *args, **kwargs)

        return super().retrieve(request, *args, **kwargs)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
            is_dancer = user_info['isDancer']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # 댄서 게시판 글 생성은 댄서만 가능
        if not is_dancer:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 댄서 게시글 저장
        data = request.data
        video = request.FILES.get('video', None)

        if video is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        url_data = upload_video_with_metadata_to_s3(user_id, video,
                                                    'dancer', is_mosaic=False)
        data['video'] = url_data['video_url']
        data['thumbnail'] = url_data['thumbnail_url']
        data['keypoints'] = url_data['keypoint_url']

        # 동영상 분할을 위한 비디오 .mp4 파일 임시 저장
        localpath = settings.BASE_DIR  # 프로젝트 최상위 폴더
        localpath = os.path.join(localpath, 'tmp_video')  # 현재 폴더/tmp_video/
        os.makedirs(localpath, exist_ok=True)  # 폴더 생성

        video = request.FILES['video']
        local_videopath = os.path.join(localpath, 'video_original.' + video.name.split('.')[-1])

        with open(local_videopath, 'wb') as destination:
            for chunk in video.chunks():
                destination.write(chunk)

        try:
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save(user=User.objects.get(user_id=user_id))
        except ValidationError:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # 실전모드를 위해 section_number 0번에 전체 동영상 링크 저장
        section_data = {
            'video': url_data['video_url'],
            'thumbnail': url_data['thumbnail_url'],
            'section_number': 0,
            'keypoints': url_data['keypoint_url']
        }

        video_section = VideoSection(**section_data)
        video_section.dancer_post = DancerPost.objects.get(post_id=instance.pk)

        try:
            video_section.full_clean()
            video_section.save()
        except ValidationError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        response_data = {
            'postId': instance.pk,
            'video': instance.video
        }

        return JsonResponse(response_data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        instance = self.get_object()
        if instance.user.user_id != user_id:
            return Response(status=status.HTTP_403_FORBIDDEN)

        data = request.data

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class RandomRecommandationAPIView(ListAPIView):
    serializer_class = DancerPostInfoSerializer

    def get_queryset(self):
        queryset = DancerPost.objects.order_by('?')[:5]
        return queryset


class VideoSplitView(APIView):
    """
    입력받은 타임스탬프대로 분할해주는 뷰
    postId와 timeStamps를 폼 데이터로 입력받아 분할된 영상을 DB에 저장합니다.

    POST  /api/posts/dancer/sections
    {
        "postId": 댄서 게시글 아이디,
        "timeStamps": "2 5 7 13" (공백으로 구분)
    }
    """
    def post(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)
            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        post_id = request.data.get('postId', None)

        # 영상 분할
        result = upload_splitted_video_to_s3(request, user_id)

        for idx, section in enumerate(result):
            section_data = {
                'video': section['video_url'],
                'thumbnail': section['thumbnail_url'],
                'section_number': idx + 1,
                'keypoints': section['keypoint_url']
            }

            video_section = VideoSection(**section_data)
            video_section.dancer_post = DancerPost.objects.get(post_id=post_id)

            try:
                video_section.full_clean()
                video_section.save()
            except ValidationError:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_201_CREATED)
