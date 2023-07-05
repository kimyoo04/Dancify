from django.db import transaction
from django.db.models import Q
from django.core.exceptions import ValidationError

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveDestroyAPIView
from rest_framework_simplejwt.exceptions import TokenError

from .models import DanceableFeedback, DancerFeedback, FeedbackPost, TimeStamp
from .serializers import (
    DancerFeedbackListSerializer,
    DanceableFeedbackListSerializer,
    DanceableFeedbackRequestSerializer,
    FeedbackDetailSerializer,
)
from accounts.models import User
from accounts.authentication import get_user_info_from_token
from s3_modules.upload import upload_video_with_metadata_to_s3


class FeedbackListAPIView(ListAPIView):
    """
    피드백 동영상 목록 조회
    """
    serializer_class = DanceableFeedbackListSerializer
    queryset = DanceableFeedback.objects.all()

    def list(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
            is_dancer = user_info['isDancer']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        user = User.objects.get(user_id=user_id)

        # 로그인한 유저가 댄서인 경우
        if is_dancer:
            self.serializer_class = DancerFeedbackListSerializer
            self.queryset = FeedbackPost.objects.filter(dancer_post__user=user)
            self.queryset = self.queryset.exclude(status='신청 전')
        else:
            self.serializer_class = DanceableFeedbackListSerializer
            self.queryset = FeedbackPost.objects.filter(user=user)

        for feedback_post in self.queryset:
            if not DanceableFeedback.objects.filter(feedback_post=feedback_post).exists():
                self.queryset = self.queryset.exclude(feedback_id=feedback_post.feedback_id)

        return super().list(request, *args, **kwargs)


class DanceableFeedbackRequestView(UpdateAPIView):
    """
    댄서블이 피드백을 요청하였을 경우 DB에 메시지를 저장하는 뷰

    PATCH  /api/feedbacks/danceable
    {
        "sections": [{
            "sectionId": feedback_section_id,
            "message": 댄서에게 전달하고 싶은 메시지
        }]
    }
    """
    serializer_class = DanceableFeedbackRequestSerializer

    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            user_id = user_info['userId']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        sections = request.data.get('sections', [])

        for section in sections:
            section_id = section.get('feedbackSectionId', None)
            message = section.get('message', None)

            try:
                danceable_feedback = DanceableFeedback.objects.get(feedback_section_id=section_id)

                # 로그인한 유저와 피드백 포스트 작성자가 일치하지 않을 경우
                if user_id != danceable_feedback.feedback_post.user.user_id:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)

                # 댄서블 피드백 메시지 저장
                danceable_feedback.message = message
                danceable_feedback.full_clean()
                danceable_feedback.save()

                # 댄서블 피드백 상태 대기 중으로 변경
                danceable_feedback.feedback_post.status = '대기 중'
                danceable_feedback.feedback_post.full_clean()
                danceable_feedback.feedback_post.save()
            except DanceableFeedback.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            except ValidationError:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


class DancerFeedbackResponseView(APIView):
    """
    댄서가 피드백에 응답하였을 경우 DB에 메시지를 저장하는 뷰

    POST  /api/feedbacks/dancer/<feedback_id>
    폼 데이터, `을 구분자로 사용
    "sectionId1": string
    "timeStamp1": int`int
    "feedbacks1": string`string
    "video1": 동영상
    "sectionId2": string
    "timeStamp2": int`int
    "feedbacks2": string`string
    "video2": 동영상
    ...
    """
    @transaction.atomic
    def post(self, request, feedback_id, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)
            user_id = user_info['userId']
            is_dancer = user_info['isDancer']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # 댄서가 아닌 경우 접근 불가
        if not is_dancer:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # 구간 개수 구하기
        feedback_post_count = DanceableFeedback.objects.filter(feedback_post__feedback_id=feedback_id).count()

        # 폼 데이터에서 데이터를 꺼내 리스트에 저장
        danceable_feedback_section_ids, timestamps, feedbacks, videos = [], [], [], []
        for i in range(1, feedback_post_count + 1):
            danceable_feedback_section_id = request.data.get('danceableSectionId{}'.format(i), None)
            if danceable_feedback_section_id is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            danceable_feedback_section_ids.append(danceable_feedback_section_id)

            timestamp = request.data.get('timeStamps{}'.format(i), None)
            if timestamp is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            timestamps.append(timestamp)

            feedback = request.data.get('feedbacks{}'.format(i), None)
            if feedback is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            feedbacks.append(feedback)

            video = request.data.get('video{}'.format(i), None)
            if video is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            videos.append(video)

        if feedback_post_count != len(danceable_feedback_section_ids):
            return Response(len(danceable_feedback_section_ids), status=status.HTTP_400_BAD_REQUEST)

        for i in range(len(danceable_feedback_section_ids)):
            # 타임스탬프 값과 피드백 값이 구분자로 한꺼번에 전달되므로
            # `를 기준으로 split함
            splitted_timestamps = timestamps[i].split('`')
            splitted_feedbacks = feedbacks[i].split('`')

            if len(splitted_timestamps) != len(splitted_feedbacks):
                return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

            # 입력받은 값으로 DancerFeedback 생성
            dancer_feedback = DancerFeedback(
                danceable_feedback=DanceableFeedback.objects.get(feedback_section_id=danceable_feedback_section_ids[i]),
                video=upload_video_with_metadata_to_s3(user_id, videos[i],
                                                       'feedback', False)['video_url']
            )

            try:
                dancer_feedback.full_clean()
                dancer_feedback.save()
            except ValidationError:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            # `를 기준으로 분할한 타임스탬프와 메시지로 데이터 생성
            for j in range(len(splitted_timestamps)):
                timestamp_data = TimeStamp(
                    dancer_feedback=dancer_feedback,
                    timestamp=splitted_timestamps[j],
                    message=splitted_feedbacks[j]
                )

                try:
                    timestamp_data.full_clean()
                    timestamp_data.save()
                except ValidationError:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

            feedback_post = FeedbackPost.objects.get(feedback_id=feedback_id)
            feedback_post.status = '완료'

            try:
                feedback_post.full_clean()
                feedback_post.save()
            except ValidationError:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


class FeedbackDetailRetrieveDestoryView(RetrieveDestroyAPIView):
    """
    피드백 요청 상세페이지를 반환하거나 피드백 아이디에 해당하는 행을 삭제하는 뷰

    <종류>
    - 댄서블(신청 전)
    - 댄서블(대기 중)
    - 댄서블(완료)
    - 댄서(대기 중)
    - 댄서(완료)
    총 5가지 종류의 페이지가 있음

    GET  /api/feedbacks/<feedback_id>
    POST /api/feedbacks/<feedback_id>
    """
    serializer_class = FeedbackDetailSerializer
    lookup_field = 'feedback_id'

    def retrieve(self, request, feedback_id, *args, **kwargs):
        try:
            user_info = get_user_info_from_token(request)

            is_dancer = user_info['isDancer']
        except (TokenError, KeyError):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # 엔드포인트에서 입력받은 feedback_id를 가지고 댄서블 피드백 상세페이지 조회
        try:
            feedback = FeedbackPost.objects.get(feedback_id=feedback_id)
        except FeedbackPost.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # 피드백 상태 (신청 전/대기 중/완료)
        feedback_status = feedback.status

        serializer = self.get_serializer(feedback)
        serializer_data = serializer.data

        # 댄서의 경우는 댄서블 닉네임이 뜨고,
        # 댄서블의 경우에는 댄서의 닉네임이 뜬다. (서로 반대되게)
        if is_dancer:
            serializer_data['nickname'] = feedback.user.nickname
            serializer_data['profileImage'] = feedback.user.profile_image
        else:
            serializer_data['nickname'] = feedback.dancer_post.user.nickname
            serializer_data['profileImage'] = feedback.dancer_post.user.profile_image

        # 엔드포인트에서 입력받은 feedback_id를 가지고 댄서블 피드백들을 조회한다.
        danceable_feedbacks = DanceableFeedback.objects.filter(feedback_post__feedback_id=feedback_id)

        # 섹션(리스트) 추가
        sections = []
        for danceable_feedback in danceable_feedbacks:
            # 만약 댄서가 피드백한 적이 없으면 dancer_feedback을 None으로 저장하고
            # 댄서 피드백 관련 로직은 처리하지 않음
            try:
                dancer_feedbacks = DancerFeedback.objects.filter(danceable_feedback__feedback_post__feedback_id=feedback_id)
            except DancerFeedback.DoesNotExist:
                dancer_feedbacks = None

            # 피드백 상태에 따라 섹션 데이터를 다르게 반환
            # 기본적으로 아이디, 댄서블 영상, 최초 피드백, 최고 피드백 반환
            sections_data = {
                'feedbackSectionId': danceable_feedback.feedback_section_id,
                'danceableVideo': danceable_feedback.video,
                'firstAiFeedback': danceable_feedback.first_score,
                'bestAiFeedback': danceable_feedback.best_score,
            }

            if feedback_status == '대기 중':
                sections_data['danceableMessage'] = danceable_feedback.message

            elif feedback_status == '완료':
                if dancer_feedbacks:
                    for dancer_feedback in dancer_feedbacks:
                        timestamps = TimeStamp.objects.filter(dancer_feedback=dancer_feedback).order_by('timestamp')
                        dancer_messages = []
                        for timestamp in timestamps:
                            dancer_message = {
                                'timeStamp': timestamp.timestamp,
                                'message': timestamp.message
                            }
                            dancer_messages.append(dancer_message)

                        sections_data['danceableMessage'] = danceable_feedback.message
                        sections_data['dancerVideo'] = dancer_feedback.video if dancer_feedback is not None else None
                        sections_data['dancerMessage'] = dancer_messages

            sections.append(sections_data)

        serializer_data['sections'] = sections

        return Response(serializer_data)

    def destroy(self, request, feedback_id, *args, **kwargs):
        feedback_post = FeedbackPost.objects.get(feedback_id=feedback_id)

        # 관련된 객체들을 삭제합니다.
        danceable_feedbacks = DanceableFeedback.objects.filter(feedback_post=feedback_post)
        dancer_feedbacks = DancerFeedback.objects.filter(danceable_feedback__in=danceable_feedbacks)
        timestamps = TimeStamp.objects.filter(dancer_feedback__in=dancer_feedbacks)

        # 삭제를 위해 queryset을 조합합니다.
        queryset = Q()
        queryset |= Q(pk=feedback_post.pk)
        queryset |= Q(pk__in=danceable_feedbacks.values('pk'))
        queryset |= Q(pk__in=dancer_feedbacks.values('pk'))
        queryset |= Q(pk__in=timestamps.values('pk'))

        # 객체들을 삭제합니다.
        FeedbackPost.objects.filter(queryset).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
