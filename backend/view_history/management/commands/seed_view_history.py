from random import choice
from typing import Any
from django.core.management.base import BaseCommand
from django_seed import Seed

from accounts.models import User
from posts.models import DancerPost
from ...models import ViewHistory


class Command(BaseCommand):
    help = '이 커맨드를 통해 랜덤한 시청 기록 더미 데이터 생성'

    def handle(self, *args: Any, **options: Any) -> str | None:
        seeder = Seed.seeder()

        users = User.objects.all()
        dancer_posts = DancerPost.objects.all()

        for dancer_post in dancer_posts:
            seeder.add_entity(ViewHistory, 1,
                              {
                                  "user": lambda x: choice(users),
                                  "dancer_post": dancer_post
                              })

        seeder.execute()
