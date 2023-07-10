import os
from botocore.exceptions import NoCredentialsError

from rest_framework import status
from rest_framework.response import Response

from s3_modules.authentication import get_s3_client

AWS_DOMAIN = os.getenv('AWS_DOMAIN')


def extract_file_key_from_url(url):
    """
    주어진 S3 URL에서 파일 키를 추출합니다.

    Args:
        url (str): S3 URL (예: "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable1/6015493aa1cc4ff78eaaabe449cc1775.json")

    Returns:
        str: 추출된 파일 키 (예: "key-points/dancable1/6015493aa1cc4ff78eaaabe449cc1775.json")

    Raises:
        ValueError: 유효하지 않은 S3 URL인 경우 발생합니다.
    """
    if url.startswith(AWS_DOMAIN):
        return url[len(AWS_DOMAIN):]
    else:
        raise ValueError("Invalid S3 URL")


def download_json_from_s3(aws_bucket, url, local_path):
    """
    주어진 S3 URL에서 JSON 파일을 다운로드하여 로컬에 저장하고 저장된 파일의 경로를 반환합니다.

    Args:
        aws_bucket (str): S3 버킷의 이름
        url (str): S3 URL (예: "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/key-points/dancable1/6015493aa1cc4ff78eaaabe449cc1775.json")
        local_path (str): 로컬 시스템에서 파일을 저장할 경로와 이름

    Returns:
        str: 저장된 파일의 경로 (다운로드가 실패한 경우 None을 반환합니다.)

    Raises:
        NoCredentialsError: AWS 인증 정보가 없는 경우 발생합니다.
        Exception: 기타 다운로드 오류가 발생한 경우 발생합니다.
    """
    s3 = get_s3_client()
    file_key = extract_file_key_from_url(url)

    try:
        file_name = os.path.basename(file_key)
        file_path = os.path.join(local_path, file_name)
        s3.download_file(aws_bucket, file_key, file_path)
        return file_path
    except NoCredentialsError:
        print('AWS credentials not found.')
        return Response(status=status.HTTP_403_FORBIDDEN)
    except Exception as e:
        print(f'Error downloading JSON file from S3: {e}')
        return Response(status=status.HTTP_404_NOT_FOUND)
