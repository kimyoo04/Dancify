from rest_framework import serializers

from .models import FreePost


class FreePostSerializer(serializers.HyperlinkedModelSerializer):
    createDate = serializers.DateField(source='create_date')
    postImage = serializers.CharField(source='post_image')

    class Meta:
        model = FreePost
        fields = ['title', 'author', 'content', 'createDate', 'postImage']


class FreePostInputSerializer(serializers.HyperlinkedModelSerializer):
    postImage = serializers.CharField(source='post_image')

    class Meta:
        model = FreePost
        fields = ['title', 'content', 'postImage']
