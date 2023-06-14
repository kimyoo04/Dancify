import uuid

from django.db import models


class SearchHistory(models.Model):
    search_history_id = models.UUIDField(primary_key=True,
                                         default=uuid.uuid4,
                                         editable=False)
    post_category = models.CharField(max_length=10)
    search_keyword = models.CharField(max_length=30)
    search_count = models.IntegerField(default=1)
