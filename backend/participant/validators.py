import re

from rest_framework import serializers

DIGITS = str.maketrans('۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩', '01234567890123456789')
PHONE_PATTERN = re.compile(r'^(\+[0-9]{1,3}|0)[0-9]{10}$')


def normalize_national_code(value: str) -> str:
    """Iranian national code: 8–10 digits (left-padded to 10) with a mod-11 check digit. Blank is allowed."""
    value = value.translate(DIGITS).strip()
    if value == '':
        return value
    if not re.fullmatch(r'[0-9]{8,10}', value):
        raise serializers.ValidationError('National code is not valid.', code='invalid_national_code')
    value = value.zfill(10)
    if len(set(value)) == 1:
        raise serializers.ValidationError('National code is not valid.', code='invalid_national_code')
    remainder = sum(int(digit) * (10 - index) for index, digit in enumerate(value[:9])) % 11
    check = int(value[9])
    if (remainder < 2 and check == remainder) or (remainder >= 2 and check == 11 - remainder):
        return value
    raise serializers.ValidationError('National code is not valid.', code='invalid_national_code')


def validate_phone_number(value: str) -> str:
    value = value.translate(DIGITS).strip()
    if not PHONE_PATTERN.fullmatch(value):
        raise serializers.ValidationError('Phone number is not valid.', code='invalid_phone_number')
    return value
