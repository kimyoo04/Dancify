from datetime import timedelta
from datetime import datetime
import jwt
from jwt.exceptions import InvalidSignatureError

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from accounts.models import User


"""
토큰을 생성할 때는 userId로 DB에 접근해서 정보들을 만든다
토큰을 decode 할때는 종합적인 user_info 가 나옴
"""


# JWT 토큰 decode
def decode_access_token(access_token):
    access_token_obj = AccessToken(token=access_token)
    payload = access_token_obj.payload

    user_info = {'userId': payload['userId'], 'nickname': payload['nickname'],
                 'isDancer': payload['isDancer'], 'profileImage': payload['profileImage']}

    return user_info


def create_jwt_token(user_id, token_type, user_info={}):
    token = None

    try:
        if not user_info:
            # serializer으로 구현 필요
            user = User.objects.get(user_id=user_id)
            user_info['userId'] = user.user_id
            user_info['nickname'] = user.nickname
            user_info['isDancer'] = user.is_dancer
            user_info['profileImage'] = user.profile_image

        if token_type == 'refresh':
            token = RefreshToken()

            # 사용자 ID를 페이로드에 추가
            for key, value in user_info.items():
                token[key] = value

            # 만료 시간 설정 (예: 30일)
            token.set_exp(lifetime=timedelta(days=30))

        elif token_type == 'access':
            token = AccessToken()

            for key, value in user_info.items():
                token[key] = value
            token.set_exp(lifetime=timedelta(hours=1))

        return str(token)
    except TokenError:
        return '토큰을 생성하지 못하였습니다.'


def check_access_token_exp(token):
    try:
        access_token = AccessToken(token)

        # 토큰 만료 시간 확인
        expiration_timestamp = access_token['exp']
        current_timestamp = datetime.utcnow().timestamp()
        if current_timestamp > expiration_timestamp:
            raise TokenError("Access Token has expired")

        return True
    except TokenError:
        # 토큰이 변조되었거나 유효하지 않은 경우
        return False


def validate_access_token(token):
    try:
        jwt.decode(token, verify=False)

        return True
    except InvalidSignatureError:
        # 서명 검증에 실패하여 변조가 있음을 의미
        return False


def validate_refresh_token(token):
    try:
        refresh_token = RefreshToken(token)

        # 토큰 유효성 확인
        refresh_token.verify()

        expiration_timestamp = refresh_token['exp']
        current_timestamp = datetime.utcnow().timestamp()
        if current_timestamp > expiration_timestamp:
            raise TokenError("Refresh Token has expired")

        return True
    except TokenError:
        return False
