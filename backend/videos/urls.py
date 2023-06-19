from django.urls import path, include
from videos.views import UploadTestView


urlpatterns = [
    path('/uploadtest', UploadTestView.as_view())

]
