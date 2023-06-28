from django.core.exceptions import ValidationError

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework_simplejwt.exceptions import TokenError

from .models import DanceableFeedback
from .serializers import (
    DancerFeedbackListSerializer,
    DanceableFeedbackListSerializer,
    DanceableFeedbackRequestSerializer,
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
                feedback.status = '대기 중'
                feedback.full_clean()
                feedback.save()
            except DanceableFeedback.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            except ValidationError:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)
