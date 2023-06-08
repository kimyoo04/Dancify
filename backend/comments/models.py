from django.db import models
from accounts.models import User
from posts.models import FreePost
import uuid


class Comment(models.Model):
    posts = models.ForeignKey(FreePost, on_delete=models.CASCADE)
    comment_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=20)
    content = models.CharField(max_length=1000)
    create_date = models.DateField(auto_now_add=True)
    post_id = models.UUIDField()

    # def __str__(self):
    #     return self.content

    # class Meta:
    #     db_table = 'comments'
