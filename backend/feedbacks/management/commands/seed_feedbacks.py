from random import choice
from typing import Any
from django.core.management.base import BaseCommand
from django_seed import Seed

from ...models import FeedbackPost, DanceableFeedback
from video_section.models import VideoSection
from posts.models import DancerPost
from accounts.models import User


class Command(BaseCommand):
    help = '이 커맨드를 통해 피드백 더미 데이터 생성'

    def handle(self, *args: Any, **options: Any) -> str | None:
        seeder = Seed.seeder()

        danceable_ids = ['dancable1', 'dancable2', 'user1', 'user2']
        # dancer_ids = ['dancer1', 'dancer2', 'dancer3']

        video_urls = [
            'https://d2w69iexuycwsi.cloudfront.net/vod/danceable/danceable1/dasd22141sdd12e21a.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/danceable/danceable2/daslidj2189dhjq8wdjh.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/danceable/user2/fdad21421098qwdd.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer2/32e1209ujqwi0dj01289jd12.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer3/fd32fhj890fjwefiwefjwe.m3u8',
        ]

        keypoints_urls = [
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable1/6015493aa1cc4ff78eaaabe449cc1775.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable1/e1a27bdfc7f445f0a15b457de5d9f427.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable2/fc56b71542754b3bb134b065b186b1e9.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer2/de2b6b00b3a34bd39566d8d12fa07f18.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer3/98e64117169e4031821875021b64895d.json',
        ]

        # 비디오 섹션이 있는 포스트 구하기
        # 정렬 후 상위 5개 섹션 구하기
        video_sections = VideoSection.objects.order_by('dancer_post_id', 'section_number')[:5]

        # 피드백 포스트 생성
        # 상위 5개 섹션이 공통으로 가지고 있는 dancer_post_id를 기준으로 피드백 포스트 생성
        for danceable_id in danceable_ids:
            seeder.add_entity(FeedbackPost, 1,
                              {
                                  'dancer_post': DancerPost.objects.get(post_id=video_sections[0].dancer_post.post_id),
                                  'user': User.objects.get(user_id=danceable_id),
                                  'status': choice(['신청 전', '대기 중'])
                              })
            seeder.execute()

            # 댄서블 피드백 정보 생성
            for idx, video_section in enumerate(video_sections):
                feedback_post = FeedbackPost.objects.get(user__user_id=danceable_id)
                if feedback_post is not None:
                    seeder.add_entity(DanceableFeedback, 1,
                                      {
                                          'section': video_section,
                                          'feedback_post': feedback_post,
                                          'video': video_urls[idx],
                                          'first_score': keypoints_urls[idx],
                                          'best_score': keypoints_urls[idx],
                                          'message': None if feedback_post.status == '신청 전' else '어려워요'
                                      })
