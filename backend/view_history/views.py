from rest_framework.generics import ListAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import ViewHistory
from .serializers import ViewHistorySerializer


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
        return super().list(request, *args, **kwargs)


class DestroyViewHistoryView(DestroyAPIView):
    queryset = ViewHistory.objects.all()
    lookup_field = 'view_history_id'

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
