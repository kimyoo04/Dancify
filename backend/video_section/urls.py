from django.urls import path

from .views import VideoSectionRetrieveView


urlpatterns = [
    path('/<str:post_id>', VideoSectionRetrieveView.as_view())
]
