from django.urls import path
from dance.views import EndDanceView


urlpatterns = [
    path('', EndDanceView.as_view()),
]
