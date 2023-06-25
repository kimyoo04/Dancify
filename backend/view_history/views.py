from rest_framework import status
from rest_framework.generics import ListAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.exceptions import TokenError

from .models import ViewHistory
from .serializers import ViewHistorySerializer
from accounts.authentication import get_user_info_from_token
from accounts.models import User


class ViewHistoryPagination(PageNumberPagination):
    page_size = 20  # 페이지당 보여질 개체 수

    def get_paginated_response(self, data):
        return Response({
            'data': data,
            'totalPages': self.page.paginator.num_pages,
            'currentPage': self.page.number,
            'totalCount': self.page.paginator.count
        })


class GetListViewHistroyView(ListAPIView):
    pagination_class = ViewHistoryPagination
    serializer_class = ViewHistorySerializer

    def list(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)
            user_id = user_info['userId']
            user = User.objects.get(user_id=user_id)

            self.queryset = ViewHistory.objects.filter(user=user)
            return super().list(request, *args, **kwargs)
        except (TokenError, KeyError, User.DoesNotExist):
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class DestroyViewHistoryView(DestroyAPIView):
    queryset = ViewHistory.objects.all()
    lookup_field = 'view_history_id'

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
