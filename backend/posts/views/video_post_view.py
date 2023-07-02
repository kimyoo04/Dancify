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
        return super().destroy(request, *args, **kwargs)
