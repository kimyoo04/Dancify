from django.urls import path, include

from rest_framework import routers

from .views.free_post_view import FreePostViewSet
from .views.video_post_view import VideoPostViewSet
from .views.dancer_post_view import DancerPostViewSet, VideoSplitView


router = routers.SimpleRouter(trailing_slash=False)

router.register(r'/free', FreePostViewSet)
router.register(r'/video', VideoPostViewSet)

dancer_post_viewset = DancerPostViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

dancer_post_detail_viewset = DancerPostViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'delete': 'destroy',
})

urlpatterns = [
    path('', include(router.urls)),
    path('/dancer', dancer_post_viewset),
    path('/dancer/sections', VideoSplitView.as_view(), name='video-split'),
    path('/dancer/<str:post_id>', dancer_post_detail_viewset),
]
