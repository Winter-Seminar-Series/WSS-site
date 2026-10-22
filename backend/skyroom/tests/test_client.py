from unittest import mock

import requests
from django.test import SimpleTestCase

from common.exceptions import UpstreamError
from skyroom.client import SkyroomClient

KEY = 'secret-skyroom-key'


class SkyroomClientLoggingTests(SimpleTestCase):
    def test_the_api_key_never_reaches_the_logs(self):
        failure = requests.ConnectionError(f'Max retries exceeded with url: /skyroom/api/{KEY}')
        with mock.patch('skyroom.client.requests.post', side_effect=failure), self.assertLogs('skyroom.client') as logs:
            with self.assertRaises(UpstreamError):
                SkyroomClient(api_key=KEY).login_url(1, user_id=1, nickname='Ada')
        self.assertNotIn(KEY, '\n'.join(logs.output))
