import uuid

from django.db import models

from accounts.models import User


class Comment(models.Model):
    CATEGORY_CHOICES = [
        ('FREE', 'FREE'),
        ('VIDEO', 'VIDEO'),
        ('DANCER', 'DANCER'),
    ]

    comment_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=1000)
    create_date = models.DateField(auto_now_add=True)
    post_category = models.CharField(max_length=10,
                                     choices=CATEGORY_CHOICES)
    post_id = models.UUIDField(editable=False)
