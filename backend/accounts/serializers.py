from django.contrib.auth import authenticate
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    userId = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        userId = data.get('userId')
        password = data.get('password')

        # 사용자 인증
        user = authenticate(user_id=userId, password=password)
        if not user:
            raise serializers.ValidationError('아이디 또는 비밀번호가 틀렸습니다.')

        return data
