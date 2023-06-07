from .models import Comment
from rest_framework import serializers


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.nickname')

    class Meta:
        model = Comment
        fields = ['comment_id', 'user_id', 'nickname',
                  'content', 'create_date', 'post_id', 'user']
