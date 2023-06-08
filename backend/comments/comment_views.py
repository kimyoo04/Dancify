from .models import Comment
from .comment_serializers import CommentGetSerializer, CommentInputSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentGetSerializer
    lookup_field = 'comment_id'

    def get_serializer_class(self):
        # 'create', 'update', 'partial_update' 에 대한 시리얼라이저 클래스 생성
        if self.action in ('create', 'update', 'partial_update'):
            return CommentInputSerializer

        return super().get_serializer_class()

    @swagger_auto_schema(
        operation_summary='댓글 생성'
    )
    def create(self, request, *args, **kwargs):
        # 요청 데이터에 대한 시리얼라이저 생성
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            serializer.save(user_id=self.request.user)
            self.perform_create(serializer)

            return Response("성공", status=status.HTTP_201_CREATED)
        except PermissionError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


comment_create = CommentViewSet.as_view({
    'post': 'create',
})

comment_delete_patch = CommentViewSet.as_view({
    'delete': 'destroy',
    'patch': 'partial_update'
})
