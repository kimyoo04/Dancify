from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
import uuid


# contrib.auth.models.AbstractUser의 기본적인 메소드와 필드들을 상속받음
class CustomUserManager(UserManager):
    def create_user(self, userId, password, nickname,
                    email, phone, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        user = self.model(user_id=userId, email=email,
                          nickname=nickname,
                          phone=phone, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, userId, password,
                         nickname, email, phone, **extra_fields):

        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        user = self.model(user_id=userId, email=email,
                          nickname=nickname,
                          phone=phone, **extra_fields)

        user.is_superuser = True
        user.is_staff = True

        user.set_password(password)
        user.save(using=self._db)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return user


class User(AbstractUser):
    # 기본제공 username 필드는 사용하지 않음
    username = None

    user_pk = models.UUIDField(primary_key=True,
                               default=uuid.uuid4, editable=False)
    user_id = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    nickname = models.CharField(max_length=20)
    is_dancer = models.BooleanField(default=False)
    description = models.CharField(max_length=1000, null=True)
    profile_image = models.CharField(max_length=500, null=True)
    phone = models.CharField(max_length=11, unique=True)

    # authenticate()의 기준이 되는 필드
    USERNAME_FIELD = 'user_id'

    """
    기본 필드 제외 회원 가입시 필요한 필드 지정
    유효한 형식, 필드 값 존재여부 확인
    """
    REQUIRED_FIELDS = ['email', 'nickname', 'phone']

    objects = CustomUserManager()
