import os

import boto3


def get_s3_client():
    """_summary_
        비공개 s3 버킷에 접근할 수 있는 s3클라이언트를 받아옵니다.
    Returns:
        인증받은 s3 클라이언트 객체
    """
    s3 = boto3.client(
        service_name='s3',
        region_name='ap-northeast-2',
        aws_access_key_id=os.getenv('DJANGO_S3_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('DJANGO_S3_SECRET_ACCESS_KEY')
    )

    return s3
