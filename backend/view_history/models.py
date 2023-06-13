import uuid

from django.db import models

from accounts.models import User
from posts.models import DancerPost


class ViewHistory(models.Model):
    view_history_id = models.UUIDField(primary_key=True,
                                       default=uuid.uuid4,
                                       editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dancer_post = models.ForeignKey(DancerPost, on_delete=models.CASCADE)
    view_date = models.DateTimeField(auto_now=True)
