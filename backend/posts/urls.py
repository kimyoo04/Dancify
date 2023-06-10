from django.urls import path, include

from rest_framework import routers

from .views.free_post_view import FreePostViewSet
from .views.video_post_view import VideoPostViewSet


router = routers.SimpleRouter(trailing_slash=False)

router.register(r'/free', FreePostViewSet)
router.register(r'/video', VideoPostViewSet)


urlpatterns = [
    path('', include(router.urls))
]
