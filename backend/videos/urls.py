from django.urls import path
from videos.views import UploadTestView

urlpatterns = [
    path('/uploadtest', UploadTestView.as_view())

]
