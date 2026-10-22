"""SpotPlayer licences for recorded workshops (https://panel.spotplayer.ir)."""

import logging

import requests
from django.conf import settings
from django.db import transaction

from common.exceptions import UpstreamError
from spotplayer.models import SpotPlayerCourse, SpotPlayerCourseLicense, SpotPlayerLicense

logger = logging.getLogger(__name__)

LICENSE_ENDPOINT = 'https://panel.spotplayer.ir/license/edit/'

# Concurrent devices allowed per licence: any device type up to 3, at most one of each platform.
DEVICE_LIMITS = {'p0': 3, 'p1': 1, 'p2': 1, 'p4': 1}


class SpotPlayerClient:
    def __init__(self, api_key: str | None = None, timeout: float | None = None):
        self.api_key = api_key if api_key is not None else settings.SPOTPLAYER_API_KEY
        self.timeout = timeout or settings.INTEGRATION_TIMEOUT

    def create_license(self, courses: list[SpotPlayerCourse], *, name: str, watermark: str) -> SpotPlayerLicense:
        """One licence covering every course, watermarked with the buyer's phone or email."""
        payload = {
            'course': sorted({course.course_id for course in courses}),
            'name': name,
            'watermark': {'texts': [{'text': watermark}]},
            'device': DEVICE_LIMITS,
        }
        headers = {'$API': self.api_key, '$LEVEL': '-1'}
        try:
            response = requests.post(LICENSE_ENDPOINT, json=payload, headers=headers, timeout=self.timeout)
            data = response.json()
        except (requests.RequestException, ValueError):
            logger.exception('SpotPlayer unreachable')
            raise UpstreamError()
        if not response.ok:
            logger.error('SpotPlayer refused a licence: %s', data.get('ex', {}).get('msg', response.status_code))
            raise UpstreamError()

        with transaction.atomic():
            license = SpotPlayerLicense.objects.create(
                license_id=data['_id'], license_key=data['key'], license_url=data['url']
            )
            SpotPlayerCourseLicense.objects.bulk_create(
                SpotPlayerCourseLicense(course=course, license=license) for course in courses
            )
        return license
