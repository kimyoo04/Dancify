from rest_framework import serializers

from .models import Like


class LikePostDeleteSerializer(serializers.ModelSerializer):
    """
    Post 요청이 들어오면 다음 Json을 받아 요청을 처리하는 Serializer
    ___
    - postCategory: 카테고리 설정 ()"FREE" | "VIDEO" | "DANCER")
    """
    postCategory = serializers.CharField(source='post_category')

    class Meta:
        model = Like
        fields = ['postCategory']
        ref_name = 'LikePostDeleteSerializer'

    def validate(self, attrs):
        CATEGORY_CHOICES = ['FREE', 'VIDEO', 'DANCER']
        post_category = attrs.get('post_category')
        if post_category not in CATEGORY_CHOICES:
            raise serializers.ValidationError('올바른 카테고리를 선택해야 합니다.', code='invalid')
        return super().validate(attrs)
