from django.http import JsonResponse
from django.core.exceptions import ValidationError
import io

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError

from accounts.models import User
from accounts.authentication import get_user_info_from_token
from posts.models import DancerPost
from feedbacks.models import FeedbackPost
from feedbacks.dance_serializers import DanceableSectionSerializer
from video_section.models import VideoSection

from s3_modules.upload import upload_video_with_metadata_to_s3
from s3_modules.upload import upload_obj_to_s3

AWS_DOMAIN = "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/"


class EndDanceView(APIView):
    def post(self, request):
        try:
            user_info = get_user_info_from_token(request)
            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

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

        bucket_name = 'dancify-bucket'
        folder_path = f'scores/{user_id}/'
        first_score_file_key = folder_path + \
            str(section.section_id) + '-first_score.json'
        best_score_file_key = folder_path + \
            str(section.section_id) + '-best_score.json'

        upload_obj_to_s3(bucket_name, folder_path,
                         first_score_file_key, data['firstScore'].read())
        upload_obj_to_s3(bucket_name, folder_path,
                         best_score_file_key, data['bestScore'].read())

        data['bestScore'] = AWS_DOMAIN + best_score_file_key
        data['firstScore'] = AWS_DOMAIN + first_score_file_key

        serializer = DanceableSectionSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(feedback_post=FeedbackPost.objects.get(feedback_id=data['feedbackId']),
                        section=section)

        return JsonResponse(data)


class StartExerciseView(APIView):
    def post(self, request):
        try:
            user_info = get_user_info_from_token(request)
            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        post_id = request.data['postId']
        feedback_post = FeedbackPost(user=User.objects.get(user_id=user_id))
        feedback_post.dancer_post = DancerPost.objects.get(post_id=post_id)

        try:
            feedback_post.full_clean()
            feedback_post.save()
        except ValidationError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return JsonResponse({"feedbackId": feedback_post.feedback_id})
