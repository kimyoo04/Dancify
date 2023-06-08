from .models import Comment
# from comments.serializer import CommentSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response


from . import comment_serializers
# from . import serializers as comment_serializers
# from comment_serializers import GetSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = comment_serializers.GetSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            post_id = self.request.POST.get('post_id')
            serializer.save(user=self.request.user, post_id=post_id)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            return Response("성공", status=status.HTTP_201_CREATED, headers=headers)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)