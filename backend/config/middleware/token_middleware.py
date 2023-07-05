from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse

from rest_framework import status

from accounts.authentication import handle_invalid_token
from accounts.authentication import decode_refresh_token
from accounts.authentication import generate_token, set_cookies_to_response
from accounts.authentication import validate_access_token, validate_refresh_token


class TokenValidateMiddleware(MiddlewareMixin):
    urls = ['/api/auth/test', '/api/auth/profile', '/api/auth/profile/image']

    # 뷰가 실행되기 전에 미들웨어 실행됨
    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.path in TokenValidateMiddleware.urls:
            print('|토큰 유효성 검사 미들웨어 실행|')
            refresh_token = None
            access_token = None
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

                print('리프레쉬, 엑세스 토큰 모두 정상입니다.')
                # 위의 시나리오에서 걸러지지 않은 요청은 정상요청이므로 뷰로 흐름을 넘긴다.
                return None

            except KeyError:
                # refresh 토큰이 변조되고 access 토큰이 없는 경우 이 분기에 오게됨
                if not validate_refresh_token(refresh_token):
                    response = handle_invalid_token()
                    return response

                elif refresh_token is None:
                    return JsonResponse({'messsage':
                                         '리프레쉬 토큰이 존재하지 않아 요청이 거절되었습니다.'})

                # 쿠키가 만료되어 access_token이 지워졌으므로 재발급 진행
                elif access_token is None:
                    print('엑세스 토큰이 만료된 상태입니다.')
                    return None


class TokenRefreshMiddleware(MiddlewareMixin):
    urls = ['/api/auth/test', '/api/auth/profile', '/api/auth/profile/image']

    # 뷰에서 응답하기 전에 미들웨어가 실행됨
    def process_response(self, request, response):
        # TokenValidateMiddleware에서 요청이 거부된 경우 토큰 재발급을 진행하지 않는다.
        if response.status_code == status.HTTP_401_UNAUTHORIZED:
            return response

        if request.path in TokenRefreshMiddleware.urls:
            print('|토큰 재발급 미들웨어 실행|')
            try:
                refresh_token = request.COOKIES['Refresh-Token']

                user_info = decode_refresh_token(refresh_token)

                new_refresh_token, new_access_token = \
                    generate_token(user_info['userId'], user_info)

                response = set_cookies_to_response(response, new_refresh_token, new_access_token)

            except KeyError:
                # 쿠키와 토큰의 만료시간이 같으므로
                print('뷰 로직 처리 중에 리프레쉬 토큰 만료됨!')
                JsonResponse({'message': '리프레쉬 토큰이 존재하지 않아 토큰 발급이 불가합니다.'})

            return response

        else:
            return response
