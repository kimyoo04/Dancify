from django.urls import path, include
from django.views import View
from django.contrib import admin
from django.http import JsonResponse

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


class HelloWorldView(View):
    def get(self, request):
        return JsonResponse({'message': 'Hello, World!'})

schema_view = get_schema_view(
    openapi.Info(
        title="KT Django API v1.0", default_version='v1',
        contact=openapi.Contact(email="blackdew7@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('', HelloWorldView.as_view()),
    path('admin', admin.site.urls),

    # API 문서
    path('api/schema',
        schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/swagger', schema_view.with_ui('swagger',
                                            cache_timeout=0), name='schema-swagger-ui'),

    # API URL
    path('api', include([
        # path('/auth', include('auth.urls')),
        # path('/posts', include('posts.urls')),
        # path('/user', include('user.urls')),
    ]))
]