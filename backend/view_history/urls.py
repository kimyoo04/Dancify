from django.urls import path

from . import views


urlpatterns = [
    path('', views.GetListViewHistroyView.as_view()),
    path('/<str:view_history_id>', views.DestroyViewHistoryView.as_view()),
]
