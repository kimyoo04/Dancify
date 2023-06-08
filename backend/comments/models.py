from django.db import models
from accounts.models import User
import uuid


class Comment(models.Model):
    comment_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=1000)
    create_date = models.DateField(auto_now_add=True)
    board_category = models.CharField(max_length=100, null=True)
    post_id = models.UUIDField()
