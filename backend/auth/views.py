from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
import json


def check_duplicate_username(username):
    """
    아이디 중복 확인 함수
    """
    try:
        User.objects.get(username=username)
        return True
    except User.DoesNotExist:
        return False


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)

        username = json_data['username']
        password = json_data['password']
        password_check = json_data['password_check']

        if check_duplicate_username(username):
            return JsonResponse({"message":"이미 존재하는 아이디입니다."},
                                status=status.HTTP_409_CONFLICT)

        if password == password_check:
            user = User.objects.create_user(
                username=username,
                password=password,
            )
            user.save()

            return JsonResponse({'message':'회원가입에 성공하였습니다.'},
                                status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'message':'비밀번호가 일치하지 않습니다.'},
                                status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)

        username = json_data['username']
        password = json_data['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            return JsonResponse({'message':'로그인이 성공하였습니다.'},
                                status=status.HTTP_200_OK)
        else:
            return JsonResponse({'message':'아이디 또는 비밀번호가 틀렸습니다.'},
                                status=status.HTTP_400_BAD_REQUEST)


@login_required
def signout(request):
    logout(request)
    return JsonResponse({'message':'로그아웃이 성공하였습니다.'},
                        status=status.HTTP_200_OK)
