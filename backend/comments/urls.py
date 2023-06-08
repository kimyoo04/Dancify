from django.urls import path, include

from . import comment_views
from rest_framework.routers import SimpleRouter


router = SimpleRouter(trailing_slash=False)

router.register(r'', comment_views.CommentViewSet)


urlpatterns = [
    path('', include(router.urls))
]
