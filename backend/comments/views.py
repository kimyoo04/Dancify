from rest_framework import viewsets, status
from rest_framework.response import Response

from accounts.authentication import decode_access_token
from .models import Comment
from .serializers import CommentGetSerializer, CommentPostSerializer, CommentPatchDeleteSerializer
from accounts.models import User


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentGetSerializer
    lookup_field = 'comment_id'

    def get_serializer_class(self):
        if self.action in ('create'):
            return CommentPostSerializer

        if self.action in ('partial_update', 'destroy'):
            return CommentPatchDeleteSerializer

        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            access_token = request.COOKIES['Access-Token']
            user_info = decode_access_token(access_token)

            user_id = user_info['userId']
            serializer.save(user=User.objects.get(user_id=user_id))

            return Response(status=status.HTTP_201_CREATED)
        except PermissionError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


comment_create = CommentViewSet.as_view({
    'post': 'create',
})

comment_patch_delete = CommentViewSet.as_view({
    'delete': 'destroy',
    'patch': 'partial_update'
})
