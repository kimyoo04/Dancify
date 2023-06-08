from rest_framework import serializers

from .models import Comment


class GetSerializer(serializers.HyperlinkedModelSerializer):
    commentId = serializers.UUIDField(source='comment_id')
    userId = serializers.UUIDField(source='user.user_id')
    postId = serializers.UUIDField(source='post_id')
    nickname = serializers.CharField(source='user.nickname')
    createDate = serializers.DateField(source='create_date')

    class Meta:
        model = Comment
        fields = ['commentId', 'userId', 'nickname',
                  'content', 'createDate', 'postId']


class InputSerializer(serializers.HyperlinkedModelSerializer):
    postId = serializers.UUIDField(source='post_id')

    class Meta:
        model = Comment
        fields = ['postId', 'content']
