from django.http import JsonResponse
import uuid

from rest_framework.views import APIView

from accounts.authentication import get_user_info_from_token
from accounts.authentication import get_s3_client


class UploadTestView(APIView):
    def post(self, request):
        video = request.FILES['video']
        file_extension = '.mp4'
        user_info = get_user_info_from_token(request)
        user_id = user_info['userId']

        bucket_name = 'dancify-input'
        folder_path = f'vod/dancer/{user_id}/'
        file_key = folder_path + str(uuid.uuid4()) + file_extension

        s3 = get_s3_client()

        # 객체(폴더) 생성(s3에는 폴더라는 개념이 없음)
        s3.put_object(Bucket=bucket_name, Key=folder_path)

        # 파일 업로드
        s3.upload_fileobj(video, bucket_name, file_key)

        # 클라이언트 해제
        s3.close()

        return JsonResponse({"message": "success!"})
