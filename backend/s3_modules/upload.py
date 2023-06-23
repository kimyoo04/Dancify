import uuid
import io

from s3_modules.authentication import get_s3_client
from ai.video_to_keypoint.vtk import video_to_keypoint
from ai.face_mosaic.face_mosaic import face_mosaic

AWS_DOMAIN = "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/"
CLOUDFRONT_DOMAIN = "http://dyago72jbsqcn.cloudfront.net"


def upload_obj_to_s3(bucket_name, folder_path, file_key, object):
    s3 = get_s3_client()

    s3.put_object(Bucket=bucket_name, Key=folder_path)
    s3.upload_fileobj(io.BytesIO(object), bucket_name, file_key)

    s3.close()


def upload_post_image_to_s3(user_id, image):
    """
    Args:
        user_id: user_id(토큰 에서 받아온 정보)
        image: request.FILES['image']

    Returns:
        s3에 저장된 자유게시판 이미지 URL
    """
    image_file_extension = '.' + image.name.split('.')[-1]
    post_image_uuid = str(uuid.uuid4()).replace('-', '')

    bucket_name = 'dancify-bucket'
    folder_path = f'post-image/{user_id}/'
    file_key = folder_path + post_image_uuid + image_file_extension

    upload_obj_to_s3(bucket_name, folder_path, file_key, image.read())

    image_url = AWS_DOMAIN + file_key
    print('자유게시판 이미지 경로: ', image_url)

    return image_url


def upload_keypoint_to_s3(user_id, json_obj, video_uuid):
    bucket_name = 'dancify-bucket'
    folder_path = f'key-points/{user_id}/'
    file_key = folder_path + video_uuid + '.json'

    upload_obj_to_s3(bucket_name, folder_path, file_key, json_obj.encode())

    keypoint_url = AWS_DOMAIN + file_key
    print('키포인트 파일 경로: ', keypoint_url)

    return keypoint_url


def upload_video_to_s3(user_id, video, video_type, video_uuid, video_file_extension):
    """썸네일은 AWS MediaConvert job생성하여 자동으로 생성하고 업로드됨
    """
    bucket_name = 'dancify-input'
    folder_path = 'vod/' + video_type + f'/{user_id}/'
    file_key = folder_path + video_uuid + video_file_extension

    upload_obj_to_s3(bucket_name, folder_path, file_key, video)

    video_url = CLOUDFRONT_DOMAIN + '/' + file_key
    # mp3 to m3u8
    video_url = video_url.replace('.mp4', '.m3u8')
    print('비디오 파일 경로: ', video_url)

    return video_url


def get_thumbnailURL_from_s3(user_id, video_uuid):
    folder_path = f'thumbnail/{user_id}/'
    file_key = folder_path + video_uuid + '-thumbnail.0000000.jpg'

    thumbnail_url = AWS_DOMAIN + file_key
    print('썸네일 이미지 경로: ', thumbnail_url)

    return thumbnail_url


def upload_video_with_metadata_to_s3(user_id, video, video_type, is_mosaic):
    """
    Args:
        user_id: user_id(토큰 에서 받아온 정보)\n
        video: request.FILES['video']\n
        video_type: 'dancer', 'danceable', 'boast', 'feedback'\n
        is_mosaic: 모자이크 여부(boolean)

    Returns:
        dict = {
            "video_url" = "s3에 저장된 동영상 URL"\n
            "thumbnail_url" = "s3에 저장된 썸네일 이미지 URL\n
            "keypoint_url" = "s3에 저장된 키포인트 URL" - 존재하는 경우에만\n
            }

    """
    video_uuid = str(uuid.uuid4()).replace('-', '')
    video_file_extension = '.' + video.name.split('.')[-1]
    result = {}

    # 키포인트 업로드(댄서, 댄서블인 경우)
    if video_type in ['dancer', 'danceable']:
        json_obj = video_to_keypoint(video)
        result['keypoint_url'] = upload_keypoint_to_s3(user_id, json_obj,
                                                       video_uuid)

    # 파일 포인터를 맨 앞으로 위치시킴
    video.seek(0)

    # 모자이크 여부에 따른 처리
    if is_mosaic:
        video = face_mosaic(video)

    # 영상 업로드 & 썸네일 이미지 생성, 업로드
    result['video_url'] = upload_video_to_s3(user_id, video, video_type,
                                             video_uuid, video_file_extension)
    # 썸네일 URL
    result['thumbnail_url'] = get_thumbnailURL_from_s3
    return result
