import uuid

from django.db import models

from accounts.models import User
from video_section.models import VideoSection
from posts.models import DancerPost


class FeedbackPost(models.Model):
    feedback_id = models.UUIDField(primary_key=True,
                                   default=uuid.uuid4,
                                   editable=False)
    dancer_post = models.ForeignKey(DancerPost, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='신청 전')
    create_date = models.DateTimeField(auto_now_add=True)


class DanceableFeedback(models.Model):
    feedback_section_id = models.UUIDField(primary_key=True,
                                           default=uuid.uuid4,
                                           editable=False)
    section = models.ForeignKey(VideoSection, on_delete=models.CASCADE)
    feedback_post = models.ForeignKey(FeedbackPost, on_delete=models.CASCADE)
    video = models.URLField()
    first_score = models.URLField()
    best_score = models.URLField()
    message = models.CharField(max_length=500, default=None, null=True)


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
    message = models.CharField(max_length=500)
