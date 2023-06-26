import re

from django.db.models import F

from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError

from ..serializers.dancer_post_serializers import (
    DancerPostGetListSerializer,
    DancerPostGetRetrieveSerializer,
    DancerPostPostPatchSerializer
)
from .base_post_view import BasePostViewSet
from ..models import DancerPost
from accounts.models import User
from accounts.authentication import get_user_info_from_token, is_logined
from s3_modules.upload import upload_video_with_metadata_to_s3
from view_history.models import ViewHistory
from search_history.models import SearchHistory


class DancerPostViewSet(BasePostViewSet):
    queryset = DancerPost.objects.all()
    pagination_class = BasePostViewSet.pagination_class

    def get_serializer_class(self):
        if self.action in ('list'):
            return DancerPostGetListSerializer

        if self.action in ('retrieve'):
            return DancerPostGetRetrieveSerializer

        if self.action in ('create', 'update', 'partial_update'):
            return DancerPostPostPatchSerializer

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
        post_id = kwargs['pk']

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
            except (TokenError, KeyError):
                return super().retrieve(request, *args, **kwargs)

        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        data = request.data

        if data['video'] is not None:
            url_data = upload_video_with_metadata_to_s3(user_id, data['video'],
                                                        'dancer', is_mosaic=False)
            data['video'] = url_data['video_url']
            data['thumbnail'] = url_data['thumbnail_url']

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=User.objects.get(user_id=user_id))

        return Response(status=status.HTTP_201_CREATED)

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
        return super().destroy(request, *args, **kwargs)
