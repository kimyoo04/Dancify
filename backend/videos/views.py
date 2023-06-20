from django.http import JsonResponse
import uuid
import io

from rest_framework.views import APIView

from accounts.authentication import get_user_info_from_token
from accounts.authentication import get_s3_client
from ai.video_to_keypoint.vtk import video_to_keypoint
from ai.face_mosaic.face_mosaic import face_mosaic


class UploadTestView(APIView):
    def post(self, request):
        video = request.FILES['video']

        file_extension = '.webm'
        user_info = get_user_info_from_token(request)
        user_id = user_info['userId']
        video_uuid = str(uuid.uuid4()).replace('-', '')

        bucket_name = 'dancify-input'
        folder_path = f'vod/boast/{user_id}/'
        file_key = folder_path + video_uuid + file_extension

        s3 = get_s3_client()

        # 객체(폴더) 생성(s3에는 폴더라는 개념이 없음)
        s3.put_object(Bucket=bucket_name, Key=folder_path)

        # 파일 업로드

        json_obj = video_to_keypoint(video)
        bucket_name = 'dancify-bucket'
        folder_path = f'key-points/{user_id}/'
        file_key = file_key = folder_path + video_uuid + '.json'
        s3.upload_fileobj(io.BytesIO(json_obj.encode()), bucket_name, file_key)

        file_key = file_key = folder_path + video_uuid + '.webm'
        video = face_mosaic(video)
        s3.upload_fileobj(io.BytesIO(video), bucket_name, file_key)

        # 클라이언트 해제
        s3.close()

        return JsonResponse({"message": "success!"})
