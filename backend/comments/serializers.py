from rest_framework import serializers

from .models import Comment


class CommentGetSerializer(serializers.ModelSerializer):
    commentId = serializers.UUIDField(source='comment_id')
    postId = serializers.UUIDField(source='post_id')
    nickname = serializers.CharField(source='user.nickname')
    createDate = serializers.DateField(source='create_date')

    class Meta:
        model = Comment
        fields = ['commentId', 'userId', 'nickname',
                  'content', 'createDate', 'postId']


class CommentPostSerializer(serializers.ModelSerializer):
    postId = serializers.UUIDField(source='post_id')

    class Meta:
        model = Comment
        fields = ['postId', 'content']


class CommentPatchDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content']
