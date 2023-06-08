from django.urls import path


from . import comment_views
from rest_framework.routers import SimpleRouter


router = SimpleRouter(trailing_slash=False)

# router.register('', comment_views.CommentViewSet)


urlpatterns = [
    path('', comment_views.comment_create),
    path('/<str:comment_id>', comment_views.comment_delete_patch),
]
