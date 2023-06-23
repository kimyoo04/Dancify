import uuid

from django.db import models

from posts.models import DancerPost


class VideoSection(models.Model):
    section_id = models.UUIDField(primary_key=True,
                                  default=uuid.uuid4,
                                  editable=False)
    dancer_post = models.ForeignKey(DancerPost, on_delete=models.CASCADE)
    video = models.URLField()
    thumbnail = models.URLField()
    section_number = models.SmallIntegerField()
    keypoints = models.URLField()
