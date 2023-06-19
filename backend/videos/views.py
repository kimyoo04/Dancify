from django.http import JsonResponse
import uuid
import os

from rest_framework.views import APIView
import boto3

from accounts.authentication import get_user_info_from_token


class UploadTestView(APIView):
    def post(self, request):
        video = request.FILES['video']
        file_extension = '.mp4'
        user_info = get_user_info_from_token(request)
        user_id = user_info['userId']

        bucket_name = 'dancify-input'
        folder_path = f'vod/dancer/{user_id}/'
        file_key = folder_path + str(uuid.uuid4()) + file_extension

        s3 = boto3.client(
            service_name='s3',
            region_name='ap-northeast-2',
            aws_access_key_id=os.getenv('ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('SECRET_ACCESS_KEY')
        )

        # 객체(폴더) 생성(s3에는 폴더라는 개념이 없음)
        s3.put_object(Bucket=bucket_name, Key=folder_path)

        # 파일 업로드
        s3.upload_fileobj(video, bucket_name, file_key)

        return JsonResponse({"message": "success!"})
