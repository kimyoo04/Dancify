from django.urls import path

from . import views


urlpatterns = [
    path('', views.SearchRankView.as_view()),
]
