from django.urls import path
from videos.views import UploadTestView, IntegratedTestView

urlpatterns = [
    path('/uploadtest', UploadTestView.as_view()),
    path('/integratedtest', IntegratedTestView.as_view())
]
