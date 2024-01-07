import re
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers

from participant.models import Participant, ParticipantInfo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password')

    def validate_password(self, value: str) -> str:
        return make_password(value)


class ParticipantInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParticipantInfo
        fields = ('first_name_persian', 'last_name_persian', 'national_code', 'phone_number', 'image', 'bio', 'designation')

    def validate_national_code(self, value: str) -> str:
        if value == '':
            return value
        if re.match(r'^\d{8}|\d{9}|\d{10}$', value):
            if len(value) < 10:
                value = '0' * (10 - len(value)) + value
            temp = 0
            for i in range(9):
                temp += int(value[i]) * (10 - i)
            rem = temp % 11
            if (rem < 2 and int(value[9]) == rem) or (rem >= 2 and int(value[9]) == (11 - rem)):
                return value
            raise serializers.ValidationError("National Code is not valid.")
        raise serializers.ValidationError("National Code is not valid.")

    def _validate(self, data):
        first_name_persian = data.get('first_name_persian', '')
        last_name_persian = data.get('last_name_persian', '')
        phone_number = data.get('phone_number', '')
        assert first_name_persian, 'First name is required.'
        assert last_name_persian, 'Last name is required.'

        assert phone_number, 'Phone number is required.'
        assert phone_number.isdigit(), 'Phone number must be digits.'
        assert len(phone_number) == 11, 'Phone number must be 11 digits.'
        assert re.match(r'^09\d{9}$', phone_number), 'Invalid phone number.'

    def validate(self, data):
        try:
            self._validate(data)
        except Exception as e:
            raise serializers.ValidationError(str(e))
        return data

class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Participant
        fields = ('user', )

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        if User.objects.filter(email=user_data['email']).exists():
            raise serializers.ValidationError('User with this email already exists.')
        user_data['username'] = user_data['email'].replace('@', '_').replace('.', '_')
        user = User.objects.create(**user_data)
        participant = Participant.objects.create(user=user, **validated_data)
        participant.info = ParticipantInfo.objects.create()
        participant.save()
        return participant
