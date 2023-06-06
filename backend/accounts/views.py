from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
import json

from accounts.models import User


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
def signup(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)

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


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)

        user_id_json = json_data['userId']
        password_json = json_data['password']

        user = authenticate(request, user_id=user_id_json,
                            password=password_json)

        if user is not None:
            login(request, user)

            return JsonResponse({'message': '로그인이 성공하였습니다.'},
                                status=status.HTTP_200_OK)
        else:
            return JsonResponse({'message': '아이디 또는 비밀번호가 틀렸습니다.'},
                                status=status.HTTP_400_BAD_REQUEST)


@login_required
def signout(request):
    logout(request)
    return JsonResponse({'message': '로그아웃이 성공하였습니다.'},
                        status=status.HTTP_200_OK)
