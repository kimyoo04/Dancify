from django.urls import path

from . import views


urlpatterns = [
    path('/<str:view_history_id>', views.DestroyViewHistoryView.as_view()),
]
