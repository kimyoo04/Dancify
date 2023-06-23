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

        for i in range(3):
            post = DancerPost.objects.order_by('?').first()
            for j in range(5):
                seeder.add_entity(VideoSection, 1,
                                  {
                                      "dancer_post": post,
                                      'video': lambda x: choice(video_urls),
                                      'thumbnail': lambda x: choice(thumbnail_urls),
                                      'section_number': j
                                  })

        seeder.execute()
