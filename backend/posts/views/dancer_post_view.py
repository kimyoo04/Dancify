import re

from django.db.models import F

from rest_framework import status
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.exceptions import TokenError

from accounts.authentication import decode_access_token
from ..serializers.dancer_post_serializers import (
    DancerPostGetListSerializer,
    DancerPostGetRetrieveSerializer,
    DancerPostPostPatchSerializer
)
from .base_post_view import BasePostViewSet
from ..models import DancerPost
from accounts.models import User
from accounts.authentication import get_user_info_from_token
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

    @swagger_auto_schema(
        operation_summary='게시글 목록 조회',
        operation_description="""
            <ul>
                <li>postId: 아이디</li>
                <li>title: 게시글 제목</li>
                <li>nickname: 작성자 닉네임</li>
                <li>content: 게시글 내용</li>
                <li>createDate: 작성 일자</li>
                <li>video: 영상 URL</li>
                <li>feedbackPrice: 피드백 가격</li>
                <li>views: 게시글 조회수</li>
                <li>likesCount: 좋아요 개수</li>
                <li>commentsCount: 댓글 개수</li>
                <li>totalVideoLength: 전체 영상 길이</li>
                <li>totalPages: 전체 페이지 수</li>
                <li>currentPage: 현재 페이지</li>
                <li>totalCount: 총 게시글 수</li>
            </ul>
        """,
        responses={
            200: openapi.Response(
                'GET 요청을 보낼 시 게시글 목록을 반환합니다.',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'data': openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Schema(
                                type=openapi.TYPE_OBJECT,
                                properties={
                                    'postId': openapi.Schema(type=openapi.TYPE_STRING),
                                    'title': openapi.Schema(type=openapi.TYPE_STRING),
                                    'nickname': openapi.Schema(type=openapi.TYPE_STRING),
                                    'content': openapi.Schema(type=openapi.TYPE_STRING),
                                    'createDate': openapi.Schema(type=openapi.TYPE_STRING),
                                    'video': openapi.Schema(type=openapi.TYPE_STRING),
                                    'feedbackPrice': openapi.Schema(type=openapi.TYPE_INTEGER),
                                    'likesCount': openapi.Schema(type=openapi.TYPE_INTEGER),
                                    'commentsCount': openapi.Schema(type=openapi.TYPE_INTEGER),
                                    'totalVideoLength': openapi.Schema(type=openapi.TYPE_STRING),
                                }
                            )
                        ),
                        'totalPages': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'currentPage': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'totalCount': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                )
            )
        }
    )
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

    @swagger_auto_schema(
        operation_summary='게시글 조회',
        operation_description="""
            <ul>
                <li>postId: 아이디</li>
                <li>title: 게시글 제목</li>
                <li>nickname: 작성자 닉네임</li>
                <li>content: 게시글 내용</li>
                <li>createDate: 작성 일자</li>
                <li>video: 영상 URL</li>
                <li>feedbackPrice: 피드백 가격</li>
                <li>totalVideoLength: 전체 영상 길이</li>
                <li>views: 게시글 조회수</li>
                <li>userLike: 유저 좋아요 여부</li>
                <li>likesCount: 좋아요 개수</li>
                <li>comments: 댓글</li>
            </ul>
        """,
        responses={
            200: openapi.Response(
                'GET 요청을 보낼 시 게시글을 반환합니다.',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'postId': openapi.Schema(type=openapi.TYPE_STRING),
                        'title': openapi.Schema(type=openapi.TYPE_STRING),
                        'nickname': openapi.Schema(type=openapi.TYPE_STRING),
                        'content': openapi.Schema(type=openapi.TYPE_STRING),
                        'createDate': openapi.Schema(type=openapi.TYPE_STRING),
                        'video': openapi.Schema(type=openapi.TYPE_STRING),
                        'totalvideoLength': openapi.Schema(type=openapi.TYPE_STRING),
                        'views': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'userLike': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'likesCount': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'feedbackPrice': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'userId': openapi.Schema(type=openapi.TYPE_STRING),
                        'comments': openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Schema(
                                type=openapi.TYPE_OBJECT,
                                properties={
                                    'commentId': openapi.Schema(type=openapi.TYPE_STRING),
                                    'userId': openapi.Schema(type=openapi.TYPE_STRING),
                                    'nickname': openapi.Schema(type=openapi.TYPE_STRING),
                                    'content': openapi.Schema(type=openapi.TYPE_STRING),
                                    'createDate': openapi.Schema(type=openapi.TYPE_STRING),
                                }
                            )
                        )
                    }
                )
            )
        }
    )
    def retrieve(self, request, *args, **kwargs):
        post_id = kwargs['pk']
        try:
            access_token = request.COOKIES.get('Access-Token', None)
            user_info = decode_access_token(access_token)

            user_id = user_info['userId']
            user = User.objects.get(user_id=user_id)
            ViewHistory.objects.update_or_create(
                dancer_post=DancerPost.objects.get(post_id=post_id),
                user=user
            )

            return super().retrieve(request, *args, **kwargs)
        except (TokenError, KeyError, User.DoesNotExist):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @swagger_auto_schema(
        operation_summary='게시글 생성',
        operation_description="""
            <ul>
                <li>title: 게시글 제목</li>
                <li>content: 게시글 내용</li>
                <li>video: 영상 URL</li>
            </ul>
        """,
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'content': openapi.Schema(type=openapi.TYPE_STRING),
                'video': openapi.Schema(type=openapi.TYPE_STRING)
            },
            required=['title', 'content']
        ),
        responses={
            status.HTTP_201_CREATED: openapi.Response('게시글이 성공적으로 생성되었습니다.')
        }
    )
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

    @swagger_auto_schema(
        operation_summary='게시글 수정',
        operation_description="""
            <ul>
                <li>title: 게시글 제목</li>
                <li>content: 게시글 내용</li>
                <li>video: 영상 URL</li>
            </ul>
        """,
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'content': openapi.Schema(type=openapi.TYPE_STRING),
                'video': openapi.Schema(type=openapi.TYPE_STRING)
            },
            required=['title', 'content']
        ),
        responses={
            status.HTTP_200_OK: openapi.Response('게시글이 성공적으로 수정되었습니다.')
        }
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='게시글 삭제',
        responses={
            status.HTTP_204_NO_CONTENT: openapi.Response('게시글이 성공적으로 삭제되었습니다.')
        }
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
