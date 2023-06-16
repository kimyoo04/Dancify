from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.exceptions import TokenError

from accounts.authentication import decode_access_token
from .models import Like
from .serializers import LikePostDeleteSerializer
from accounts.models import User
from posts.models import FreePost, VideoPost, DancerPost
from posts.serializers.free_post_serializers import FreePostGetListSerializer
from posts.serializers.video_post_serializers import VideoPostGetListSerializer
from posts.serializers.dancer_post_serializers import DancerPostGetListSerializer


class PostPagination(PageNumberPagination):
    page_size = 20  # 페이지당 보여질 개체 수

    def get_paginated_response(self, data):
        return Response({
            'data': data,
            'totalPages': self.page.paginator.num_pages,
            'currentPage': self.page.number,
            'totalCount': self.page.paginator.count
        })


class GetLikedFreePosts(ListAPIView):
    pagination_class = PostPagination
    serializer_class = FreePostGetListSerializer

    def list(self, request, *args, **kwargs):
        try:
            access_token = request.COOKIES['Access-Token']
            user_info = decode_access_token(access_token)

            user_id = user_info['userId']
            post_ids = Like.objects.filter(post_category='FREE',
                                           user=User.objects.get(user_id=user_id)).values('post_id')
            self.queryset = FreePost.objects.filter(post_id__in=post_ids)
            return super().list(request, *args, **kwargs)
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class GetLikedVideoPosts(ListAPIView):
    pagination_class = PostPagination
    serializer_class = VideoPostGetListSerializer

    def list(self, request, *args, **kwargs):
        try:
            access_token = request.COOKIES['Access-Token']
            user_info = decode_access_token(access_token)

            user_id = user_info['userId']
            post_ids = Like.objects.filter(post_category='VIDEO',
                                           user=User.objects.get(user_id=user_id)).values('post_id')
            self.queryset = VideoPost.objects.filter(post_id__in=post_ids)
            return super().list(request, *args, **kwargs)
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class GetLikedDancerPosts(ListAPIView):
    pagination_class = PostPagination
    serializer_class = DancerPostGetListSerializer

    def list(self, request, *args, **kwargs):
        try:
            access_token = request.COOKIES['Access-Token']
            user_info = decode_access_token(access_token)

            user_id = user_info['userId']
            post_ids = Like.objects.filter(post_category='DANCER',
                                           user=User.objects.get(user_id=user_id)).values('post_id')
            self.queryset = DancerPost.objects.filter(post_id__in=post_ids)
            return super().list(request, *args, **kwargs)
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class LikeView(CreateAPIView, DestroyAPIView):
    """
    POST 요청을 받아 좋아요를 처리함
    만약 한 유저가 같은 게시글에 좋아요를 누를 시
    좋아요가 취소되는 기능을 제공함
    ___
    - postCategory: 게시글 카테고리 (FREE | VIDEO | DANCER)
    """
    queryset = Like.objects.all()
    serializer_class = LikePostDeleteSerializer
    lookup_field = 'post_id'

    def create(self, request, post_id, *args, **kwargs):

        try:
            access_token = request.COOKIES['Access-Token']
            user_info = decode_access_token(access_token)

            user_id = user_info['userId']

            query = Like.objects.filter(user=User.objects.get(user_id=user_id),
                                        post_id=post_id)
            if query.exists():
                query.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=User.objects.get(user_id=user_id),
                            post_id=post_id)

            return Response(status=status.HTTP_201_CREATED)
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
