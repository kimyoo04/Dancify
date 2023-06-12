from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse

from rest_framework import status

from accounts.authentication import handle_invalid_token
from accounts.authentication import decode_refresh_token, decode_access_token
from accounts.authentication import generate_token
from accounts.authentication import check_access_token_exp,\
    validate_access_token, validate_refresh_token

class TokenMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        urls = ['/api/auth/user']
        if request.path in urls:
            print('미들웨어 실행')
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
                                    max_age=60*60*24*30, httponly=True)
                response.set_cookie('Access-Token', new_access_token, max_age=60*15)

            except KeyError:
                if refresh_token == None:
                    print('리프레쉬 토큰x')
                    response_data = {'user': False,
                                    'message': 'Refresh-Token이 존재하지 않습니다!'}
                    response = JsonResponse(response_data,
                                            status=status.HTTP_401_UNAUTHORIZED)

                # 쿠키가 만료되어 access_token이 지워졌으므로 재발급 진행
                elif access_token == None:
                    print('엑세스 토큰x 재발급 진행')
                    user_info = decode_refresh_token(refresh_token)
                    print(user_info)

                    new_refresh_token, new_access_token = generate_token(user_info)

                    response_data = {'user': True,
                                    'message': 'Access-Token이 존재하지 않습니다!'}
                    response = JsonResponse(response_data)

                    response.set_cookie('Refresh-Token', new_refresh_token,
                                        max_age=60*60*24*30, httponly=True)
                    response.set_cookie('Access-Token', new_access_token, max_age=60*15)

            return response
