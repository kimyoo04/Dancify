from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework import status, serializers
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
import json
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


from accounts.models import User
from accounts.serializers import LoginSerializer
from accounts.authentication import decode_access_token
from accounts.authentication import create_jwt_token
from accounts.authentication import check_access_token_exp,\
    validate_access_token, validate_refresh_token


def check_duplicate_userId(user_id_json):
    """
    아이디 중복 확인 함수
    """
    try:
        User.objects.get(user_id=user_id_json)
        return True
    except User.DoesNotExist:
        return False


@csrf_exempt
def SignUpView(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)

        # serializer 구현이 필요
        user_id_json = json_data['userId']
        password_json = json_data['password']
        password_check_json = json_data['passwordCheck']
        email_json = json_data['email']
        nickname_json = json_data['nickname']
        phone_json = json_data['phone']
        is_dancer_json = json_data['isDancer']

        if check_duplicate_userId(user_id_json):
            return JsonResponse({"message": "이미 존재하는 아이디입니다."},
                                status=status.HTTP_409_CONFLICT)

        if password_json == password_check_json:
            user = User.objects.create_user(
                user_id=user_id_json,
                password=password_json,
                email=email_json,
                nickname=nickname_json,
                phone=phone_json,
                is_dancer=is_dancer_json
            )
            user.save()

            return JsonResponse({'message': '회원가입에 성공하였습니다.'},
                                status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'message': '비밀번호가 일치하지 않습니다.'},
                                status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):
    def is_duplicate_login(self, token):
        if token is None:
            return False

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
                                status=status.HTTP_400_BAD_REQUEST)

        user_id_json = serializer.validated_data['userId']  # type: ignore

        # 로그인 : 토큰 발급
        refresh_token = create_jwt_token(user_id_json, 'refresh')
        acccess_token = create_jwt_token(user_id_json, 'access')

        response = JsonResponse({'message': '로그인이 성공하였습니다.'},
                                status=status.HTTP_200_OK)

        response.set_cookie('Refresh-Token', refresh_token)
        response.set_cookie('Access-Token', acccess_token)

        return response


class SignOutView(APIView):
    def post(self, request):
        try:
            response = JsonResponse({'message': '로그아웃이 성공하였습니다.'},
                                    status=status.HTTP_200_OK)

            refresh_token = request.COOKIES['Refresh-Token']
            refresh_token = RefreshToken(refresh_token)
            refresh_token.blacklist()

        except TokenError:
            result_message = '유효하지 않은 토큰입니다.'
            response = JsonResponse({'message': result_message},
                                    status=status.HTTP_401_UNAUTHORIZED)

        return response


"""
1. refreshtoken이 변조되었거나 만료되었으면 쿠키삭제
2. accessToken이 시간은 우효하지만 변조되었다면 쿠키삭제
3. 나머지 경우는 access, refresh 재발급
"""


class JWTRefreshView(APIView):
    def handle_invalid_token(self):
        response = JsonResponse({'user': False}, status=status.HTTP_401_UNAUTHORIZED)

        response.delete_cookie('Access-Token')
        response.delete_cookie('Refresh-Token')

        return response

    def post(self, request):
        try:
            # 토큰을 쿠키에서 지워주는 코드인데... postman에서 작동이 안되는 것으로 보임
            access_token = request.COOKIES['Access-Token']
            refresh_token = request.COOKIES['Refresh-Token']
            user_info = decode_access_token(access_token)

            # 1번 시나리오
            if not validate_refresh_token(refresh_token):
                return self.handle_invalid_token()

            # 2번 시나리오, 유효기간 정상이지만 변조되거나 서명이 잘못된경우
            if check_access_token_exp and not validate_access_token:
                return self.handle_invalid_token()

            # 그 외의 경우에는 토큰 재발급 진행
            new_refresh_token = create_jwt_token(user_info['userId'],
                                                 'refresh', user_info)
            new_acccess_token = create_jwt_token(user_info['userId'],
                                                 'access', user_info)

            response = JsonResponse({'user': True},
                                    status=status.HTTP_200_OK)

            response.set_cookie('Refresh-Token', new_refresh_token)
            response.set_cookie('Access-Token', new_acccess_token)

            return response

        except (TokenError, KeyError):
            return JsonResponse({'user': False},
                                status=status.HTTP_401_UNAUTHORIZED)
