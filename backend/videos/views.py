from django.http import JsonResponse
import uuid
import io

from rest_framework.views import APIView

from accounts.authentication import get_user_info_from_token
from accounts.authentication import get_s3_client
from ai.video_to_keypoint.vtk import video_to_keypoint
from ai.face_mosaic.face_mosaic import face_mosaic


# 실제 플로우에는 썸네일 이미지도 요청에 포함되어있음
class UploadTestView(APIView):
    def post(self, request):
        video = request.FILES['video']
        thumbnail = request.FILES['thumbnail']

        video_file_extension = '.' + video.name.split('.')[-1]
        thumbnail_file_extension = '.' + thumbnail.name.split('.')[-1]
        user_info = get_user_info_from_token(request)
        user_id = user_info['userId']
        video_uuid = str(uuid.uuid4()).replace('-', '')

        s3 = get_s3_client()

        # json 파일 업로드 - 댄서블 & 댄서 영상에만..
        json_obj = video_to_keypoint(video)
        bucket_name = 'dancify-bucket'
        folder_path = f'key-points/{user_id}/'
        file_key = folder_path + video_uuid + '.json'

        s3.put_object(Bucket=bucket_name, Key=folder_path)
        s3.upload_fileobj(io.BytesIO(json_obj.encode()), bucket_name, file_key)

        # 썸네일 업로드
        bucket_name = 'dancify-bucket'
        folder_path = f'thumbnail/{user_id}/'
        file_key = folder_path + video_uuid + thumbnail_file_extension

        s3.put_object(Bucket=bucket_name, Key=folder_path)
        s3.upload_fileobj(io.BytesIO(thumbnail.read()), bucket_name, file_key)

        # 영상 업로드
        # 파일 포인터를 맨 앞으로 위치시킴
        video.seek(0)
        bucket_name = 'dancify-input'
        folder_path = f'vod/danceable/{user_id}/'
        file_key = folder_path + video_uuid + video_file_extension

        # 모자이크, 더미데이터를 위해 잠시 주석처리
        # video = face_mosaic(video)
        # s3.upload_fileobj(io.BytesIO(video), bucket_name, file_key)


        s3.put_object(Bucket=bucket_name, Key=folder_path)
        s3.upload_fileobj(video, bucket_name, file_key)


        # 클라이언트 해제
        s3.close()

        return JsonResponse({"message": "success!"})
