from rest_framework.views import APIView
from rest_framework.response import Response

from .models import SearchHistory


class SearchRankView(APIView):
    def get(self, request):
        top_search_keywords_by_category = (
            SearchHistory.objects.values('post_category', 'search_keyword')
            .order_by('-search_count')
        )

        result = {"FREE": [],
                  "VIDEO": [],
                  "DANCER": []}
        for item in top_search_keywords_by_category:
            category = item['post_category']
            keyword = item['search_keyword']

            if len(result[category]) < 5:
                result[category].append(keyword)

        return Response(result)
