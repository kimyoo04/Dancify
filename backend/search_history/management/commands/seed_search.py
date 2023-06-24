from random import randint, choice
from typing import Any
from django.core.management.base import BaseCommand
from django_seed import Seed

from ...models import SearchHistory


class Command(BaseCommand):
    help = '이 커맨드를 통해 랜덤한 자유 게시판, 영상 자랑 게시판, 댄서 영상 게시판 데이터 생성.'

    def handle(self, *args: Any, **options: Any) -> str | None:
        seeder = Seed.seeder()

        category = ['FREE', 'VIDEO', 'DANCER']
        group_names = ['르세라핌', '유키스', '아이브', '(여자)아이들',
                       '몬스타엑스', '하이라이트', '뉴진스', '클라씨',
                       '트러블메이커', '트와이스', '워너원', '에스파',
                       '소녀시대', '블랙핑크', '백퍼센트', '비아이지',
                       '빅스타', '라붐', '브레이브걸스', '에이스',
                       'EXID', '스테이씨', '티아라', '미쓰에이']

        for name in group_names:
            seeder.add_entity(SearchHistory, 1, {
                'post_category': lambda x: choice(category),
                'search_keyword': name,
                'search_count': lambda x: randint(1, 10)
            })

        seeder.execute()
