from django.urls import path
from dance.views import EndDanceView, StartExerciseView


urlpatterns = [
    path('', EndDanceView.as_view()),
    path('/start', StartExerciseView.as_view())
]
