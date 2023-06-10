from django.urls import path, include

from rest_framework import routers

from .views.freepost_view import FreePostViewSet


router = routers.SimpleRouter(trailing_slash=False)

router.register(r'/free', FreePostViewSet)


urlpatterns = [
    path('', include(router.urls))
]
