from django.urls import path

from .views import FeedbackListAPIView


urlpatterns = [
    path('', FeedbackListAPIView.as_view()),
]