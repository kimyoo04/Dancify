from django.db import models

import uuid

from accounts.models import User


class PostBaseModel(models.Model):
    """
    게시글마다 공통 컬럼이 있으므로 이를 상속할 베이스 모델을 생성합니다.
    """
    post_id = models.UUIDField(primary_key=True,
                               default=uuid.uuid4,
                               editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=1000)
    create_date = models.DateField(auto_now_add=True)
    views = models.IntegerField(default=0)

    class Meta:
        abstract = True


class VideoPostBaseModel(PostBaseModel):
    """
    PostBaseModel을 상속받아 게시글 공통 컬럼을 가지는 모델입니다.
    영상 게시판은 공통적으로 영상 주소와 썸네일 이미지를 가지므로
    이를 상속할 베이스 모델을 생성합니다.
    """
    video_url = models.URLField(max_length=500, null=False)
    thumbnail_url = models.URLField(max_length=500, null=False)

    class Meta:
        abstract = True


class FreePost(PostBaseModel):
    post_image = models.URLField(max_length=500, null=True, blank=True)


class VideoPost(VideoPostBaseModel):
    pass


class DancerPost(VideoPostBaseModel):
    feedback_price = models.IntegerField()
