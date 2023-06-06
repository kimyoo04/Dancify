from rest_framework import viewsets, status
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from . import freepost_serializers
from .models import FreePost


class FreePostViewSet(viewsets.ModelViewSet):
    queryset = FreePost.objects.all()
    serializer_class = freepost_serializers.GetSerializer

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update'):
            return freepost_serializers.InputSerializer

        if self.action in ('retrieve', 'list'):
            return freepost_serializers.GetSerializer

        return super().get_serializer_class()

    @swagger_auto_schema(
        operation_summary='게시글 목록 조회',
        operation_description="""
            <ul>
                <li>postId: 아이디</li>
                <li>title: 게시글 제목</li>
                <li>nickname: 작성자 닉네임</li>
                <li>content: 게시글 내용</li>
                <li>createDate: 작성 일자</li>
                <li>postImage: 사진 URL</li>
                <li>views: 게시글 조회수</li>
                <li>commentsCount: 댓글 개수</li>
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
                                    'postImage': openapi.Schema(type=openapi.TYPE_STRING),
                                    'views': openapi.Schema(type=openapi.TYPE_INTEGER),
                                    'commentsCount': openapi.Schema(type=openapi.TYPE_INTEGER),
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
        queryset = FreePost.objects.all()
        serializer = freepost_serializers.GetSerializer(queryset, many=True)

        data = {
            'data': serializer.data,
            'totalPages': 10,
            'currentPage': 1,
            'totalCount': queryset.count()
        }

        return Response(data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary='게시글 조회',
        operation_description="""
            <ul>
                <li>postId: 아이디</li>
                <li>title: 게시글 제목</li>
                <li>nickname: 작성자 닉네임</li>
                <li>content: 게시글 내용</li>
                <li>createDate: 작성 일자</li>
                <li>postImage: 사진 URL</li>
                <li>views: 게시글 조회수</li>
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
                        'postImage': openapi.Schema(type=openapi.TYPE_STRING),
                        'views': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'userPK': openapi.Schema(type=openapi.TYPE_STRING)
                        # !댓글 추가해야 함
                    }
                )
            )
        }
    )
    def retrieve(self, request, *args, **kwargs):
        post_id = request.GET.get('post_id')
        if post_id:
            try:
                post = FreePost.objects.get(post_id=post_id)
                serializer = freepost_serializers.GetSerializer(post)

                data = serializer.data
                # data['comments'] = []
                data['user'] = post.user.pk

                return Response(data, status=status.HTTP_200_OK)
            except FreePost.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # @login_required
    @swagger_auto_schema(
        operation_summary='게시글 생성',
        operation_description="""
            <ul>
                <li>title: 게시글 제목</li>
                <li>content: 게시글 내용</li>
                <li>postImage: 사진 URL</li>
            </ul>
        """,
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'content': openapi.Schema(type=openapi.TYPE_STRING),
                'postImage': openapi.Schema(type=openapi.TYPE_STRING)
            },
            required=['title', 'content']
        ),
        responses={
            status.HTTP_201_CREATED: openapi.Response('게시글이 성공적으로 생성되었습니다.')
        }
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            serializer.save(user=self.request.user)
            self.perform_create(serializer)

            return Response(status=status.HTTP_201_CREATED)
        except PermissionError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @swagger_auto_schema(
        operation_summary='게시글 수정',
        operation_description="""
            <ul>
                <li>title: 게시글 제목</li>
                <li>content: 게시글 내용</li>
                <li>postImage: 사진 URL</li>
            </ul>
        """,
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'content': openapi.Schema(type=openapi.TYPE_STRING),
                'postImage': openapi.Schema(type=openapi.TYPE_STRING)
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
