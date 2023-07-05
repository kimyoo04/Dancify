import re

from django.db import transaction
from django.db.models import F

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.exceptions import TokenError

from ..serializers.video_post_serializers import (
    VideoPostGetListSerializer,
    VideoPostGetRetrieveSerializer,
    VideoPostPostPatchSerializer
)
from .base_post_view import BasePostViewSet
from ..models import VideoPost
from accounts.models import User
from accounts.authentication import get_user_info_from_token
from s3_modules.upload import upload_video_with_metadata_to_s3

from search_history.models import SearchHistory
from s3_modules.authentication import get_s3_client

AWS_DOMAIN = "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/"


class VideoPostViewSet(BasePostViewSet):
    queryset = VideoPost.objects.all()
    pagination_class = BasePostViewSet.pagination_class
    lookup_field = 'post_id'

    def get_serializer_class(self):
        if self.action in ('list'):
            return VideoPostGetListSerializer

        if self.action in ('retrieve'):
            return VideoPostGetRetrieveSerializer

        if self.action in ('create', 'update', 'partial_update'):
            return VideoPostPostPatchSerializer

    def list(self, request, *args, **kwargs):
        q = self.request.GET.get('q', None)

        if q is not None and q.strip() != '':
            q = re.sub(r'\s+', ' ', q.strip())
            search_history, created = SearchHistory.objects.update_or_create(
                search_keyword=q,
                defaults={'post_category': 'VIDEO'}
            )

            if not created:
                search_history.search_count = F('search_count') + 1
                search_history.save()

        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        get_object_or_404(VideoPost, post_id=kwargs['post_id'])

        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        if data['mosaic'] == 'true':
            is_mosaic = True
        else:
            is_mosaic = False

        if data['video'] is not None:
            url_data = upload_video_with_metadata_to_s3(user_id, data['video'],
                                                        'boast', is_mosaic)
            data['video'] = url_data['video_url']
            data['thumbnail'] = url_data['thumbnail_url']

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=User.objects.get(user_id=user_id))

        return Response(status=status.HTTP_201_CREATED)

    @transaction.atomic
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
        video = request.FILES.get('video', None)

        if video is not None:
            url_data = upload_video_with_metadata_to_s3(user_id, video,
                                                        'dancer', is_mosaic=False)
            data['video'] = url_data['video_url']
            data['thumbnail'] = url_data['thumbnail_url']

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')
        post = VideoPost.objects.get(post_id=post_id)
        video_url = post.video

        # 확장자 .m3u8 제거
        video_uuid = video_url.split('/')[-1][:-5]

        if video_url is not None:
            try:
                # input 버킷의 원본 동영상 삭제
                s3 = get_s3_client()
                bucket_name = 'dancify-input'
                s3_response = s3.list_objects_v2(Bucket=bucket_name)

                for obj in s3_response['Contents']:
                    if video_uuid in obj['Key']:
                        s3.delete_object(Bucket=bucket_name, Key=obj['Key'])

                # output 버킷의 스트리밍 파일 삭제
                bucket_name = 'dancify-output'
                s3_response = s3.list_objects_v2(Bucket=bucket_name)

                for obj in s3_response['Contents']:
                    if video_uuid in obj['Key']:
                        s3.delete_object(Bucket=bucket_name, Key=obj['Key'])

            except Exception as e:
                print(f's3파일(동영상) 삭제 실패: {e}')

        return super().destroy(request, *args, **kwargs)
