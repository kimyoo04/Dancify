from django.http import JsonResponse
from django.utils import timezone

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import status

from accounts.models import User

REFRESH_TOKEN_EXP = 60 * 60 * 24 * 7
ACCESS_TOKEN_EXP = 60 * 60 * 24 * 1

"""
토큰을 생성할 때는 userId로 DB에 접근해서 정보들을 만든다
토큰을 decode 할때는 종합적인 user_info 가 나옴
"""


# JWT 토큰 decode
def decode_refresh_token(refresh_token):
    print('리프레쉬 토큰 디코드')
    refresh_token_obj = RefreshToken(token=refresh_token)
    payload = refresh_token_obj.payload

    user_info = {'userId': payload['userId'], 'nickname': payload['nickname'],
                 'isDancer': payload['isDancer'], 'profileImage': payload['profileImage'],
                 'description': payload['description']}

    print('리프레쉬 토큰 디코드: ', user_info['userId'])
    return user_info


def decode_access_token(access_token):
    print('엑세스 토큰 디코드')
    access_token_obj = AccessToken(token=access_token)
    payload = access_token_obj.payload

    user_info = {'userId': payload['userId'], 'nickname': payload['nickname'],
                 'isDancer': payload['isDancer'], 'profileImage': payload['profileImage'],
                 'description': payload['description']}

    print('엑세스 토큰 디코드: ', user_info['userId'])
    return user_info


def create_jwt_token(user_id, token_type, user_info):
    token = None
    try:
        user = User.objects.get(user_id=user_id)
        user_info['userId'] = user.user_id
        user_info['nickname'] = user.nickname
        user_info['isDancer'] = user.is_dancer
        user_info['profileImage'] = user.profile_image
        user_info['description'] = user.description

        if token_type == 'refresh':
            print('리프레쉬 토큰 발급')
            token = RefreshToken()

            # 사용자 ID를 페이로드에 추가
            for key, value in user_info.items():
                token[key] = value

            # 만료 시간 설정 (예: 30일)
            token.set_exp(lifetime=timezone.timedelta(days=7))

        elif token_type == 'access':
            print('엑세스 토큰 발급')
            token = AccessToken()

            for key, value in user_info.items():
                token[key] = value
            token.set_exp(lifetime=timezone.timedelta(days=1))

        return str(token)
    except TokenError:
        print('토큰 발급 실패')
        return '토큰을 생성하지 못하였습니다.'


# 빈 딕셔너리가 인자이면 데이터베이스로부터 토큰을 재발급한다.
def generate_token(user_id, user_info):
    new_refresh_token = create_jwt_token(user_id,
                                         'refresh', user_info)
    new_access_token = create_jwt_token(user_id,
                                        'access', user_info)
    return (new_refresh_token, new_access_token)


def validate_access_token(access_token):
    try:
        access_token_obj = AccessToken(token=access_token)
        access_token_obj.verify()
        print('엑세스 토큰 유효성검사: 정상')

        return True
    except TokenError:
        # 서명 검증에 실패하여 변조가 있음을 의미
        print('엑세스 토큰 유효성검사: 엑세스 토큰 변조 확인됨')

        return False


def validate_refresh_token(token):
    try:
        refresh_token = RefreshToken(token)
        refresh_token.verify()
        print('리프레쉬 토큰 유효성검사: 정상')

        return True
    except TokenError:
        print('리프레쉬 토큰 유효성검사: 리프레쉬 토큰 변조 확인됨')

        return False


def handle_invalid_token():
    print('invalid-token handler')
    response = JsonResponse({'user': False,
                            'message': '변조된 토큰입니다.'},
                            status=status.HTTP_401_UNAUTHORIZED)
    # 토큰 삭제
    response.set_cookie('Refresh-Token', '',
                        max_age=REFRESH_TOKEN_EXP, httponly=True)
    response.set_cookie('Access-Token', '',
                        max_age=ACCESS_TOKEN_EXP)

    return response


def get_user_info_from_token(request, token_type='access'):

    try:
        if token_type == 'access':
            access_token = request.COOKIES['Access-Token']
            user_info = decode_access_token(access_token)

        elif token_type == 'refresh':
            refresh_token = request.COOKIES['Refresh-Token']
            user_info = decode_refresh_token(refresh_token)

        else:
            raise ValueError('잘못된 토큰 타입')

        return user_info
    except TokenError:
        raise TokenError('토큰이 유효하지 않는다잉')


def set_cookies_to_response(response, refresh_token, access_token):
    response.set_cookie('Refresh-Token', refresh_token,
                        max_age=REFRESH_TOKEN_EXP, httponly=True)
    response.set_cookie('Access-Token', access_token,
                        max_age=ACCESS_TOKEN_EXP)

    return response


def is_logined(request):
    """
    사용자의 로그인 여부를 반환합니다.
    Args:
        request: 토큰이 포함된 요청

    Returns:
        boolean: 로그인 여부

    """
    refresh_token = None
    access_token = None
    try:
        refresh_token = request.COOKIES['Refresh-Token']
        access_token = request.COOKIES['Access-Token']

        if (not validate_refresh_token(refresh_token) or not
                validate_access_token(access_token)):
            return False

        print('리프레쉬, 엑세스 토큰 모두 정상입니다.')
        # 위의 시나리오에서 걸러지지 않은 요청은 로그인된 사용자
        return True

    except KeyError:
        return False
