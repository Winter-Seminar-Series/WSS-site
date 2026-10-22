"""Skyroom (live-stream rooms): personal login links for participants."""

import logging

import requests
from django.conf import settings

from common.exceptions import UpstreamError

logger = logging.getLogger(__name__)

API_BASE = 'https://www.skyroom.online/skyroom/api'

ACCESS_USER = 1
ACCESS_ADMIN = 3
LINK_TTL_SECONDS = 3 * 60 * 60


class SkyroomClient:
    def __init__(self, api_key: str | None = None, timeout: float | None = None):
        self.api_key = api_key if api_key is not None else settings.SKYROOM_API_KEY
        self.timeout = timeout or settings.INTEGRATION_TIMEOUT

    def login_url(
        self,
        room_id: int,
        *,
        user_id: int,
        nickname: str,
        access: int = ACCESS_USER,
        concurrent: int = 1,
        ttl: int = LINK_TTL_SECONDS,
    ) -> str:
        payload = {
            'action': 'createLoginUrl',
            'params': {
                'room_id': room_id,
                'user_id': user_id,
                'nickname': nickname,
                'access': access,
                'concurrent': concurrent,
                'language': 'fa',
                'ttl': ttl,
            },
        }
        # Skyroom takes the API key in the URL path, and `requests` errors quote the URL: never log them as is.
        try:
            response = requests.post(f'{API_BASE}/{self.api_key}', json=payload, timeout=self.timeout)
            data = response.json()
        except (requests.RequestException, ValueError) as error:
            logger.error('Skyroom unreachable: %s', type(error).__name__)
            raise UpstreamError() from None
        if not data.get('ok'):
            message = str(data.get('error_message', ''))
            if self.api_key:
                message = message.replace(self.api_key, '***')
            logger.error('Skyroom refused a login link for room %s: %s', room_id, message)
            raise UpstreamError()
        return data['result']
