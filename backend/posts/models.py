from django.db import models

import uuid

from accounts.models import User


# Create your models here.
class FreePost(models.Model):
    post_id = models.UUIDField(primary_key=True,
                               default=uuid.uuid4,
                               editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    content = models.CharField(max_length=1000)
    create_date = models.DateField(auto_now_add=True)
    post_image = models.URLField(max_length=500, null=True, blank=True)
    views = models.IntegerField(default=0)
