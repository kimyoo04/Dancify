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

        # 기본 동작
        basic_wave = [
            # 비디오
            [
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/65254fa3c7c845e2b51c8f0d1af99c34.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/0b34a4251ee44560b88d41e4bb3557f3.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/8b76e6b886ed498192303233adeae4a3.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/be1b6246e2c1477eb92557760f145e59.m3u8',
            ],
            # 썸네일
            [
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/65254fa3c7c845e2b51c8f0d1af99c34-thumbnail.0000000.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/0b34a4251ee44560b88d41e4bb3557f3-thumbnail.0000000.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/8b76e6b886ed498192303233adeae4a3-thumbnail.0000000.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/be1b6246e2c1477eb92557760f145e59-thumbnail.0000000.jpg',
            ],
            # 키포인트
            [
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/65254fa3c7c845e2b51c8f0d1af99c34.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/0b34a4251ee44560b88d41e4bb3557f3.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/8b76e6b886ed498192303233adeae4a3.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/be1b6246e2c1477eb92557760f145e59.json',
            ]
        ]

        # 엑소 - 럽미라잇
        love_me_right = [
            # 비디오
            [
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/1d5ad90d4eda4ac382514d9112a93e30.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/1e2e33d05dc74c33b8046f5bd245079d.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/e7a9b761397e4cca909537134dd942bc.m3u8',
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/b0ebbee9f56a4501826becbef339742f.m3u8',
            ],
            # 썸네일
            [
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/1d5ad90d4eda4ac382514d9112a93e30-thumbnail.0000000.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/1e2e33d05dc74c33b8046f5bd245079d-thumbnail.0000000.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/e7a9b761397e4cca909537134dd942bc-thumbnail.0000000.jpg',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/b0ebbee9f56a4501826becbef339742f-thumbnail.0000000.jpg',
            ],
            # 키포인트
            [
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/1d5ad90d4eda4ac382514d9112a93e30.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/1e2e33d05dc74c33b8046f5bd245079d.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/e7a9b761397e4cca909537134dd942bc.json',
                'https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/b0ebbee9f56a4501826becbef339742f.json',
            ]
        ]

        # 소녀시대 - gee
        gee = [
            # 비디오
            [
                'https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/e4089a07f4f247ba9c34f71553ed3f2b.m3u8',
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/a1b9dd7cbaa242d5889e28cecd6e0366.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/d4ac3fc8171c42da9da6582805f58672.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/11df71583eae43d7ad047c75beff35c4.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/212b2e46b2de45b9b144a14c9625f529.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/b482498340b0412a9a2d356cc28a578d.m3u8",
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/e4089a07f4f247ba9c34f71553ed3f2b-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/a1b9dd7cbaa242d5889e28cecd6e0366-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/d4ac3fc8171c42da9da6582805f58672-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/11df71583eae43d7ad047c75beff35c4-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/212b2e46b2de45b9b144a14c9625f529-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/b482498340b0412a9a2d356cc28a578d-thumbnail.0000000.jpg",
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/e4089a07f4f247ba9c34f71553ed3f2b.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/a1b9dd7cbaa242d5889e28cecd6e0366.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/d4ac3fc8171c42da9da6582805f58672.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/11df71583eae43d7ad047c75beff35c4.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/212b2e46b2de45b9b144a14c9625f529.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/b482498340b0412a9a2d356cc28a578d.json",
            ]
        ]

        # 소녀시대 - 소원을 말해봐
        genie = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/cfb250a5406c477cb8ca8fbb1a94b5e9.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/1955443e833c4d4fa672a4d124a63c13.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/648dbbb343ab4270b732e215167cab49.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/166b669d1fe94c21a570062ac679c758.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/01f4c27a27aa44ee9830c1229e68352e.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/f15cf07ef2684a82b5ce6e5c78ee4a7b.m3u8",
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/cfb250a5406c477cb8ca8fbb1a94b5e9-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/1955443e833c4d4fa672a4d124a63c13-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/648dbbb343ab4270b732e215167cab49-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/166b669d1fe94c21a570062ac679c758-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/01f4c27a27aa44ee9830c1229e68352e-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/f15cf07ef2684a82b5ce6e5c78ee4a7b-thumbnail.0000000.jpg",
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/cfb250a5406c477cb8ca8fbb1a94b5e9.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/1955443e833c4d4fa672a4d124a63c13.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/648dbbb343ab4270b732e215167cab49.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/166b669d1fe94c21a570062ac679c758.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/01f4c27a27aa44ee9830c1229e68352e.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/f15cf07ef2684a82b5ce6e5c78ee4a7b.json",
            ]
        ]

        # 소녀시대 - I got a boy
        I_got_a_boy = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/c30076d55f044a9b947e6c4a1530ed2b.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/eefa940d3f60482ebce5c436346c1dfe.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/0291fcce48eb47a3990c10dd9895bfa2.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/5c1ed9ebec6644db909dba1e337bba27.m3u8",
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/c30076d55f044a9b947e6c4a1530ed2b-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/eefa940d3f60482ebce5c436346c1dfe-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/0291fcce48eb47a3990c10dd9895bfa2-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/5c1ed9ebec6644db909dba1e337bba27-thumbnail.0000000.jpg",
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/c30076d55f044a9b947e6c4a1530ed2b.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/eefa940d3f60482ebce5c436346c1dfe.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/0291fcce48eb47a3990c10dd9895bfa2.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/5c1ed9ebec6644db909dba1e337bba27.json",
            ]
        ]

        # 소녀시대 - 라이온 하트
        lion_heart = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/ca82e863cda44e13a809c9751179c670.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/c9094734056d4edf919eaada5f1a8aef.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/b8521adc20384a16963f9a9beb4b52f3.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/847c700f29c5455da8c5ac48a602cc07.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/ec0007e007fd488bbae29af8e0e5c343.m3u8",
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/ca82e863cda44e13a809c9751179c670-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/c9094734056d4edf919eaada5f1a8aef-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/b8521adc20384a16963f9a9beb4b52f3-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/847c700f29c5455da8c5ac48a602cc07-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/ec0007e007fd488bbae29af8e0e5c343-thumbnail.0000000.jpg",
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/ca82e863cda44e13a809c9751179c670.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/c9094734056d4edf919eaada5f1a8aef.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/b8521adc20384a16963f9a9beb4b52f3.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/847c700f29c5455da8c5ac48a602cc07.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/ec0007e007fd488bbae29af8e0e5c343.json",
            ]
        ]

        # 소녀시대 - 미스터 미스터
        mrmr = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/4065037e84544eabb2c70ffdf3a710f0.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/c2bc3d3fc0cd46de89d062feb4542859.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/f86d2b1cce0941a3a50243bf1029a2d5.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/51b3cc6bb7b74fcfa68c60852050d276.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/57d7906ca6cf4470843f7ac1885c0e9b.m3u8",
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/4065037e84544eabb2c70ffdf3a710f0-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/c2bc3d3fc0cd46de89d062feb4542859-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/f86d2b1cce0941a3a50243bf1029a2d5-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/51b3cc6bb7b74fcfa68c60852050d276-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/57d7906ca6cf4470843f7ac1885c0e9b-thumbnail.0000000.jpg",
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/4065037e84544eabb2c70ffdf3a710f0.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/c2bc3d3fc0cd46de89d062feb4542859.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/f86d2b1cce0941a3a50243bf1029a2d5.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/51b3cc6bb7b74fcfa68c60852050d276.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/57d7906ca6cf4470843f7ac1885c0e9b.json",
            ]
        ]

        # 소녀시대 - 파티
        party = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/03b8c61845174e4c8842ef1099025d7c.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/8e0147bec8db42c689a68dee59be4f07.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/08c97e0611874d72b004947182fe6c03.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/c228cb8d92964585b1b1482ae79a4df4.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/52724dbfdb334fdf9542c2c8267ed0ea.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/38720785aaf844739a9002704411fa19.m3u8",
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/03b8c61845174e4c8842ef1099025d7c-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/8e0147bec8db42c689a68dee59be4f07-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/08c97e0611874d72b004947182fe6c03-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/c228cb8d92964585b1b1482ae79a4df4-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/52724dbfdb334fdf9542c2c8267ed0ea-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/38720785aaf844739a9002704411fa19-thumbnail.0000000.jpg",
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/03b8c61845174e4c8842ef1099025d7c.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/8e0147bec8db42c689a68dee59be4f07.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/08c97e0611874d72b004947182fe6c03.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/c228cb8d92964585b1b1482ae79a4df4.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/52724dbfdb334fdf9542c2c8267ed0ea.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/38720785aaf844739a9002704411fa19.json",
            ]
        ]

        # 레드벨벳 - 파워 업
        power_up = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/4f41bc8e0c24408db493e31c783f4f84.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/5c31c2de96b64dc3955f7affd5abbc64.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/707e5d5a5689439d98f23ff989da385b.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/96b3f6fc3d184f7c95d9e9b7aa5e02d4.m3u8",
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/4f41bc8e0c24408db493e31c783f4f84-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/5c31c2de96b64dc3955f7affd5abbc64-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/707e5d5a5689439d98f23ff989da385b-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/96b3f6fc3d184f7c95d9e9b7aa5e02d4-thumbnail.0000000.jpg",
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/4f41bc8e0c24408db493e31c783f4f84.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/5c31c2de96b64dc3955f7affd5abbc64.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/707e5d5a5689439d98f23ff989da385b.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/96b3f6fc3d184f7c95d9e9b7aa5e02d4.json",
            ]
        ]

        # 레드벨벳 - 빨간 맛
        red_flavor = [
            # 비디오
            [
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/832a395a882d4fef9cc3f4f5a0a16fa8.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/0c3870b624354df2b77ef0d7589a434b.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/56f423b912d340beb7d78cabd3427161.m3u8",
                "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/794c71a4a4fa4bddb3b97e1f0125a52a.m3u8",
            ],
            # 썸네일
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/832a395a882d4fef9cc3f4f5a0a16fa8-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/0c3870b624354df2b77ef0d7589a434b-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/56f423b912d340beb7d78cabd3427161-thumbnail.0000000.jpg",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer7/794c71a4a4fa4bddb3b97e1f0125a52a-thumbnail.0000000.jpg",
            ],
            # 키포인트
            [
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/832a395a882d4fef9cc3f4f5a0a16fa8.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/0c3870b624354df2b77ef0d7589a434b.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/56f423b912d340beb7d78cabd3427161.json",
                "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancer7/794c71a4a4fa4bddb3b97e1f0125a52a.json",
            ]
        ]

        musics = [basic_wave, love_me_right, gee, genie, I_got_a_boy, lion_heart, mrmr, party, power_up, red_flavor]

        for idx, music in enumerate(musics):
            try:
                post = DancerPost.objects.get(title=texts[idx])
            except DancerPost.DoesNotExist:
                continue

            for i in range(len(music)):
                seeder.add_entity(VideoSection, 1,
                                  {
                                      'dancer_post': post,
                                      'video': music[0][i],
                                      'thumbnail': music[1][i],
                                      'keypoints': music[2][i],
                                      'section_number': i,
                                  })

        seeder.execute()
