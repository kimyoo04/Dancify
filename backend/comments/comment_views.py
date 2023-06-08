from .models import Comment
from .comment_serializers import GetSerializer, InputSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = GetSerializer

    def get_serializer_class(self):
        # 'create', 'update', 'partial_update' 에 대한 시리얼라이저 클래스 생성
        if self.action in ('create', 'update', 'partial_update'):
            return InputSerializer

        # 'retrieve', 'list' 에 대한 시리얼라이저 클래스 생성
        if self.action in ('retrieve', 'list'):
            return GetSerializer

        return super().get_serializer_class()

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
