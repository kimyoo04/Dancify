from django.urls import path

from . import views


urlpatterns = [
    path('/free', views.GetLikedFreePosts.as_view()),
    path('/video', views.GetLikedVideoPosts.as_view()),
    path('/dancer', views.GetLikedDancerPosts.as_view()),
    path('/<str:post_id>', views.LikeView.as_view()),
]
