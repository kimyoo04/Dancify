from django.db.models import Count, Q, Case, When

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from accounts.authentication import get_user_info_from_token
from rest_framework_simplejwt.exceptions import TokenError

from accounts.models import User
from comments.models import Comment
from like.models import Like


class PostPagination(PageNumberPagination):
    page_size = 20  # 페이지당 보여질 개체 수

    def get_paginated_response(self, data):
        return Response({
            'data': data,
            'totalPages': self.page.paginator.num_pages,
            'currentPage': self.page.number,
            'totalCount': self.page.paginator.count
        })


class BasePostViewSet(viewsets.ModelViewSet):
    pagination_class = PostPagination

    def list(self, request, *args, **kwargs):
        q = self.request.GET.get('q', None)
        sort = self.request.GET.get('sort', None)
        user_id = self.request.GET.get('user', None)

        # 쿼리 파라미터에 검색어가 있을 경우
        if q is not None:
            self.queryset = self.queryset.filter(title__icontains=q)

        # 쿼리 파라미터에 정렬 기준이 없을 경우 기본적으로 최신순 정렬
        if sort is None:
            self.queryset = self.queryset.order_by('-create_date')
        else:
            if sort == "like":  # 인기순
                like_counts = Like.objects.values('post_id').annotate(like_count=Count('post_id')).order_by('-like_count', '-create_date')
                post_ids = [item['post_id'] for item in like_counts]
                self.queryset = self.queryset.filter(Q(post_id__in=post_ids) | ~Q(post_id__in=post_ids)).order_by(
                    Case(
                        *[When(post_id=post_id, then=index) for index, post_id in enumerate(post_ids)],
                        default=len(post_ids)
                    ),
                    '-create_date'
                )
            else:  # 조회순
                self.queryset = self.queryset.order_by('-views')

        # 쿼리 파라미터에 사용자가 있을 경우
        if user_id is not None:
            self.queryset = self.queryset.filter(user=User.objects.get(user_id=user_id))

        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # 조회수 증가
        instance.views += 1
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
            serializer.save(user=User.objects.get(user_id=user_id))

            return Response(status=status.HTTP_201_CREATED)
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        # 게시글을 삭제하면 댓글도 함께 지워지도록 처리
        Comment.objects.filter(post_id=self.get_object().post_id).delete()
        return super().destroy(request, *args, **kwargs)
