from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import FileSerializer


class FileViewSet(APIView):

    def post(self, request):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
