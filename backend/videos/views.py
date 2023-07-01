from django.http import JsonResponse
from django.conf import settings
import uuid
import io
import os
import shutil

from rest_framework.views import APIView
from moviepy.editor import VideoFileClip, AudioFileClip

from accounts.authentication import get_user_info_from_token
from s3_modules.authentication import get_s3_client
from s3_modules.upload import upload_video_with_metadata_to_s3
from s3_modules.upload import upload_video_to_s3
from s3_modules.upload import upload_splitted_video_to_s3, save_tmp_video
from ai.modules_for_async.vtk import video_to_keypoint
from ai.modules_for_async.face_mosaic import face_mosaic


# 실제 플로우에는 썸네일 이미지도 요청에 포함되어있음
class UploadTestView(APIView):
    def post(self, request):
        video = request.FILES['video']
        # thumbnail = request.FILES['thumbnail']

        video_file_extension = '.' + video.name.split('.')[-1]
        # thumbnail_file_extension = '.' + thumbnail.name.split('.')[-1]
        user_info = get_user_info_from_token(request)
        user_id = user_info['userId']
        video_uuid = str(uuid.uuid4()).replace('-', '')

        s3 = get_s3_client()

        # json 파일 업로드 - 댄서블 & 댄서 영상에만..
        videopath = save_tmp_video(video, user_id)
        video_to_keypoint.delay(videopath)

        # bucket_name = 'dancify-bucket'
        # folder_path = f'key-points/{user_id}/'
        # file_key = folder_path + video_uuid + '.json'

        # s3.put_object(Bucket=bucket_name, Key=folder_path)
        # s3.upload_fileobj(io.BytesIO(json_obj.encode()), bucket_name, file_key)

        # 썸네일 업로드
        # bucket_name = 'dancify-bucket'
        # folder_path = f'thumbnail/{user_id}/'
        # file_key = folder_path + video_uuid + thumbnail_file_extension

        # s3.put_object(Bucket=bucket_name, Key=folder_path)
        # s3.upload_fileobj(io.BytesIO(thumbnail.read()), bucket_name, file_key)

        # 영상 업로드
        # 파일 포인터를 맨 앞으로 위치시킴
        # video.seek(0)
        bucket_name = 'dancify-input'
        folder_path = f'vod/danceable/{user_id}/'
        file_key = folder_path + video_uuid + video_file_extension

        result = face_mosaic.delay(videopath)
        result.wait()
        task_result = result.get()

        s3.put_object(Bucket=bucket_name, Key=folder_path)
        s3.upload_fileobj(io.BytesIO(task_result), bucket_name, file_key)

        # 클라이언트 해제
        s3.close()

        localpath = settings.BASE_DIR  # 프로젝트 최상위 폴더
        localpath = os.path.join(localpath, 'tmp_video')  # 현재 폴더/tmp_video/
        localpath = os.path.join(localpath, user_id)
        shutil.rmtree(localpath)

        return JsonResponse({"message": "success!"})


class IntegratedTestView(APIView):
    def post(self, request):
        user_info = get_user_info_from_token(request)
        user_id = user_info['userId']

        result = upload_video_with_metadata_to_s3(user_id, request.FILES['video'],
                                                  'dancer', True)
        return JsonResponse(result)


class CutVideoTestView(APIView):
    def post(self, request):
        video = request.FILES['video']
        start = int(request.data['start'])
        end = int(request.data['end'])

        # 영상 저장할 경로 지정
        localpath = os.path.dirname(os.path.abspath(__file__))  # 현재 폴더
        localpath = os.path.join(localpath, 'video')  # 현재 폴더/video/
        os.makedirs(localpath, exist_ok=True)  # 폴더 생성

        local_videopath = os.path.join(localpath, 'video_original.mp4')
        result_path = os.path.join(localpath, 'result.mp4')

        with open(local_videopath, 'wb') as destination:
            for chunk in video.chunks():
                destination.write(chunk)

        # 비디오 자르기
        video = VideoFileClip(local_videopath).subclip(start, end)
        audio = AudioFileClip(local_videopath).subclip(start, end)

        result = video.set_audio(audio)
        result.write_videofile(result_path)

        with open(result_path, 'rb') as file:
            result_video = file.read()  # 바이너리 파일

        # 편집에 사용되었던 localpath 폴더 삭제
        shutil.rmtree(localpath)

        result = upload_video_to_s3('user_id', result_video,
                                    'dancer', 'dsifji321432jf', '.mp4')

        return JsonResponse({'video_url': result})


class SplittedVideoUploadTest(APIView):
    def post(self, request):
        user_info = get_user_info_from_token(request)
        user_id = user_info['userId']

        result = upload_splitted_video_to_s3(request, user_id)

        return JsonResponse({'result': result})
