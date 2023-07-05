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

        texts = [
            'basic_wave',
            '엑소 - Love me right(럽미라잇)',
            '소녀시대 - gee',
            '소녀시대 - 소원을 말해봐',
            '소녀시대 - I got a boy',
            '소녀시대 - 라이온 하트',
            '소녀시대 - Mr.Mr',
            '소녀시대 - 파티',
            '레드벨벳 - 파워 업',
            '레드벨벳 - 빨간 맛',
        ]

        # 이미지/비디오 링크
        free_image_urls = [
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/post-image/user1/7932fbfaf58247ba9c07752daf80c66d.jpg",
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/post-image/user1/0a73d9820a5c486286337919d5550133.jpg",
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/post-image/user1/efcadc43f27b48faa01c77c106a348a3.jpg",
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/post-image/user1/6b183fc36b0d4e36bd86ecfc93a84445.jpg",
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/post-image/user1/f49552f5143546ebbc5d82bb48e3494f.jpg",
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/post-image/user1/b97f9186c6df48df848ce25968a22574.jpg",
        ]

        thumbnail_urls = [
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/ef4b1b41e5834548aff789689a37d730-thumbnail.0000000.jpg',  # basic_wave
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/9814d274b1e04064959eb66780e1074c-thumbnail.0000000.jpg',  # 엑소 - 럽미라잇
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/08630a5c5ab44f098358eb43a3fe9d9b-thumbnail.0000000.jpg',  # 소녀시대 - gee
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/d6be40e4d7984156bc64138e636ae36d-thumbnail.0000000.jpg',  # 소녀시대 - 소원을 말해봐
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/2f5403d3b27944d2822072b570cf6fbd-thumbnail.0000000.jpg',  # 소녀시대 - I got a boy
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/6990746dcae34c6e99760018b3ff3c0b-thumbnail.0000000.jpg',  # 소녀시대 - 라이온 하트
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/2438e723ed0c4b7ca73c15cada13fddf-thumbnail.0000000.jpg',  # 소녀시대 - Mr.Mr
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/b3565aa599a94b058c051301f94c9469-thumbnail.0000000.jpg',  # 소녀시대 - 파티
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/fdf1074b1e024384be7b1dd8c71979ee-thumbnail.0000000.jpg',  # 레드벨벳 - 파워 업
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/2407abf515f54ff58423d2af9e66a919-thumbnail.0000000.jpg',  # 레드벨벳 - 빨간 맛
        ]

        video_urls = [
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/ef4b1b41e5834548aff789689a37d730.m3u8',  # basic_wave
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/9814d274b1e04064959eb66780e1074c.m3u8',  # 엑소 - 럽미라잇
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/08630a5c5ab44f098358eb43a3fe9d9b.m3u8',  # 소녀시대 - gee
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/d6be40e4d7984156bc64138e636ae36d.m3u8',  # 소녀시대 - 소원을 말해봐
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/2f5403d3b27944d2822072b570cf6fbd.m3u8',  # 소녀시대 - I got a boy
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/6990746dcae34c6e99760018b3ff3c0b.m3u8',  # 소녀시대 - 라이온 하트
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/2438e723ed0c4b7ca73c15cada13fddf.m3u8',  # 소녀시대 - Mr.Mr
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/b3565aa599a94b058c051301f94c9469.m3u8',  # 소녀시대 - 파티
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/fdf1074b1e024384be7b1dd8c71979ee.m3u8',  # 레드벨벳 - 파워 업
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/2407abf515f54ff58423d2af9e66a919.m3u8',  # 레드벨벳 - 빨간 맛
        ]

        keypoints_urls = [
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/65254fa3c7c845e2b51c8f0d1af99c34.json',  # basic_wave
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/1d5ad90d4eda4ac382514d9112a93e30.json',  # 엑소 - 럽미라잇
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/e4089a07f4f247ba9c34f71553ed3f2b.json",  # 소녀시대 - gee
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/cfb250a5406c477cb8ca8fbb1a94b5e9.json",  # 소녀시대 - 소원을 말해봐
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/c30076d55f044a9b947e6c4a1530ed2b.json",  # 소녀시대 - I got a boy
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/ca82e863cda44e13a809c9751179c670.json",  # 소녀시대 - 라이온 하트
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/4065037e84544eabb2c70ffdf3a710f0.json",  # 소녀시대 - Mr.Mr
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/03b8c61845174e4c8842ef1099025d7c.json",  # 소녀시대 - 파티
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/4f41bc8e0c24408db493e31c783f4f84.json",  # 레드벨벳 - 파워 업
            "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/832a395a882d4fef9cc3f4f5a0a16fa8.json",  # 레드벨벳 - 빨간 맛
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

        danceable_ids = ['dancable1', 'dancable2', 'user1', 'user2']
        users = User.objects.filter(user_id__in=danceable_ids)

        # 영상 자랑 게시판 더미데이터 생성
        for i in range(2):
            for j in range(9):
                seeder.add_entity(VideoPost, 1,
                                  {
                                      "user": choice(users),
                                      "title": texts[j],
                                      "content": texts[j],
                                      "video": video_urls[j],
                                      "thumbnail": thumbnail_urls[j],
                                      "views": randint(0, 999)
                                  })

        dancer_ids = ['dancer1', 'dancer2', 'dancer3']
        users = User.objects.filter(user_id__in=dancer_ids)

        # 댄서 게시판 더미데이터 생성
        for i in range(9):
            seeder.add_entity(DancerPost, 1,
                              {
                                  "user": choice(users),
                                  "title": texts[i],
                                  "content": texts[i],
                                  "video": video_urls[i],
                                  "thumbnail": thumbnail_urls[i],
                                  "keypoints": keypoints_urls[0],
                                  "genre": 'kpop' if i != 0 else 'basic',
                                  "feedback_price": randint(10, 99) * 1000,
                                  "views": randint(0, 999)
                              })

        seeder.execute()
