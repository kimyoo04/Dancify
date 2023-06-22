from random import choice
from typing import Any
from django.core.management.base import BaseCommand, CommandParser
from django_seed import Seed

from accounts.models import User
from posts.models import DancerPost
from ...models import ViewHistory


class Command(BaseCommand):
    help = '이 커맨드를 통해 랜덤한 시청 기록 더미 데이터 생성'

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument(
            '--number',
            default=30,
            type=int,
            help='데이터를 얼마나 생성할 것인지 결정'
        )

    def handle(self, *args: Any, **options: Any) -> str | None:
        number = options.get('number')
        seeder = Seed.seeder()

        users = User.objects.all()

        seeder.add_entity(ViewHistory, number,
                          {
                              "user": lambda x: choice(users),
                              "dancer_post": lambda x: DancerPost.objects.order_by('?').first()
                          })

        seeder.execute()
