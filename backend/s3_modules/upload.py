import uuid
import io

from s3_modules.authentication import get_s3_client

AWS_DOMAIN = "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/"
CLOUDFRONT_DOMAIN = "http://dyago72jbsqcn.cloudfront.net"


def upload_post_image_at_s3(user_id, image):
    """
    Args:
        user_id: user_id(토큰 에서 받아온 정보)
        image: request.FILES['image']

    Returns:
        s3에 저장된 자유게시판 이미지 URL
    """
    s3 = get_s3_client()
    image_file_extension = '.' + image.name.split('.')[-1]
    post_image_uuid = str(uuid.uuid4()).replace('-', '')

    bucket_name = 'dancify-bucket'
    folder_path = f'post-image/{user_id}/'
    file_key = folder_path + post_image_uuid + image_file_extension

    s3.put_object(Bucket=bucket_name, Key=folder_path)
    s3.upload_fileobj(io.BytesIO(image.read()), bucket_name, file_key)

    image_url = AWS_DOMAIN + file_key
    print('자유게시판 이미지 경로: ', image_url)

    return image_url

def upload_video_at_s3(user_id, video, video_type):
    """
    Args:
        user_id: user_id(토큰 에서 받아온 정보)
        image: request.FILES['video']
        video_type: 'dancer', 'boast', 'feedback', 'dancable'

    Returns:
        s3에 저장된 자유게시판 이미지 URL
    """