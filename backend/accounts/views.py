from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework import status
import json
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator


from accounts.models import User
from accounts.serializers import LoginSerializer


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


class SignIn(APIView):
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
        except:
            return JsonResponse({'message': '아이디 또는 비밀번호가 틀렸습니다.'},
                                status=status.HTTP_400_BAD_REQUEST)

        user_id_json = serializer.validated_data['userId'] # type: ignore
        password_json = serializer.validated_data['password'] # type: ignore

        # 로그인 처리 / 이미 is_valid 통해 유효성 검사를 했기 때문에 로그인 진행
        user = authenticate(user_id=user_id_json, password=password_json)
        login(request, user)

        return JsonResponse({'message': '로그인이 성공하였습니다.'},
                                status=status.HTTP_200_OK)

# @method_decorator(login_required, name='get')
class SignOut(APIView):
    def get(self, request):
        try:
            logout(request)
        except:
            return JsonResponse({'message': '잘못된 요청. 로그인을 먼저 하세요!'},
                        status=status.HTTP_401_UNAUTHORIZED)
        return JsonResponse({'message': '로그아웃이 성공하였습니다.'},
                        status=status.HTTP_200_OK)
