from random import choice
from typing import Any
from django.core.management.base import BaseCommand
from django_seed import Seed

from accounts.models import User
from posts.models import FreePost, VideoPost, DancerPost
from ...models import Like


class Command(BaseCommand):
    help = '이 커맨드를 통해 랜덤한 좋아요 더미 데이터 생성'

    def handle(self, *args: Any, **options: Any) -> str | None:
        seeder = Seed.seeder()

        users = User.objects.all()
        category = ['FREE', 'VIDEO', 'DANCER']
        posts = [FreePost, VideoPost, DancerPost]

        for i in range(30):
            seeder.add_entity(Like, 1,
                              {
                                  "user": lambda x: choice(users),
                                  "post_category": category[i % 3],
                                  "post_id": lambda x: posts[i % 3].objects.order_by('?').values('post_id').first()['post_id']
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
