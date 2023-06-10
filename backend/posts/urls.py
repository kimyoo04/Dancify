from django.urls import path, include

from rest_framework import routers

from . import freepost_view


router = routers.SimpleRouter(trailing_slash=False)

router.register(r'/free', freepost_view.FreePostViewSet)


urlpatterns = [
    path('', include(router.urls))
]
