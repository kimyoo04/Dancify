# from .models import Comment
# from comments.serializer import CommentSerializer
# from rest_framework import viewsets
# from rest_framework.response import Response
# from rest_framework import status

# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer

#     def perform_create(self, serializer):
#         post_id = self.request.POST.get('post_id')
#         serializer.save(user=self.request.user, post_id=post_id)

#     def create(self, request, *args, **kwargs):
#         response = super().create(request, *args, **kwargs)
#         return Response("성공", status=status.HTTP_201_CREATED)

from .models import Comment
from comments.serializer import CommentSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        post_id = self.request.POST.get('post_id')
        serializer.save(user=self.request.user, post_id=post_id)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response("성공", status=status.HTTP_201_CREATED, headers=headers)
