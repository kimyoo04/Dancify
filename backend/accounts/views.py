from django.http import JsonResponse
import io
import base64
import imghdr

from rest_framework.views import APIView
from rest_framework import status, serializers
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from accounts.serializers import LoginSerializer, RegisterSerializer, ProfileSerializer, UserSerializer
from accounts.authentication import handle_invalid_token
from accounts.authentication import decode_refresh_token
from accounts.authentication import set_cookies_to_response
from accounts.authentication import generate_token, get_user_info_from_token
from accounts.authentication import validate_access_token, validate_refresh_token
from s3_modules.authentication import get_s3_client
from accounts.models import User


class SignUpView(APIView):
    def post(self, request):
        parsed_data = request.data
        serializer = RegisterSerializer(data=parsed_data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return JsonResponse({'message': '회원가입에 성공하였습니다.'},
                                status=status.HTTP_201_CREATED)

        except serializers.ValidationError:
            """
            is_valid 자체에서 raise error 되면 serializer.py의
            사용자 정의 validate가 실행되지 않기에 호출
            """
            serializer.validate(parsed_data)


class SignInView(APIView):
    # 중복 로그인 처리 구현 필요
    # def is_duplicate_login(self, user):

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'userId': openapi.Schema(type=openapi.TYPE_STRING),
                'password': openapi.Schema(type=openapi.TYPE_STRING)
            }
        )
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError:
            return JsonResponse({'message': '아이디 또는 비밀번호가 틀렸습니다.'},
                                status=status.HTTP_401_UNAUTHORIZED)

        user_id_json = serializer.validated_data['userId']  # type: ignore

        # 중복 로그인 관련
        # user = User.objects.get(user_id = user_id_json)
        # # 중복로그인 시도
        # if user.jwt_token:

        # 로그인 : 토큰 발급
        refresh_token, access_token = generate_token(user_id_json, {})

        response_data = {
            'message': '로그인에 성공하였습니다.'
        }
        response = JsonResponse(response_data)
        response = set_cookies_to_response(response, refresh_token, access_token)

        return response


class SignOutView(APIView):
    def post(self, request):
        try:
            response = JsonResponse({'message': '로그아웃이 성공하였습니다.'},
                                    status=status.HTTP_200_OK)

            refresh_token = request.COOKIES['Refresh-Token']
            refresh_token = RefreshToken(refresh_token)
            refresh_token.blacklist()

            # 토큰 삭제
            response = set_cookies_to_response(response, '', '')

        except TokenError:
            result_message = '유효하지 않은 토큰입니다.'
            response = JsonResponse({'message': result_message},
                                    status=status.HTTP_401_UNAUTHORIZED)

        return response


# /api/auth/user
class JWTRefreshView(APIView):
    def post(self, request):
        refresh_token = None
        access_token = None
        response = None
        response_data = None
        try:
            refresh_token = request.COOKIES['Refresh-Token']
            access_token = request.COOKIES['Access-Token']

            """
            1번 시나리오: 리프레쉬 토큰 변조 확인
            2번 시나리오, 엑세스 토큰의 유효기간은 쿠키의 유효기간과 같기 때문에 서명은 정상인데 만료된 토큰은 존재할 수 없다.
            validate_access_token은 만료, 서명의 불일치, 변조된 토큰이면 False를 return한다.
            """
            if (not validate_refresh_token(refresh_token) or not
                    validate_access_token(access_token)):
                response = handle_invalid_token()
                return response

            # 그 외의 경우에는 토큰 재발급 진행
            user_info = decode_refresh_token(refresh_token)
            print('토큰 재발급 진행')
            print(user_info)

            new_refresh_token, new_access_token = \
                generate_token(user_info['userId'], user_info)

            response_data = {'user': True}
            response = JsonResponse(response_data)

            response = set_cookies_to_response(response, new_refresh_token,
                                               new_access_token)

        except KeyError:
            if refresh_token is None:
                print('리프레쉬 토큰x')
                response_data = {'user': False,
                                 'message': 'Refresh-Token이 존재하지 않습니다!'}
                response = JsonResponse(response_data,
                                        status=status.HTTP_401_UNAUTHORIZED)

            # 쿠키가 만료되어 access_token이 지워졌으므로 재발급 진행
            elif access_token is None:
                print('엑세스 토큰x 재발급 진행')
                user_info = decode_refresh_token(refresh_token)
                print(user_info)

                new_refresh_token, new_access_token =\
                    generate_token(user_info['userId'], user_info)

                response_data = {'user': True,
                                 'message': 'Access-Token이 존재하지 않습니다!'}
                response = JsonResponse(response_data)
                response = set_cookies_to_response(response, new_refresh_token,
                                                   new_access_token)

        return response


class UpdateProfileView(APIView):
    def upload_profile_image_to_s3(self, user_id, decoded_data):

        # 이미지를 메모리에 저장
        image_file = io.BytesIO(decoded_data)

        # MIME type 로 확장자명 추출
        extension = imghdr.what(None, decoded_data)
        file_name = user_id + '.' + extension

        # S3 클라이언트 생성
        s3 = get_s3_client()

        bucket_name = 'dancify-bucket'
        folder_path = 'profile-image'
        file_key = folder_path + '/' + file_name

        # s3 버킷에 이미지 업로드
        # fileobj는 로컬에 저장하지 않은 파일을 업로드
        s3.upload_fileobj(image_file, bucket_name, file_key)

        location = s3.get_bucket_location(Bucket=bucket_name)["LocationConstraint"]

        # s3 클라이언트 해제
        s3.close()

        return f"https://{bucket_name}.s3.\
{location}.amazonaws.com/{folder_path}/{file_name}"

    def patch(self, request):
        user_info = get_user_info_from_token(request)
        user = User.objects.get(user_id=user_info['userId'])
        parsed_data = request.data
        update_data = parsed_data

        if 'profileImage' in parsed_data:
            image_data = parsed_data['profileImage']
            decoded_data = base64.b64decode(image_data)

            profile_image_url = self.upload_profile_image_to_s3(user_info['userId'],
                                                                decoded_data)
            update_data['profileImage'] = profile_image_url

        serializer = ProfileSerializer(user, data=update_data, partial=True)  # type: ignore
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save(partial=True)

            response = JsonResponse({'message': '프로필 이미지가 수정되었습니다.'})
            refresh_token, access_token = \
                generate_token(user_info['userId'], {})
            response = set_cookies_to_response(response, refresh_token, access_token)

        except serializers.ValidationError:
            response = JsonResponse({'email': '이메일이 중복되었습니다.'},
                                    status=status.HTTP_400_BAD_REQUEST)

        return response

    def get(self, request):
        user_info = get_user_info_from_token(request)

        try:
            user = User.objects.get(user_id=user_info['userId'])

            serializer = UserSerializer(user)
            serializered_data = serializer.data
            response = JsonResponse(serializered_data)

        except Exception as e:
            print(e)
            response = JsonResponse({'error': e},
                                    status=status.HTTP_400_BAD_REQUEST)
        return response


# 미들웨어 테스트를 위한 테스트 뷰
class TestView(APIView):
    def post(self, request):
        print('test View 실행')
        json_data = {'test': 'success!'}
        response = JsonResponse(json_data)
        print('뷰 응답하기 바로 전')

        return response

# 폼 형식의 데이터를 처리할때
# class UpdateProfileView(APIView):
#     def patch(self, request):
#         user_info = get_user_info_from_token(self.request)
#         user = User.objects.get(user_id=user_info['userId'])

#         # request 데이터에는 사진이 폼형식으로 되어있기때문에 고쳐야함
#         form = ProfileForm(request, instance=user)
#         try:
#             if form.is_valid():
#                 form.save()
#             response = JsonResponse({'message': '프로필이 수정되었습니다.'})
#         except:
#             # form.erros 객체는 ErrorDict 클래스이며, 기본적으로 not hashable이다.
#             errors = form.errors.as_json()
#             response = JsonResponse({errors},
#                                     status=status.HTTP_400_BAD_REQUEST)

#         return response
