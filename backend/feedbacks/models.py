import uuid

from django.db import models

from accounts.models import User
from video_section.models import VideoSection


class DanceableFeedback(models.Model):
    feedback_id = models.UUIDField(primary_key=True,
                                   default=uuid.uuid4,
                                   editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    section = models.ForeignKey(VideoSection, on_delete=models.CASCADE)
    video = models.URLField()
    status = models.CharField(max_length=20)
    create_date = models.DateTimeField(auto_now_add=True)
    first_score = models.URLField()
    best_score = models.URLField()


class DancerFeedback(models.Model):
    feedback_id = models.UUIDField(primary_key=True,
                                   default=uuid.uuid4,
                                   editable=False)
    danceable_feedback = models.ForeignKey(DanceableFeedback,
                                           on_delete=models.CASCADE)
    video = models.URLField()


class TimeStamp(models.Model):
    timestamp_id = models.UUIDField(primary_key=True,
                                    default=uuid.uuid4,
                                    editable=False)
    dancer_feedback = models.ForeignKey(DancerFeedback,
                                        on_delete=models.CASCADE)
    timestamp = models.IntegerField()
    message = models.CharField()
