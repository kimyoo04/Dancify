from rest_framework import serializers

from .models import Like


class LikePostDeleteSerializer(serializers.HyperlinkedModelSerializer):
    """
    Post 요청이 들어오면 다음 Json을 받아 요청을 처리하는 Serializer
    ___
    - postCategory: 카테고리 설정 ()"FREE" | "VIDEO" | "DANCER")
    """
    postCategory = serializers.CharField(source='post_category')

    class Meta:
        model = Like
        fields = ['postCategory']
