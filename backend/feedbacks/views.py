from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework_simplejwt.exceptions import TokenError

from .models import DanceableFeedback
from .serializers import DancerFeedbackListSerializer, DanceableFeedbackListSerializer
from accounts.models import User
from accounts.authentication import get_user_info_from_token


class FeedbackListAPIView(ListAPIView):
    """
    피드백 동영상 목록
    """

    def list(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)
            user_id = user_info['user_id']
            user = User.objects.get(user_id=user_id)
        except (KeyError, TokenError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 로그인한 유저가 댄서인 경우
        if user.is_dancer:
            self.serializer_class = DancerFeedbackListSerializer
        else:
            self.serializer_class = DanceableFeedbackListSerializer

        return super().list(request, *args, **kwargs)


