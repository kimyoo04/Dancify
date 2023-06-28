from rest_framework import serializers

from .models import DanceableFeedback


class BaseFeedbackListSerializer(serializers.Serializer):
    feedbackId = serializers.UUIDField(source='feedback_post.feedback_id')
    thumbnail = serializers.URLField(source='feedback_post.dancer_post.thumbnail')
    genre = serializers.CharField(source='feedback_post.dancer_post.genre')
    title = serializers.CharField(source='feedback_post.dancer_post.title')
    createDate = serializers.DateTimeField(source='create_date')


class DanceableFeedbackListSerializer(BaseFeedbackListSerializer):
    """
    댄서블 입장에서의 피드백 목록 (댄서의 닉네임이 보여야 함)
    """
    nickname = serializers.CharField(source='feedback_post.dancer_post.user.nickname')
    status = serializers.CharField()

    class Meta:
        model = DanceableFeedback
        fields = ['feedbackId', 'thumbnail', 'genre', 'title',
                  'nickname', 'status', 'createDate']
        ref_name = 'DanceableFeedbackPostListSerializer'


class DancerFeedbackListSerializer(BaseFeedbackListSerializer):
    """
    댄서 입장에서의 피드백 목록 (댄서블의 닉네임이 보여야 함)
    """
    nickname = serializers.CharField(source='user.nickname')
    status = serializers.CharField()

    class Meta:
        model = DanceableFeedback
        fields = ['feedbackId', 'thumbnail', 'genre', 'title',
                  'nickname', 'status', 'createDate']
        ref_name = 'DancerFeedbackListSerializer'


class DanceableFeedbackRequestSerializer(serializers.Serializer):
    """
    댄서블이 피드백을 요청하면 DB에 저장할 수 있도록 하는 시리얼라이저
    """
    sectionId = serializers.UUIDField(source='feedback_section_id')

    class Meta:
        model = DanceableFeedback
        fields = ['sectionId', 'message']
