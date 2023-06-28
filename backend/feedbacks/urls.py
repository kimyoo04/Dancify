from django.urls import path

from .views import FeedbackListAPIView, DanceableFeedbackRequestView


urlpatterns = [
    path('', FeedbackListAPIView.as_view()),  # 피드백 동영상 목록 조회
    path('/danceable', DanceableFeedbackRequestView.as_view()),  # 댄서블 피드백 요청
]
