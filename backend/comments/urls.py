from django.urls import path

from . import comment_views


urlpatterns = [
    path('', comment_views.comment_create),
    path('/<str:comment_id>', comment_views.comment_patch_delete),
]
