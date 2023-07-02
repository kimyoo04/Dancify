import os
import json

from django.conf import settings
from django.http import JsonResponse
from django.core.exceptions import ValidationError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError

from accounts.models import User
from accounts.authentication import get_user_info_from_token
from posts.models import DancerPost
from feedbacks.models import FeedbackPost
from video_section.models import VideoSection
from .serializers import DanceableSectionSerializer

from ai.ai_feedback.ai_feedback import create_json
from s3_modules.upload import upload_video_with_metadata_to_s3
from s3_modules.upload import upload_obj_to_s3
from s3_modules.download import download_json_from_s3

AWS_DOMAIN = "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/"


class EndPartDanceView(APIView):
    def post(self, request):
        try:
            user_info = get_user_info_from_token(request)
            user_id = user_info['userId']
            is_dancer = user_info['isDancer']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if is_dancer:
            return Response(status=status.HTTP_403_FORBIDDEN)

        data = request.data

        if data['mosaic'] == 'true':
            is_mosaic = True
        else:
            is_mosaic = False

        url_data = upload_video_with_metadata_to_s3(user_id, data['video'],
                                                    'danceable', is_mosaic)
        data['video'] = url_data['video_url']
        data['thumbnail'] = url_data['thumbnail_url']
        data['keypoints'] = url_data['keypoint_url']

        section = VideoSection.objects.get(section_id=data['sectionId'])

        # 로컬에 json 파일 저장
        # 폴더가 존재하지 않으면 생성
        path = os.path.join(settings.BASE_DIR, 'temp')
        if not os.path.exists(path):
            os.makedirs(path)

        # AWS 정보
        bucket_name = 'dancify-bucket'

        # 댄서 json 로컬에 저장
        dancer_json_path = download_json_from_s3(aws_bucket=bucket_name,
                                                 url=section.dancer_post.keypoints,
                                                 local_path=path)
        if dancer_json_path is None:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        first_score_file_path = os.path.join(path, 'first.json')
        best_score_file_path = os.path.join(path, 'best.json')

        if 'firstScore' in request.FILES:
            file = request.FILES['firstScore']
            file_data = file.read()

            # 파일을 로컬에 저장
            with open(first_score_file_path, 'wb') as local_file:
                local_file.write(file_data)

        if 'bestScore' in request.FILES:
            file = request.FILES['bestScore']
            file_data = file.read()

            # 파일을 로컬에 저장
            with open(best_score_file_path, 'wb') as local_file:
                local_file.write(file_data)

        # AI 피드백 결과 반환
        first_score = json.dumps(create_json(str(dancer_json_path), str(first_score_file_path))).encode('utf-8')
        best_score = json.dumps(create_json(str(dancer_json_path), str(best_score_file_path))).encode('utf-8')

        folder_path = f'scores/{user_id}/'
        first_score_file_key = folder_path + \
            str(data['feedbackId']) + str(section.section_id) + '-first_score.json'
        best_score_file_key = folder_path + \
            str(data['feedbackId']) + str(section.section_id) + '-best_score.json'

        upload_obj_to_s3(bucket_name, folder_path,
                         first_score_file_key, first_score)
        upload_obj_to_s3(bucket_name, folder_path,
                         best_score_file_key, best_score)

        data['bestScore'] = AWS_DOMAIN + best_score_file_key
        data['firstScore'] = AWS_DOMAIN + first_score_file_key

        serializer = DanceableSectionSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(feedback_post=FeedbackPost.objects.get(feedback_id=data['feedbackId']),
                        section=section)

        return Response(status=status.HTTP_200_OK)


class StartPracticeView(APIView):
    def post(self, request):
        try:
            user_info = get_user_info_from_token(request)
            user_id = user_info['userId']
            is_dancer = user_info['isDancer']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if is_dancer:
            return Response(status=status.HTTP_403_FORBIDDEN)

        post_id = request.data['postId']
        try:
            feedback_post = FeedbackPost(user=User.objects.get(user_id=user_id))
            feedback_post.dancer_post = DancerPost.objects.get(post_id=post_id)
        except (FeedbackPost.DoesNotExist, DancerPost.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            feedback_post.full_clean()
            feedback_post.save()
        except ValidationError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return JsonResponse({"feedbackId": feedback_post.feedback_id})
