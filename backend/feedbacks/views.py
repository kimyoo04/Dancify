from django.core.exceptions import ValidationError

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework_simplejwt.exceptions import TokenError

from .models import DanceableFeedback, DancerFeedback, FeedbackPost, TimeStamp
from .serializers import (
    DancerFeedbackListSerializer,
    DanceableFeedbackListSerializer,
    DanceableFeedbackRequestSerializer,
    FeedbackDetailSerializer,
)
from accounts.models import User
from accounts.authentication import get_user_info_from_token


class FeedbackListAPIView(ListAPIView):
    """
    피드백 동영상 목록 조회
    """
    serializer_class = DanceableFeedbackListSerializer
    queryset = DanceableFeedback.objects.all()

    def list(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        user = User.objects.get(user_id=user_id)

        # 로그인한 유저가 댄서인 경우
        if user.is_dancer:
            self.queryset = DanceableFeedback.objects.filter(feedback_post__dancer_post__user=user)
            self.queryset = self.queryset.exclude(status='신청 전')
            self.serializer_class = DancerFeedbackListSerializer
        else:
            self.queryset = DanceableFeedback.objects.filter(feedback_post__user=user)
            self.serializer_class = DanceableFeedbackListSerializer

        return super().list(request, *args, **kwargs)


class DanceableFeedbackRequestView(UpdateAPIView):
    """
    댄서블이 피드백을 요청하였을 경우 DB에 메시지를 저장하는 뷰

    PATCH  /api/feedbacks/danceable
    {
        "sections": [{
            "sectionId": feedback_section_id,
            "message": 댄서에게 전달하고 싶은 메시지
        }]
    }
    """
    serializer_class = DanceableFeedbackRequestSerializer

    def update(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        sections = request.data.get('sections', [])

        for section in sections:
            section_id = section.get('sectionId', None)
            message = section.get('message', None)

            try:
                feedback = DanceableFeedback.objects.get(feedback_section_id=section_id)

                # 로그인한 유저와 피드백 포스트 작성자가 일치하지 않을 경우
                if user_id != feedback.feedback_post.user.user_id:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)

                feedback.message = message
                feedback.feedback_post.status = '대기 중'
                feedback.full_clean()
                feedback.save()
            except DanceableFeedback.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            except ValidationError:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


class DancerFeedbackResponseView(RetrieveAPIView):
    """
    피드백 요청 상세페이지를 반환하는 뷰

    <종류>
    - 댄서블(신청 전)
    - 댄서블(대기 중)
    - 댄서블(완료)
    - 댄서(대기 중)
    - 댄서(완료)
    총 5가지 종류의 페이지가 있음

    GET  /api/feedbacks/<feedback_id>
    """
    serializer_class = FeedbackDetailSerializer
    lookup_field = 'feedback_id'

    def retrieve(self, request, feedback_id, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
            is_dancer = user_info['isDancer']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # 엔드포인트에서 입력받은 feedback_id를 가지고 댄서블 피드백 상세페이지 조회
        # title, createDate, userId, nickname, status, isDancer,
        feedback = FeedbackPost.objects.get(feedback_id=feedback_id)

        serializer = self.get_serializer(feedback)
        serializer_data = serializer.data

        if is_dancer:
            serializer_data['nickname'] = feedback.user.nickname
        else:
            serializer_data['nickname'] = feedback.dancer_post.user.nickname

        danceable_feedbacks = DanceableFeedback.objects.filter(feedback_post__feedback_id=feedback_id)

        sections = []
        for danceable_feedback in danceable_feedbacks:
            # dancer_feedback = DancerFeedback.objects.get(danceable_feedback=danceable_feedback)
            # timestamps = TimeStamp.objects.filter(dancer_feedback=dancer_feedback)

            # dancer_messages = []
            # for timestamp in timestamps:
            #     dancer_message = {
            #         'timeStamp': timestamp.timestamp,
            #         'message': timestamp.message
            #     }
            #     dancer_messages.append(dancer_message)

            sections_data = {
                'sectionId': danceable_feedback.section.section_id,
                'danceableVideo': danceable_feedback.video,
                'firstAiFeedback': danceable_feedback.first_score,
                'bestAiFeedback': danceable_feedback.best_score,
                'danceableMessage': danceable_feedback.message,
                # 'dancerVideo': dancer_feedback.video,
                # 'dancerMessage': dancer_messages
            }
            sections.append(sections_data)

        serializer_data['sections'] = sections

        return Response(serializer_data)