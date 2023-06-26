from django.urls import path
from videos.views import UploadTestView, IntegratedTestView,\
    CutVideoTestView, SplittedVideoUploadTest

urlpatterns = [
    path('/uploadtest', UploadTestView.as_view()),
    path('/integratedtest', IntegratedTestView.as_view()),
    path('/cutvideotest', CutVideoTestView.as_view()),
    path('/splittedvideouploadtest', SplittedVideoUploadTest.as_view()),
]
