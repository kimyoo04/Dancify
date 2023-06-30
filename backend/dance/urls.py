from django.urls import path
from dance.views import EndPartDanceView, StartPracticeView


urlpatterns = [
    path('', EndPartDanceView.as_view()),
    path('/start', StartPracticeView.as_view())
]
