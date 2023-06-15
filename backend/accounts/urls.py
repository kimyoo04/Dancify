from django.urls import path, include
from accounts.views import SignInView, SignOutView, SignUpView,\
    JWTRefreshView, UpdateProfileView
from accounts.views import TestView

urlpatterns = [
    path('/signup', SignUpView.as_view()),  # type: ignore
    path('/signin', SignInView.as_view()),
    path('/logout', SignOutView.as_view()),
    path('/user', JWTRefreshView.as_view()),
    path('/test', TestView.as_view()),
    path('/profile', include([
        path('', UpdateProfileView.as_view()),
    ])),
]
