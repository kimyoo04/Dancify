from django.urls import path

from . import views

urlpatterns = [
    path('/signup', views.signup),  # type: ignore
    path('/signin', views.signin),  # type: ignore
    path('/signout', views.signout),
]
