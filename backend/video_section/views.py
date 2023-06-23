from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import VideoSectionListSerializer
from posts.models import DancerPost


class VideoSectionRetrieveView(APIView):
    serializer_class = VideoSectionListSerializer

    def get(self, request, post_id, format=None):
        try:
            dancer_post = DancerPost.objects.get(post_id=post_id)
        except DancerPost.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(dancer_post)
        return Response(serializer.data, status=status.HTTP_200_OK)
