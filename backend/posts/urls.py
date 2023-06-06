from django.urls import path, include

from rest_framework import routers

from . import posts_views


router = routers.DefaultRouter()

router.register(r'/free', posts_views.FreePostViewSet)


urlpatterns = [
    path('', include(router.urls))
]
