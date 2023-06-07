from rest_framework import serializers

from .models import FreePost


class GetSerializer(serializers.HyperlinkedModelSerializer):
    """
    GET 요청이 들어오면 다음 Json을 반환하는 Serializer

    _____
    - postId: 아이디
    - title: 게시글 제목
    - nickname: 작성자 닉네임
    - content: 게시글 내용
    - createDate: 작성 일자
    - postImage: 사진 URL
    - views: 게시글 조회수
    """
    postId = serializers.UUIDField(source='post_id')
    nickname = serializers.CharField(source='user.nickname')
    createDate = serializers.DateField(source='create_date')
    postImage = serializers.URLField(source='post_image')
    userPK = serializers.UUIDField(source='user.user_pk')

    class Meta:
        model = FreePost
        fields = ['postId', 'title', 'nickname', 'content',
                  'createDate', 'postImage', 'views', 'userPK']


class InputSerializer(serializers.HyperlinkedModelSerializer):
    """
    POST, PATCH 요청이 들어오면 다음 Json을 받아 요청을 처리하는 Serializer

    ___
    - title: 게시글 제목
    - content: 게시글 내용
    - postImage: 사진 URL
    """
    postImage = serializers.URLField(source='post_image',
                                     required=False, allow_blank=True)

    class Meta:
        model = FreePost
        fields = ['title', 'content', 'postImage']
