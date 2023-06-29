from django.urls import path

from .views import (
    FeedbackListAPIView,
    DanceableFeedbackRequestView,
    DancerFeedbackResponseView,
    FeedbackDetailView,
)


urlpatterns = [
    path('', FeedbackListAPIView.as_view()),  # 피드백 동영상 목록 조회
    path('/danceable', DanceableFeedbackRequestView.as_view()),  # 댄서블 피드백 요청
    path('/dancer/<str:feedback_id>', DancerFeedbackResponseView.as_view()),  # 댄서 피드백 응답
    path('/<str:feedback_id>', FeedbackDetailView.as_view()),  # 피드백 요청 상세페이지 조회
]
