from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework import status, serializers
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from accounts.serializers import LoginSerializer, RegisterSerializer
from accounts.authentication import handle_invalid_token
from accounts.authentication import decode_refresh_token, decode_access_token
from accounts.authentication import create_jwt_token
from accounts.authentication import generate_token
from accounts.authentication import check_access_token_exp,\
    validate_access_token, validate_refresh_token

REFRESH_TOKEN_EXP = 60 * 60 * 24 * 30
ACCESS_TOKEN_EXP = 60


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
        refresh_token = create_jwt_token(user_id_json, 'refresh')
        acccess_token = create_jwt_token(user_id_json, 'access')

        response_data = {
            'message': '로그인에 성공하였습니다.'
        }
        response = JsonResponse(response_data)
        response.content = response_data

        response.set_cookie('Refresh-Token', refresh_token,
                            max_age=REFRESH_TOKEN_EXP, httponly=True)
        response.set_cookie('Access-Token', acccess_token,
                            max_age=ACCESS_TOKEN_EXP)

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
            response.set_cookie('Refresh-Token', '',
                                max_age=REFRESH_TOKEN_EXP,
                                httponly=True)
            response.set_cookie('Access-Token', '',
                                max_age=ACCESS_TOKEN_EXP)

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
    def post(self, request):
        refresh_token = None
        access_token = None
        response = None
        response_data = None
        try:
            refresh_token = request.COOKIES['Refresh-Token']
            access_token = request.COOKIES['Access-Token']

            # 1번 시나리오
            if not validate_refresh_token(refresh_token):
                response = handle_invalid_token()
                return response

            # 2번 시나리오, 유효기간 정상이지만 변조되거나 서명이 잘못된경우
            if check_access_token_exp and not validate_access_token:
                response = handle_invalid_token()
                return response

            # 그 외의 경우에는 토큰 재발급 진행
            user_info = decode_access_token(access_token)
            print('토큰 재발급 진행')
            print(user_info)

            new_refresh_token, new_access_token = generate_token(user_info)

            response_data = {'user': True}
            response = JsonResponse(response_data)

            response.set_cookie('Refresh-Token', new_refresh_token,
                                max_age=REFRESH_TOKEN_EXP, httponly=True)
            response.set_cookie('Access-Token', new_access_token,
                                max_age=ACCESS_TOKEN_EXP)

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

                new_refresh_token, new_access_token = generate_token(user_info)

                response_data = {'user': True,
                                 'message': 'Access-Token이 존재하지 않습니다!'}
                response = JsonResponse(response_data)

                response.set_cookie('Refresh-Token', new_refresh_token,
                                    max_age=REFRESH_TOKEN_EXP, httponly=True)
                response.set_cookie('Access-Token', new_access_token,
                                    max_age=ACCESS_TOKEN_EXP)

        return response
