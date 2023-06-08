from django.urls import path
from accounts.views import SignIn, SignOut

from . import views

urlpatterns = [
    path('/signup', views.signup),  # type: ignore
    path('/signin', SignIn.as_view()),
    path('/logout', SignOut.as_view()),
]
