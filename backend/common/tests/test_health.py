from common.testing import APITest


class HealthTests(APITest):
    def test_reports_ok_without_authentication(self):
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})
