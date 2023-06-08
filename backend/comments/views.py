from .models import Comment
from .serializers import CommentSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            post_id = self.request.POST.get('post_id')
            serializer.save(user=self.request.user, post_id=post_id)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            return Response("성공", status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)