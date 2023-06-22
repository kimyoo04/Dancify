from typing import Any
from faker import Faker
from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from django_seed import Seed

from accounts.models import User


class Command(BaseCommand):
    help = '이 커맨드를 통해 유저 더미 데이터 생성'

    def handle(self, *args: Any, **options: Any) -> str | None:
        seeder = Seed.seeder()

        danceable_ids = ['dancable1', 'dancable2', 'user1', 'user2']
        dancer_ids = ['dancer1', 'dancer2', 'dancer3']

        profile_image_path = 'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/profile-image/'

        for id in danceable_ids:
            seeder.add_entity(User, 1,
                              {
                                  'user_id': id,
                                  'nickname': lambda x: Faker('ko-KR').name(),
                                  'email': lambda x: seeder.faker.email(),
                                  'password': make_password('password'),
                                  'is_dancer': False,
                                  'is_active': True,
                                  'description': None,
                                  'profile_image': profile_image_path + id + '.jpg',
                                  'phone': lambda x: seeder.faker.phone_number()
                              })

        for id in dancer_ids:
            seeder.add_entity(User, 1,
                              {
                                  'user_id': id,
                                  'nickname': lambda x: Faker('ko-KR').name(),
                                  'email': lambda x: seeder.faker.email(),
                                  'password': make_password('password'),
                                  'is_dancer': True,
                                  'is_active': True,
                                  'description': None,
                                  'profile_image': profile_image_path + id + '.jpg',
                                  'phone': lambda x: seeder.faker.phone_number()
                              })

        seeder.execute()
