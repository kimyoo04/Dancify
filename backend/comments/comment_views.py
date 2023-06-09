from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Comment
from .comment_serializers import CommentGetSerializer, \
                                CommentPostSerializer, \
                                CommentPatchDeleteSerializer


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
            serializer.save(user=self.request.user)

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
