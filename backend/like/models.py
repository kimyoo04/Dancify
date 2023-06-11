import uuid

from django.db import models

from accounts.models import User


class Like(models.Model):
    like_id = models.UUIDField(primary_key=True,
                               default=uuid.uuid4,
                               editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_category = models.CharField(max_length=10)
    post_id = models.UUIDField()
    create_date = models.DateTimeField(auto_now_add=True)
