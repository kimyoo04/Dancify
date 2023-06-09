from rest_framework import serializers

from .models import Comment


class CommentGetSerializer(serializers.HyperlinkedModelSerializer):
    commentId = serializers.UUIDField(source='comment_id')
    postId = serializers.UUIDField(source='post_id')
    nickname = serializers.CharField(source='user.nickname')
    createDate = serializers.DateField(source='create_date')

    class Meta:
        model = Comment
        fields = ['commentId', 'userId', 'nickname',
                  'content', 'createDate', 'postId']


class CommentPostSerializer(serializers.HyperlinkedModelSerializer):
    postId = serializers.UUIDField(source='post_id')
    boardCategory = serializers.CharField(source='board_category')

    class Meta:
        model = Comment
        fields = ['postId', 'content', 'boardCategory']


class CommentPatchDeleteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ['content']
