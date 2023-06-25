from rest_framework import serializers

from .models import ViewHistory
from posts.serializers.dancer_post_serializers import DancerPostInfoSerializer


class ViewHistorySerializer(serializers.ModelSerializer):
    """
    GET 요청이 들어오면 다음 Json을 받아 요청을 처리하는 Serializer
    ___
    - viewHistoryId: 아이디
    - viewDate: 마지막으로 조회한 날짜
    - dancerPost: 강사 게시판 객체
    """
    viewHistoryId = serializers.UUIDField(source='view_history_id')
    viewDate = serializers.DateTimeField(source='view_date')
    # dancerPost = serializers.PrimaryKeyRelatedField(source='dancer_post', queryset=DancerPost.objects.all())
    dancerPost = DancerPostInfoSerializer(source='dancer_post')

    class Meta:
        model = ViewHistory
        fields = ['viewHistoryId', 'viewDate', 'dancerPost']
