from django.urls import path, include
from django.views import View
from django.contrib import admin
from django.http import JsonResponse

from rest_framework import permissions, routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from comments.views import CommentViewSet
from rest_framework.routers import SimpleRouter

class CheerUpView(View):
    def get(self, request):
        return JsonResponse({'message': '하고싶은 것 다하조 화이팅!'})


schema_view = get_schema_view(
    openapi.Info(
        title="Dancify API v1.0", default_version='v1',
        contact=openapi.Contact(email="kimyoo04eco@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = SimpleRouter(trailing_slash=False)

router.register(r'/comments', CommentViewSet)


urlpatterns = [
    path('', CheerUpView.as_view()),
    path('admin', admin.site.urls),
    # API 문서
    path('api/schema',
         schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/swagger',
         schema_view.with_ui('swagger',
                             cache_timeout=0),
         name='schema-swagger-ui'),
    # API URL
    path('api', include([
        path('', include(router.urls)),
        path('/posts', include('posts.urls')),
        path('/auth', include('accounts.urls')),
        path('/comments', include(router.urls)),
        # path('/posts', include('posts.urls')),
        # path('/user', include('user.urls')),
    ]))
]
