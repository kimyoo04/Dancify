from random import choice
from typing import Any
from django.core.management.base import BaseCommand
from django_seed import Seed

from posts.models import DancerPost
from ...models import VideoSection


class Command(BaseCommand):
    help = '이 커맨드를 통해 랜덤한 자유 게시판, 영상 자랑 게시판, 댄서 영상 게시판 데이터 생성.'

    def handle(self, *args: Any, **options: Any) -> str | None:
        seeder = Seed.seeder()

        thumbnail_urls = [
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/danceable1/dasd22141sdd12e21a-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/danceable2/daslidj2189dhjq8wdjh-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/user2/fdad21421098qwdd-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer1/di391d890j31d8j231d8213jd-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer2/32e1209ujqwi0dj01289jd12-thumbnail.0000000.jpg',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer3/fd32fhj890fjwefiwefjwe-thumbnail.0000000.jpg',
        ]

        video_urls = [
            'http://dyago72jbsqcn.cloudfront.net/vod/danceable/danceable1/dasd22141sdd12e21a.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/danceable/danceable2/daslidj2189dhjq8wdjh.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/danceable/user2/fdad21421098qwdd.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer1/d2390dj23dj2309f2f32.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer2/32e1209ujqwi0dj01289jd12.m3u8',
            'http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer3/fd32fhj890fjwefiwefjwe.m3u8',
        ]

        keypoints_urls = [
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable1/6015493aa1cc4ff78eaaabe449cc1775.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable1/e1a27bdfc7f445f0a15b457de5d9f427.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable2/fc56b71542754b3bb134b065b186b1e9.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer1/9ffcfde840fd41268b8eed8a7db133c0.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer2/de2b6b00b3a34bd39566d8d12fa07f18.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer3/98e64117169e4031821875021b64895d.json',
        ]

        for i in range(3):
            post = DancerPost.objects.order_by('?').first()
            for j in range(5):
                seeder.add_entity(VideoSection, 1,
                                  {
                                      "dancer_post": post,
                                      'video': video_urls[j],
                                      'thumbnail': thumbnail_urls[j],
                                      'keypoints': keypoints_urls[j],
                                      'section_number': j
                                  })

        seeder.execute()
