from rest_framework import serializers
from .models import File


class FileSerializer(serializers.ModelSerializer):
    path = serializers.FileField()

    class Meta:
        model = File
        fields = ['path', 'title']
