from rest_framework import serializers
from accounts.authentication import decode_access_token
from rest_framework_simplejwt.exceptions import TokenError

from accounts.models import User
from ..models import DancerPost
from comments.models import Comment
from like.models import Like


class DancerPostInfoSerializer(serializers.ModelSerializer):
    """
    DancerPost의 기본 정보를 담고 있는 시리얼라이저
    _____
    - postId: 아이디
    - genre: 장르
    - title: 게시글 제목
    - userId: 작성자 아이디
    - nickname: 작성자 닉네임
    - profileImage: 프로필 이미지
    - content: 게시글 내용
    - createDate: 작성 일자
    - video: 영상 URL
    - thumbnail: 썸네일 URL
    - views: 게시글 조회수
    - !totalVideoLength: 전체 영상 길이
    - feedbackPrice: 피드백 가격
    """
    postId = serializers.UUIDField(source='post_id')
    userId = serializers.CharField(source='user.user_id')
    nickname = serializers.CharField(source='user.nickname')
    profileImage = serializers.URLField(source='user.profile_image')
    createDate = serializers.DateTimeField(source='create_date')
    feedbackPrice = serializers.IntegerField(source='feedback_price')

    class Meta:
        model = DancerPost
        ref_name = 'DancerPostInfoSerializer'
        fields = ['postId', 'genre', 'title', 'userId', 'nickname', 'profileImage',
                  'content', 'createDate', 'video', 'thumbnail',
                  'views', 'feedbackPrice']


class DancerPostGetListSerializer(DancerPostInfoSerializer):
    """
    GET 요청이 들어와 List 액션을 실행할 때
    다음 Json을 반환하는 Serializer

    _____
    - postId: 아이디
    - genre: 장르
    - title: 게시글 제목
    - userId: 작성자 아이디
    - nickname: 작성자 닉네임
    - profileImage: 프로필 이미지
    - content: 게시글 내용
    - createDate: 작성 일자
    - video: 영상 URL
    - thumbnail: 썸네일 URL
    - views: 게시글 조회수
    - likesCount: 좋아요 개수
    - commentsCount: 댓글 개수
    - !totalVideoLength: 전체 영상 길이
    - feedbackPrice: 피드백 가격
    """
    profileImage = serializers.URLField(source='user.profile_image')
    commentsCount = serializers.SerializerMethodField()
    likesCount = serializers.SerializerMethodField()

    def get_commentsCount(self, instance):
        return Comment.objects.filter(post_id=instance.post_id).count()

    def get_likesCount(self, instance):
        return Like.objects.filter(post_id=instance.post_id).count()

    class Meta:
        model = DancerPost
        fields = ['postId', 'genre', 'title', 'userId', 'nickname', 'profileImage',
                  'content', 'createDate', 'video', 'thumbnail', 'views',
                  'commentsCount', 'likesCount', 'feedbackPrice']
        ref_name = 'DancerPostGetListSerializer'


class DancerPostGetRetrieveSerializer(DancerPostInfoSerializer):
    """
    GET 요청이 들어와 Retrieve 액션을 실행할 때
    다음 Json을 반환하는 Serializer

    _____
    - postId: 아이디
    - genre: 장르
    - title: 게시글 제목
    - userId: 작성자 아이디
    - nickname: 작성자 닉네임
    - profileImage: 프로필 이미지
    - content: 게시글 내용
    - createDate: 작성 일자
    - video: 영상 URL
    - thumbnail: 썸네일 URL
    - totalVideoLength: 전체 영상 길이
    - views: 게시글 조회수
    - userLike: 유저 좋아요 여부
    - likesCount: 좋아요 개수
    - feedbackPrice: 피드백 가격
    - comments: 댓글 정보 리스트
    """
    profileImage = serializers.URLField(source='user.profile_image')
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
        except (KeyError, TokenError):
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
        model = DancerPost
        fields = ['postId', 'genre', 'title', 'userId', 'nickname', 'profileImage',
                  'content', 'createDate', 'video', 'thumbnail',
                  'views', 'likesCount', 'userLike', 'feedbackPrice', 'comments']
        ref_name = 'DancerPostGetRetrieveSerializer'


class DancerPostPostSerializer(serializers.HyperlinkedModelSerializer):
    """
    POST 요청이 들어오면 다음 Json을 받아 요청을 처리하는 Serializer

    ___
    - genre: 장르
    - title: 게시글 제목
    - content: 게시글 내용
    - video: 사진 URL
    """
    feedbackPrice = serializers.IntegerField(source='feedback_price')

    def validate(self, attrs):
        GENRES = ['basic', 'kpop']
        genre = attrs.get('genre')
        if genre and genre not in GENRES:
            raise serializers.ValidationError('올바른 장르를 선택해야 합니다.', code='invalid')
        return super().validate(attrs)

    class Meta:
        model = DancerPost
        fields = ['genre', 'title', 'content', 'video',
                  'thumbnail', 'feedbackPrice', 'keypoints']
        ref_name = 'DancerPostPostSerializer'


class DancerPostPatchSerializer(serializers.HyperlinkedModelSerializer):
    """
    PATCH 요청이 들어오면 다음 Json을 받아 요청을 처리하는 Serializer

    ___
    - genre: 장르
    - title: 게시글 제목
    - content: 게시글 내용
    - video: 사진 URL
    """
    feedbackPrice = serializers.IntegerField(source='feedback_price')

    def validate(self, attrs):
        GENRES = ['basic', 'kpop']
        genre = attrs.get('genre')
        if genre and genre not in GENRES:
            raise serializers.ValidationError('올바른 장르를 선택해야 합니다.', code='invalid')
        return super().validate(attrs)

    class Meta:
        model = DancerPost
        fields = ['genre', 'title', 'content', 'feedbackPrice']
        ref_name = 'DancerPostPatchSerializer'
