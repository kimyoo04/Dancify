from django.urls import path, include

from . import views


urlpatterns = [
    path('/<str:post_id>', views.LikeView.as_view())
]
