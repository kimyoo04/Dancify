from django.urls import path

from . import views


urlpatterns = [
    path('', views.comment_create),
    path('/<str:comment_id>', views.comment_patch_delete),
]
