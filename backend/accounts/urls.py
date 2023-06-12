from django.urls import path
from accounts.views import SignInView, SignOutView, SignUpView, JWTRefreshView

urlpatterns = [
    path('/signup', SignUpView.as_view()),  # type: ignore
    path('/signin', SignInView.as_view()),
    path('/logout', SignOutView.as_view()),
    path('/user', JWTRefreshView.as_view())
]
