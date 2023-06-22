from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager
from django.db import models
import uuid


# contrib.auth.models.AbstractUser의 기본적인 메소드와 필드들을 상속받음
class CustomUserManager(UserManager):
    def create_user(self, user_id, password, nickname,
                    email, phone, **extra_fields):
        user = self.model(user_id=user_id, email=email,
                          nickname=nickname,
                          phone=phone, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)

        return user


class User(AbstractUser):
    # 기본제공 username 필드는 사용하지 않음
    username = None
    is_superuser = None
    is_staff = None
    first_name = None
    last_name = None

    user_pk = models.UUIDField(primary_key=True,
                               default=uuid.uuid4, editable=False)
    user_id = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    nickname = models.CharField(max_length=20)
    is_dancer = models.BooleanField(default=False)
    description = models.CharField(max_length=1000, null=True)
    profile_image = models.URLField(max_length=500, null=True)
    phone = models.CharField(max_length=11, unique=True)
    # 중복 로그인 관련 필드
    # jwt_token = models.TextField(null=True, blank=True)

    # authenticate()의 기준이 되는 필드
    USERNAME_FIELD = 'user_id'

    """
    기본 필드 제외 회원 가입시 필요한 필드 지정
    유효한 형식, 필드 값 존재여부 확인
    """
    REQUIRED_FIELDS = ['email', 'nickname', 'phone']

    objects = CustomUserManager()
