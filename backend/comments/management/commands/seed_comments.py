from random import choice
from typing import Any
from django.core.management.base import BaseCommand, CommandParser
from django_seed import Seed

from accounts.models import User
from posts.models import FreePost, VideoPost, DancerPost
from ...models import Comment


class Command(BaseCommand):
    help = '이 커맨드를 통해 랜덤한 댓글 더미데이터 생성'

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

        seeder.add_entity(Comment, number,
                          {
                              "user": lambda x: choice(users),
                              "content": lambda x: seeder.faker.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None),
                              "post_id": lambda x: self.get_random_post_id()
                          })

        seeder.execute()

    def get_random_post_id(self):
        """
        게시판 세 종류 중 랜덤으로 한 게시판을 선택하여
        랜덤한 게시글 아이디를 반환하는 함수
        만약 아무 게시글도 없다면 None 반환
        """
        post = choice([FreePost, VideoPost, DancerPost]).objects.order_by('?').values('post_id').first()
        return post['post_id'] if post else None
