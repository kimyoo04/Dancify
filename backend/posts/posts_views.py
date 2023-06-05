from rest_framework import viewsets
from . import serializers

from .models import FreePost


class FreePostViewSet(viewsets.ModelViewSet):
    queryset = FreePost.objects.all()
    serializer_class = serializers.FreePostSerializer

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update'):
            return serializers.FreePostInputSerializer
        return super().get_serializer_class()
