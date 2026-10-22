import re

from rest_framework import serializers

PHONE_PATTERN = re.compile(r'^(\+\d{1,3}|0)\d{10}$')


def normalize_national_code(value: str) -> str:
    """Iranian national code: 8–10 digits (left-padded to 10) with a mod-11 check digit. Blank is allowed."""
    if value == '':
        return value
    if not re.fullmatch(r'\d{8,10}', value):
        raise serializers.ValidationError('National code is not valid.', code='invalid_national_code')
    value = value.zfill(10)
    remainder = sum(int(digit) * (10 - index) for index, digit in enumerate(value[:9])) % 11
    check = int(value[9])
    if (remainder < 2 and check == remainder) or (remainder >= 2 and check == 11 - remainder):
        return value
    raise serializers.ValidationError('National code is not valid.', code='invalid_national_code')


def validate_phone_number(value: str) -> str:
    if not PHONE_PATTERN.fullmatch(value):
        raise serializers.ValidationError('Phone number is not valid.', code='invalid_phone_number')
    return value
