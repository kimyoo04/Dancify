from random import choice, randint
from typing import Any
from django.core.management.base import BaseCommand
from django_seed import Seed

from ...models import FeedbackPost, DanceableFeedback, DancerFeedback, TimeStamp
from video_section.models import VideoSection
from posts.models import DancerPost
from accounts.models import User


class Command(BaseCommand):
    help = '이 커맨드를 통해 피드백 더미 데이터 생성'

    def handle(self, *args: Any, **options: Any) -> str | None:
        seeder = Seed.seeder()

        danceable_ids = ['dancable1', 'dancable2', 'user1', 'user2']

        video_urls = [
            'https://d2w69iexuycwsi.cloudfront.net/vod/danceable/danceable1/dasd22141sdd12e21a.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/danceable/danceable2/daslidj2189dhjq8wdjh.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/danceable/user2/fdad21421098qwdd.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer2/32e1209ujqwi0dj01289jd12.m3u8',
            'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer3/fd32fhj890fjwefiwefjwe.m3u8',
        ]

        first_scores = [
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/scores/user1/28ba495f-074c-4813-9ccc-228e699f6a2266d6d455-d5b0-4662-8716-1562982ae8b7-first_score.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/scores/user1/7fae1130-bf6e-4e20-8d7e-4be7b44e46f2642f8fa3-bbd8-43e5-b186-32209bdb160b-first_score.json',
        ]

        best_scores = [
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/scores/user1/28ba495f-074c-4813-9ccc-228e699f6a2266d6d455-d5b0-4662-8716-1562982ae8b7-best_score.json',
            'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/scores/user1/7fae1130-bf6e-4e20-8d7e-4be7b44e46f2642f8fa3-bbd8-43e5-b186-32209bdb160b-best_score.json',
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
                                  'status': choice(['신청 전', '대기 중', '완료'])
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
                                          'first_score': first_scores[idx % 2],
                                          'best_score': best_scores[idx % 2],
                                          'message': None if feedback_post.status == '신청 전' else '어려워요'
                                      })
                seeder.execute()

        danceable_feedbacks = DanceableFeedback.objects.all()
        for danceable_feedback in danceable_feedbacks:
            if danceable_feedback.feedback_post.status == '완료':
                seeder.add_entity(DancerFeedback, 1,
                                  {
                                      'danceable_feedback': danceable_feedback,
                                      'video': choice(video_urls)
                                  })
                seeder.execute()

        dancer_feedbacks = DancerFeedback.objects.all()
        for dancer_feedback in dancer_feedbacks:
            # 반복 횟수를 랜덤하게 결정
            num_iterations = randint(1, 5)

            for _ in range(num_iterations):
                seeder.add_entity(TimeStamp, 1,
                                  {
                                      'dancer_feedback': dancer_feedback,
                                      'timestamp': lambda x: randint(1, 10),
                                      'message': '힘내세요'
                                  })
            seeder.execute()
