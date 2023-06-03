from django.contrib.auth.models import AbstractUser
from django.db import models


# contrib.auth.models.AbstractUser의 기본적인 메소드와 필드들을 상속받음
class User(AbstractUser):
    nickname = models.CharField(max_length=20)
    is_dancer = models.BooleanField()
    description = models.CharField(max_length=1000)
    profile_img = models.CharField(max_length=500)
