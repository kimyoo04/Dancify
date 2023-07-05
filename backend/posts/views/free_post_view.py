import re

from django.db.models import F

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.exceptions import TokenError

from s3_modules.upload import upload_post_image_to_s3
from ..serializers.free_post_serializers import (
    FreePostGetListSerializer,
    FreePostGetRetrieveSerializer,
    FreePostPostPatchSerializer
)
from accounts.models import User
from accounts.authentication import get_user_info_from_token
from .base_post_view import BasePostViewSet
from ..models import FreePost
from search_history.models import SearchHistory
from s3_modules.authentication import get_s3_client

AWS_DOMAIN = "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/"


class FreePostViewSet(BasePostViewSet):
    queryset = FreePost.objects.all()
    pagination_class = BasePostViewSet.pagination_class
    lookup_field = 'post_id'

    def get_serializer_class(self):
        if self.action in ('list'):
            return FreePostGetListSerializer

        if self.action in ('retrieve'):
            return FreePostGetRetrieveSerializer

        if self.action in ('create', 'update', 'partial_update'):
            return FreePostPostPatchSerializer

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
        get_object_or_404(FreePost, post_id=kwargs['post_id'])

        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        post_image = request.FILES.get('postImage', None)

        if post_image is not None:
            data['postImage'] = upload_post_image_to_s3(user_id, post_image)

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
        postImage = request.FILES.get('postImage', None)

        if postImage is not None:
            data['postImage'] = upload_post_image_to_s3(user_id, postImage)

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')
        post = FreePost.objects.get(post_id=post_id)
        image_url = post.post_image

        # 해당 게시글이 이미지가 있는 경우
        if image_url is not None:
            file_key = image_url[len(AWS_DOMAIN):]
            bucket_name = 'dancify-bucket'
            try:
                s3 = get_s3_client()
                s3.delete_object(Bucket=bucket_name, Key=file_key)
            except Exception as e:
                print(f's3파일 삭제 실패: {e}')

        return super().destroy(request, *args, **kwargs)
