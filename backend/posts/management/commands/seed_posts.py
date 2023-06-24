from random import randint, random, choice
from typing import Any
from django.core.management.base import BaseCommand, CommandParser
from django_seed import Seed

from accounts.models import User
from ...models import FreePost, VideoPost, DancerPost


class Command(BaseCommand):
    help = '이 커맨드를 통해 랜덤한 자유 게시판, 영상 자랑 게시판, 댄서 영상 게시판 데이터 생성.'

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument(
            '--number',
            default=25,
            type=int,
            help='데이터를 얼마나 생성할 것인지 결정'
        )

    def handle(self, *args: Any, **options: Any) -> str | None:
        number = options.get('number')
        seeder = Seed.seeder()

        # 이미지/비디오 링크
        free_image_urls = ['https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/post-image/randomURL1.jpg',
                           'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/post-image/randomURL2.png',
                           'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/post-image/randomURL3.jpg']
        thumbnail_urls = [
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancable1/6015493aa1cc4ff78eaaabe449cc1775.JPG',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancable1/e1a27bdfc7f445f0a15b457de5d9f427.JPG',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancable2/fc56b71542754b3bb134b065b186b1e9.JPG',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/user2/d7ac59c77d7a46d2ac34a71bb7fc72ab.JPG',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer1/9ffcfde840fd41268b8eed8a7db133c0.JPG',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer2/de2b6b00b3a34bd39566d8d12fa07f18.JPG',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer3/98e64117169e4031821875021b64895d.JPG',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/user1/cb03295aa6eb470bb24423d860501860.JPG',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/user2/6e1a433090f545c78647ad8f5e759cde.JPG',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer1/5425e72fc9b9498ea221b6d1854e0568.JPG',
        ]

        video_urls = [
            'http://dyago72jbsqcn.cloudfront.net/vod/danceable/dancable1/6015493aa1cc4ff78eaaabe449cc1775.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/danceable/dancable1/e1a27bdfc7f445f0a15b457de5d9f427.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/danceable/dancable2/fc56b71542754b3bb134b065b186b1e9.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/danceable/user2/d7ac59c77d7a46d2ac34a71bb7fc72ab.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer1/9ffcfde840fd41268b8eed8a7db133c0.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer2/de2b6b00b3a34bd39566d8d12fa07f18.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer3/98e64117169e4031821875021b64895d.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/boast/user1/cb03295aa6eb470bb24423d860501860.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/boast/user2/6e1a433090f545c78647ad8f5e759cde.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/feedback/dancer1/5425e72fc9b9498ea221b6d1854e0568.m3u8',
        ]

        group_names = ['르세라핌', '유키스', '아이브', '(여자)아이들',
                       '몬스타엑스', '하이라이트', '뉴진스', '클라씨',
                       '트러블메이커', '트와이스', '워너원', '에스파',
                       '소녀시대', '블랙핑크', '백퍼센트', '비아이지',
                       '빅스타', '라붐', '브레이브걸스', '에이스',
                       'EXID', '스테이씨', '티아라', '미쓰에이']

        # 전체 유저 리스트 (자유게시판 작성용)
        users = User.objects.all()

        # 자유게시판 더미데이터 생성
        seeder.add_entity(FreePost, number,
                          {
                              "user": lambda x: choice(users),
                              "title": lambda x: seeder.faker.sentence(nb_words=4, variable_nb_words=True, ext_word_list=None) + choice(group_names),
                              "content": lambda x: seeder.faker.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None),
                              "post_image": lambda x: choice(free_image_urls) if random() > 0.5 else None,
                              "views": lambda x: randint(0, 999)
                          })

        # 영상 자랑 게시판 더미데이터 생성
        seeder.add_entity(VideoPost, number,
                          {
                              "user": lambda x: choice(users),
                              "title": lambda x: seeder.faker.sentence(nb_words=4, variable_nb_words=True, ext_word_list=None) + choice(group_names),
                              "content": lambda x: seeder.faker.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None),
                              "video": lambda x: choice(video_urls),
                              "thumbnail": lambda x: choice(thumbnail_urls),
                              "views": lambda x: randint(0, 999)
                          })

        # 댄서 게시판 더미데이터 생성
        seeder.add_entity(DancerPost, number,
                          {
                              "user": lambda x: choice(users),
                              "title": lambda x: seeder.faker.sentence(nb_words=4, variable_nb_words=True, ext_word_list=None) + choice(group_names),
                              "content": lambda x: seeder.faker.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None),
                              "video": lambda x: choice(video_urls),
                              "thumbnail": lambda x: choice(thumbnail_urls),
                              "genre": lambda x: choice(['BASIC', 'KPOP']),
                              "feedback_price": lambda x: randint(10, 99) * 1000,
                              "views": lambda x: randint(0, 999)
                          })

        seeder.execute()
