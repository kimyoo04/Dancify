from rest_framework import serializers
from accounts.authentication import decode_access_token

from accounts.models import User
from ..models import VideoPost
from comments.models import Comment
from like.models import Like


class VideoPostGetListSerializer(serializers.ModelSerializer):
    """
    GET 요청이 들어와 List 액션을 실행할 때
    다음 Json을 반환하는 Serializer

    _____
    - postId: 아이디
    - title: 게시글 제목
    - nickname: 작성자 닉네임
    - profileImage: 프로필 이미지
    - content: 게시글 내용
    - createDate: 작성 일자
    - video: 영상 URL
    - views: 게시글 조회수
    - likesCount: 좋아요 개수
    - commentsCount: 댓글 개수
    - totalVideoLength: 전체 영상 길이
    """
    postId = serializers.UUIDField(source='post_id')
    nickname = serializers.CharField(source='user.nickname')
    profileImage = serializers.URLField(source='user.profile_image')
    createDate = serializers.DateTimeField(source='create_date')
    commentsCount = serializers.SerializerMethodField()
    likesCount = serializers.SerializerMethodField()

    def get_commentsCount(self, instance):
        return Comment.objects.filter(post_id=instance.post_id).count()

    def get_likesCount(self, instance):
        return Like.objects.filter(post_id=instance.post_id).count()

    class Meta:
        model = VideoPost
        fields = ['postId', 'title', 'nickname', 'profileImage', 'content',
                  'createDate', 'video', 'thumbnail', 'views',
                  'commentsCount', 'likesCount']
        ref_name = 'VideoPostGetListSerializer'


class VideoPostGetRetrieveSerializer(serializers.ModelSerializer):
    """
    GET 요청이 들어와 Retrieve 액션을 실행할 때
    다음 Json을 반환하는 Serializer

    _____
    - postId: 아이디
    - title: 게시글 제목
    - userId: 작성자 아이디
    - nickname: 작성자 닉네임
    - profileImage: 프로필 이미지
    - content: 게시글 내용
    - createDate: 작성 일자
    - video: 영상 URL
    - totalVideoLength: 전체 영상 길이
    - views: 게시글 조회수
    - userLike: 유저 좋아요 여부
    - likesCount: 좋아요 개수
    - comments: 댓글 정보 리스트
    """
    postId = serializers.UUIDField(source='post_id')
    userId = serializers.CharField(source='user.user_id')
    nickname = serializers.CharField(source='user.nickname')
    profileImage = serializers.URLField(source='user.profile_image')
    createDate = serializers.DateTimeField(source='create_date')
    likesCount = serializers.SerializerMethodField()
    userLike = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    def get_likesCount(self, instance):
        return Like.objects.filter(post_id=instance.post_id).count()

    def get_userLike(self, instance):
        try:
            access_token = self.context['request'].COOKIES['Access-Token']
            user_info = decode_access_token(access_token)

            user_id = user_info['userId']
            return Like.objects.filter(post_id=instance.post_id, user=User.objects.get(user_id=user_id)).exists()
        except KeyError:
            return False

    def get_comments(self, instance):
        comments = Comment.objects.filter(post_id=instance.post_id).order_by('create_date')
        # 직렬화하기 위해 리스트로 변환
        serialized_comments = []
        for comment in comments:
            serialized_comment = {
                'commentId': comment.comment_id,
                'userId': comment.user.user_id,
                'nickname': comment.user.nickname,
                'profileImage': comment.user.profile_image,
                'content': comment.content,
                'createDate': comment.create_date
            }
            serialized_comments.append(serialized_comment)
        return serialized_comments

    class Meta:
        model = VideoPost
        fields = ['postId', 'title', 'userId', 'nickname', 'profileImage',
                  'content', 'createDate', 'video', 'thumbnail',
                  'views', 'likesCount', 'userLike', 'comments']
        ref_name = 'VideoPostGetRetrieveSerializer'


class VideoPostPostPatchSerializer(serializers.HyperlinkedModelSerializer):
    """
    POST, PATCH 요청이 들어오면 다음 Json을 받아 요청을 처리하는 Serializer

    ___
    - title: 게시글 제목
    - content: 게시글 내용
    - video: 사진 URL
    """
    class Meta:
        model = VideoPost
        fields = ['title', 'content', 'video', 'thumbnail']
        ref_name = 'VideoPostPostPatchSerializer'
