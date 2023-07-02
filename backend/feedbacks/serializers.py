from rest_framework import serializers

from .models import DanceableFeedback, FeedbackPost


class BaseFeedbackListSerializer(serializers.Serializer):
    id = serializers.UUIDField(source='feedback_id')
    thumbnail = serializers.URLField(source='dancer_post.thumbnail')
    genre = serializers.CharField(source='dancer_post.genre')
    title = serializers.CharField(source='dancer_post.title')
    createDate = serializers.DateTimeField(source='create_date')
    status = serializers.CharField()


class DanceableFeedbackListSerializer(BaseFeedbackListSerializer):
    """
    댄서블 입장에서의 피드백 목록 (댄서의 닉네임이 보여야 함)
    """
    nickname = serializers.CharField(source='dancer_post.user.nickname')
    profileImage = serializers.URLField(source='dancer_post.user.profile_image')

    class Meta:
        model = FeedbackPost
        fields = ['id', 'thumbnail', 'genre', 'title',
                  'nickname', 'profileImage', 'status', 'createDate']
        ref_name = 'DanceableFeedbackPostListSerializer'


class DancerFeedbackListSerializer(BaseFeedbackListSerializer):
    """
    댄서 입장에서의 피드백 목록 (댄서블의 닉네임이 보여야 함)
    """
    nickname = serializers.CharField(source='user.nickname')
    profileImage = serializers.URLField(source='user.profile_image')

    class Meta:
        model = FeedbackPost
        fields = ['id', 'thumbnail', 'genre', 'title',
                  'nickname', 'profileImage', 'status', 'createDate']
        ref_name = 'DancerFeedbackListSerializer'


class DanceableFeedbackRequestSerializer(serializers.Serializer):
    """
    댄서블이 피드백을 요청하면 DB에 저장할 수 있도록 하는 시리얼라이저
    """
    sectionId = serializers.UUIDField(source='feedback_section_id')

    class Meta:
        model = DanceableFeedback
        fields = ['sectionId', 'message']


class FeedbackDetailSerializer(serializers.Serializer):
    """
    상세 페이지 조회 시 반환하는 시리얼라이저\n
    isDancer, nickname, sections는 뷰에서 넣어줌\n
    ___\n
    - title: 댄서 게시글 제목
    - createDate: 댄서블 피드백 생성 날짜
    - nickname: 댄서/댄서블 피드백 닉네임 (서로 반대되게)
    - userId: 댄서블 아이디
    - status: 댄서블 피드백 상태 (신청 전/대기 중/완료)
    - firstAiFeedback: 최초 AI 피드백 결과
    - bestAiFeedback: 최고 AI 피드백 결과
    - sections: 섹션 정보 담고 있는 리스트
    isDancer, nickname, sections는 뷰에서 넣어줌
    """
    profileImage = serializers.URLField(source='user.profile_image')
    title = serializers.CharField(source='dancer_post.title')
    createDate = serializers.CharField(source='create_date')
    userId = serializers.CharField(source='user.user_id')
    status = serializers.CharField()

    class Meta:
        model = DanceableFeedback
        fields = ['title', 'createDate', 'nickname', 'userId', 'profileImage', 'status']
