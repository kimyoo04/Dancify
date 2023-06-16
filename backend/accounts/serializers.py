from django.contrib.auth.hashers import check_password
from rest_framework import serializers

from accounts.models import User

"""
rest_framework.exceptions의 ValidationError는 예외가 발생하면 해당 예외 객체의 메시지를 포함한 HTTP 400 Bad Request
응답이 자동으로 생성되어 반환됨
 """


class LoginSerializer(serializers.Serializer):
    userId = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        userId = data.get('userId')
        password = data.get('password')

        # 사용자 인증
        try:
            user = User.objects.get(user_id=userId)
            is_matched = check_password(password, user.password)
            if not is_matched:
                raise ValueError
        except (User.DoesNotExist, ValueError):
            raise serializers.ValidationError

        return data


class RegisterSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        self.wrong_fields = []
        super().__init__(*args, **kwargs)

    # write_only: 역직렬화만 가능
    password = serializers.CharField(max_length=128, write_only=True)

    # json 데이터와 User모델의 필드명이 다르므로 mapping진행
    userId = serializers.CharField(source='user_id')
    isDancer = serializers.BooleanField(source='is_dancer')

    class Meta():
        model = User
        fields = ['userId', 'password', 'email', 'nickname', 'phone', 'isDancer']
        """
        validate를 오버라이딩 하지 않아도 field의 특성에 맞게 유효성 검사가 진행됨
        validate_<field_name>은 모델의 필드 정의에 따라 유효하지 않은 필드에 대해 자동으로 호출되지만,
        앞에 필드에 대해 호출되면 뒤의 필드에 대해 validate_<field_name>호출을 하지 않고
        끝내기 때문에 validate를 구현했다.
        """

    def validate(self, data):
        unique_fields = []
        model_fields = self.Meta.model._meta.fields

        # 고유성이 제약조건인 필드 추출
        for field in model_fields:
            if field.unique:
                unique_fields.append(field.name)

        unique_fields.remove('user_pk')

        # 중복 검사대상인 고유성을 가진 필드
        # if field_name == 'user_id' 조건문은 json의 key값과 모델의 필드명이 다르기 때문이다
        for field_name in unique_fields:
            if field_name == 'user_id':
                value = data.get('userId')
            else:
                value = data.get(field_name)

            # 이미 존재하면
            if self.Meta.model.objects.filter(**{field_name: value}).exists():
                if field_name == 'user_id':
                    self.wrong_fields.append('userId')
                else:
                    self.wrong_fields.append(field_name)

        # 비밀번호 확인
        if len(self.wrong_fields) != 0:
            password = data['password']
            password_check = data['passwordCheck']

            if password != password_check:
                self.wrong_fields.append('password')

            msg_dict = {}

            for wrong_field in self.wrong_fields:
                msg_dict[wrong_field] = f'잘못된 값이거나 이미 존재하는 {wrong_field}입니다.'

            raise serializers.ValidationError(msg_dict)

        return data

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class ProfileSerializer(serializers.ModelSerializer):

    profileImage = serializers.URLField(source='profile_image')

    class Meta:
        model = User
        fields = ['description', 'profileImage', 'nickname', 'email']


class UserSerializer(serializers.ModelSerializer):

    userId = serializers.CharField(source='user_id')
    isDancer = serializers.BooleanField(source='is_dancer')
    profileImage = serializers.URLField(source='profile_image')

    class Meta:
        model = User
        fields = ['userId', 'email', 'nickname', 'isDancer',
                  'description', 'profileImage', 'phone']
