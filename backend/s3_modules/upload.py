from django.conf import settings
import uuid
import io
import os
import shutil

from s3_modules.authentication import get_s3_client
from ai.video_to_keypoint.vtk import video_to_keypoint
from ai.face_mosaic.face_mosaic import face_mosaic
from moviepy.editor import VideoFileClip, AudioFileClip
from ai.shortform_generate.shortform_generator import generate_video

AWS_DOMAIN = "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/"
# CLOUDFRONT_DOMAIN = "http://dyago72jbsqcn.cloudfront.net"
CLOUDFRONT_DOMAIN = "https://d2w69iexuycwsi.cloudfront.net"


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


def upload_keypoints_to_s3(user_id, json_obj, video_uuid):
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


def upload_video_with_metadata_to_s3(user_id, video, video_type, is_mosaic, video_file_extension=''):
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

    if video_file_extension == '':
        video_file_extension = '.' + video.name.split('.')[-1]

    result = {}

    # 키포인트 업로드(댄서, 댄서블인 경우)
    if video_type in ['dancer', 'danceable']:
        json_obj = video_to_keypoint(video)
        result['keypoint_url'] = upload_keypoints_to_s3(user_id, json_obj,
                                                        video_uuid)
    if not isinstance(video, bytes):
        # 파일 포인터를 맨 앞으로 위치시킴
        # bytes 객체는 seek()가 없음
        video.seek(0)

    # 모자이크 여부에 따른 처리
    if is_mosaic:
        video = face_mosaic(video)

    # upload_fileobj 사용을 위해 모자이크 함수를 거치지 않으면 파일객체를 읽어서 bytes객체 반환
    # bytes 객체는 read() 없음
    elif not isinstance(video, bytes):
        video = video.read()

    local_video_path = save_tmp_video(video, video_file_extension, video_uuid)

    generate_video(local_video_path, os.path.join(os.path.dirname(local_video_path), ''))
    with open(local_video_path, 'rb') as video_file:
        video = video_file.read()

    # 영상 업로드 & 썸네일 이미지 생성, 업로드
    result['video_url'] = upload_video_to_s3(user_id, video, video_type,
                                             video_uuid, video_file_extension)
    # 썸네일 URL
    result['thumbnail_url'] = get_thumbnailURL_from_s3(user_id, video_uuid)

    shutil.rmtree(os.path.dirname(local_video_path))
    return result


def split_video(user_id, video_file_extension, start_timestamp, end_timestamp):
    """타임스탬프에 맞게 비디오를 분할합니다.
    로컬에 임시저장된 전체 비디오를 경로를 통해 읽어옵니다.

    Args:
        video_file_extension(str): .을 뺀 동영상의 확장자명
        start_timestamp (int): 분할 영상의 시작지점(초)
        end_timestamp (int): 분할 영상의 종료지점(초)

    Returns:
        _type_: result_video(Bytes)
    """
    # 임시로 저장된 영상 불러올 경로 지정
    localpath = settings.BASE_DIR  # 프로젝트 최상위 폴더
    localpath = os.path.join(localpath, 'tmp_video')

    local_videopath = os.path.join(localpath,
                                   'video_original' + video_file_extension)
    result_path = os.path.join(localpath, 'result.mp4')

    # 비디오 자르기
    video = VideoFileClip(local_videopath).subclip(start_timestamp,
                                                   end_timestamp)
    audio = AudioFileClip(local_videopath).subclip(start_timestamp,
                                                   end_timestamp)
    # 영상과 오디오 합치기
    result = video.set_audio(audio)
    result.write_videofile(result_path)

    with open(result_path, 'rb') as file:
        result_video = file.read()  # 바이너리 파일

    return result_video


def upload_splitted_video_to_s3(request, user_id):
    """분할한 영상을 s3에 업로드합니다.

    Args:
        request: 요청 객체
        user_id : user_id
    Returns:
        result(list): 리스트 안에 분할영상의 키포인트, 썸네일, 동영상의 주소 가
        딕셔너리 형태로 저장되어 있습니다.
    """
    video_type = 'dancer'
    is_mosaic = False
    video_file_extension = '.' + request.data['videoExtension']
    time_stamps = request.data['timeStamps']

    time_stamps = list(map(int, time_stamps.split()))
    result = []
    for i in range(0, len(time_stamps), 2):
        splitted_video = split_video(user_id, video_file_extension,
                                     time_stamps[i], time_stamps[i + 1])
        result.append(upload_video_with_metadata_to_s3(user_id,
                                                       splitted_video,
                                                       video_type,
                                                       is_mosaic,
                                                       video_file_extension))
    # 편집에 사용되었던 localpath 폴더 삭제
    localpath = settings.BASE_DIR
    shutil.rmtree(os.path.join(localpath, 'tmp_video'))
    return result


def save_tmp_video(video, video_file_extension, video_uuid):
    localpath = settings.BASE_DIR  # 프로젝트 최상위 폴더
    localpath = os.path.join(localpath, 'tmp_video', video_uuid)  # 현재 폴더/tmp_video/{video_uuid}
    os.makedirs(localpath, exist_ok=True)  # 폴더 생성

    local_videopath = os.path.join(localpath, 'video_original' + video_file_extension)

    with open(local_videopath, 'wb') as output_file:
        output_file.write(video)

    return local_videopath
