from typing import Any
from django.core.management.base import BaseCommand
from django_seed import Seed

from posts.models import DancerPost
from ...models import VideoSection


class Command(BaseCommand):
    help = '이 커맨드를 통해 비디오 섹션 더미데이터 생성.'

    def handle(self, *args: Any, **options: Any) -> str | None:
        seeder = Seed.seeder()

        texts = [
            'basic_wave',
            '소녀시대 - gee',
            '소녀시대 - 소원을 말해봐',
            '소녀시대 - I got a boy',
            '소녀시대 - 라이온 하트',
            '소녀시대 - Mr.Mr',
            '소녀시대 - 파티',
            '레드벨벳 - 파워 업',
        ]

        # 기본 동작
        basic_wave = [
            # 비디오
            [
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/65254fa3c7c845e2b51c8f0d1af99c34.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/basic_wave_1.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/basic_wave_2.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/basic_wave_3.m3u8',
            ],
            # 썸네일
            [
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/65254fa3c7c845e2b51c8f0d1af99c34-thumbnail.0000000.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/basic_wave_1.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/basic_wave_2.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/basic_wave_3.jpg',
            ],
            # 키포인트
            [
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/65254fa3c7c845e2b51c8f0d1af99c34.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/basic_wave_1.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/basic_wave_2.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/basic_wave_3.json',
            ]
        ]

        # 소녀시대 - gee
        gee = [
            # 비디오
            [
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/e4089a07f4f247ba9c34f71553ed3f2b.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-gee_1.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-gee_2.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-gee_3.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-gee_4.m3u8',
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/e4089a07f4f247ba9c34f71553ed3f2b-thumbnail.0000000.jpg",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-gee_1.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-gee_2.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-gee_3.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-gee_4.jpg',
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/e4089a07f4f247ba9c34f71553ed3f2b.json",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-gee_1.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-gee_2.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-gee_3.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-gee_4.json',
            ]
        ]

        # 소녀시대 - 소원을 말해봐
        genie = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/cfb250a5406c477cb8ca8fbb1a94b5e9.m3u8",
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-genie_1.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-genie_2.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-genie_3.m3u8',
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/cfb250a5406c477cb8ca8fbb1a94b5e9-thumbnail.0000000.jpg",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-genie_1.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-genie_2.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-genie_3.jpg',
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/cfb250a5406c477cb8ca8fbb1a94b5e9.json",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-genie_1.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-genie_2.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-genie_3.json',
            ]
        ]

        # 소녀시대 - I got a boy
        I_got_a_boy = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/c30076d55f044a9b947e6c4a1530ed2b.m3u8",
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-i_got_a_boy_1.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-i_got_a_boy_2.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-i_got_a_boy_3.m3u8',
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/c30076d55f044a9b947e6c4a1530ed2b-thumbnail.0000000.jpg",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-i_got_a_boy_1.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-i_got_a_boy_2.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-i_got_a_boy_3.jpg',
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/c30076d55f044a9b947e6c4a1530ed2b.json",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-i_got_a_boy_1.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-i_got_a_boy_2.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-i_got_a_boy_3.json',
            ]
        ]

        # 소녀시대 - 라이온 하트
        lion_heart = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/ca82e863cda44e13a809c9751179c670.m3u8",
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-lion_heart_1.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-lion_heart_2.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-lion_heart_3.m3u8',
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/ca82e863cda44e13a809c9751179c670-thumbnail.0000000.jpg",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-lion_heart_1.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-lion_heart_2.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-lion_heart_3.jpg',
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/ca82e863cda44e13a809c9751179c670.json",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-lion_heart_1.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-lion_heart_2.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-lion_heart_3.json',
            ]
        ]

        # 소녀시대 - 미스터 미스터
        mrmr = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/4065037e84544eabb2c70ffdf3a710f0.m3u8",
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-mrmr_1.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-mrmr_2.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-mrmr_3.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-mrmr_4.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-mrmr_5.m3u8',
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/4065037e84544eabb2c70ffdf3a710f0-thumbnail.0000000.jpg",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-mrmr_1.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-mrmr_2.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-mrmr_3.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-mrmr_4.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-mrmr_5.jpg',
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/4065037e84544eabb2c70ffdf3a710f0.json",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-mrmr_1.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-mrmr_2.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-mrmr_3.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-mrmr_4.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-mrmr_5.json',
            ]
        ]

        # 소녀시대 - 파티
        party = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/03b8c61845174e4c8842ef1099025d7c.m3u8",
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-party_1.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-party_2.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-party_3.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/gg-party_4.m3u8',
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/03b8c61845174e4c8842ef1099025d7c-thumbnail.0000000.jpg",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-party_1.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-party_2.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-party_3.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/gg-party_4.jpg',
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/03b8c61845174e4c8842ef1099025d7c.json",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-party_1.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-party_2.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-party_3.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/gg-party_4.json',
            ]
        ]

        # 레드벨벳 - 파워 업
        power_up = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/4f41bc8e0c24408db493e31c783f4f84.m3u8",
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/red_velvet-power_up_1.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/red_velvet-power_up_2.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/red_velvet-power_up_3.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/red_velvet-power_up_4.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/ai_hub_data/red_velvet-power_up_5.m3u8',
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/4f41bc8e0c24408db493e31c783f4f84-thumbnail.0000000.jpg",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/red_velvet-power_up_1.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/red_velvet-power_up_2.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/red_velvet-power_up_3.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/red_velvet-power_up_4.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/ai_hub_data/red_velvet-power_up_5.jpg',
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/4f41bc8e0c24408db493e31c783f4f84.json",
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/red_velvet-power_up_1.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/red_velvet-power_up_2.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/red_velvet-power_up_3.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/red_velvet-power_up_4.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/ai_hub_data/red_velvet-power_up_5.json',
            ]
        ]

        musics = [basic_wave, gee, genie, I_got_a_boy, lion_heart, mrmr, party, power_up]

        for idx, music in enumerate(musics):
            try:
                post = DancerPost.objects.get(title=texts[idx])
            except DancerPost.DoesNotExist:
                continue

            for i in range(len(music[0])):
                seeder.add_entity(VideoSection, 1,
                                  {
                                      'dancer_post': post,
                                      'video': music[0][i],
                                      'thumbnail': music[1][i],
                                      'keypoints': music[2][i],
                                      'section_number': i,
                                  })

        seeder.execute()
