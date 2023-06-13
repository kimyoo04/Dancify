from django.urls import path
from . import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.FileViewSet.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)   # 장고는 자체적으로 저장해주지 않아서 따로 settings에 있는 MEDIA_ROOT 경로대로 저장할 수 있도록 세팅
