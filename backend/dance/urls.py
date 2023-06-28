from django.urls import path
from dance.views import EndPartDanceView, StartExerciseView


urlpatterns = [
    path('', EndPartDanceView.as_view()),
    path('/start', StartExerciseView.as_view())
]
