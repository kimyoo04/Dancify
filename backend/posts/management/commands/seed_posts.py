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
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/danceable1/dasd22141sdd12e21a-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/danceable2/daslidj2189dhjq8wdjh-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/user2/fdad21421098qwdd-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer2/32e1209ujqwi0dj01289jd12-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer3/fd32fhj890fjwefiwefjwe-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/user1/398ry238fh23ofj9280fjef-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/user2/32098du239dj2l3kd-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer1/d2390dj23dj2309f2f32-thumbnail.0000000.jpg',
        ]

        video_urls = [
            'https://d2w69iexuycwsi.cloudfront.net/vod/danceable/danceable1/dasd22141sdd12e21a.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/danceable/danceable2/daslidj2189dhjq8wdjh.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/danceable/user2/fdad21421098qwdd.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer2/32e1209ujqwi0dj01289jd12.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer3/fd32fhj890fjwefiwefjwe.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/boast/user1/398ry238fh23ofj9280fjef.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/boast/user2/32098du239dj2l3kd.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/feedback/dancer1/d2390dj23dj2309f2f32.m3u8',
        ]

        keypoints_urls = [
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable1/6015493aa1cc4ff78eaaabe449cc1775.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable1/e1a27bdfc7f445f0a15b457de5d9f427.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable2/fc56b71542754b3bb134b065b186b1e9.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer2/de2b6b00b3a34bd39566d8d12fa07f18.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer3/98e64117169e4031821875021b64895d.json',
            ''
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
        for i in range(2):
            for j in range(8):
                seeder.add_entity(VideoPost, 1,
                                  {
                                      "user": lambda x: choice(users),
                                      "title": lambda x: seeder.faker.sentence(nb_words=4, variable_nb_words=True, ext_word_list=None) + choice(group_names),
                                      "content": lambda x: seeder.faker.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None),
                                      "video": video_urls[i],
                                      "thumbnail": thumbnail_urls[i],
                                      "views": lambda x: randint(0, 999)
                                  })

        # 댄서 게시판 더미데이터 생성
        for i in range(3):
            for j in range(5):
                seeder.add_entity(DancerPost, 1,
                                  {
                                      "user": lambda x: choice(users),
                                      "title": lambda x: seeder.faker.sentence(nb_words=4, variable_nb_words=True, ext_word_list=None) + choice(group_names),
                                      "content": lambda x: seeder.faker.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None),
                                      "video": video_urls[j],
                                      "thumbnail": thumbnail_urls[j],
                                      "keypoints": keypoints_urls[j],
                                      "genre": lambda x: choice(['basic', 'kpop']),
                                      "feedback_price": lambda x: randint(10, 99) * 1000,
                                      "views": lambda x: randint(0, 999)
                                  })

        seeder.execute()
