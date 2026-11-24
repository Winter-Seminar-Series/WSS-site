import datetime

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.utils import timezone

from common.testing import APITest, make_event, make_participant, throttle_rates
from core.models import Event
from participant.models import CV
from participant.serializers import CVSerializer

IN_MEMORY_STORAGE = {
    'default': {'BACKEND': 'django.core.files.storage.InMemoryStorage'},
    'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
}


def open_event(order: int = 11) -> Event:
    """An edition that has not ended yet, so it still accepts CVs."""
    today = timezone.localdate()
    return Event.objects.create(
        name='WSS',
        order=order,
        starting_date=today + datetime.timedelta(days=20),
        ending_date=today + datetime.timedelta(days=21),
    )


def pdf(name: str = 'Ada Lovelace CV.pdf', size: int = 100) -> SimpleUploadedFile:
    return SimpleUploadedFile(name, b'%PDF-1.7\n' + b'0' * size, content_type='application/pdf')


@override_settings(STORAGES=IN_MEMORY_STORAGE)
class CVTests(APITest):
    def setUp(self):
        super().setUp()
        self.participant = make_participant()
        self.user = self.participant.user
        self.event = open_event()

    def url(self, event: Event | None = None) -> str:
        return f'/api/cv/{(event or self.event).pk}/'

    def upload(self, file=None, event: Event | None = None):
        return self.client.put(self.url(event), {'file': file or pdf()}, format='multipart')

    def test_requires_sign_in(self):
        self.assertEqual(self.client.get(self.url()).status_code, 401)
        self.assertEqual(self.upload().status_code, 401)

    def test_nothing_uploaded_is_a_404(self):
        self.authenticate(self.participant)
        response = self.client.get(self.url())
        self.assertEqual(response.status_code, 404)
        self.assertEqual(self.error_codes(response), ['cv_not_found'])

    def test_unknown_edition_is_a_404(self):
        self.authenticate(self.participant)
        self.assertEqual(self.client.get('/api/cv/999999/').status_code, 404)
        self.assertEqual(self.upload(event=Event(pk=999999)).status_code, 404)

    def test_upload_then_read(self):
        self.authenticate(self.participant)
        created = self.upload()
        self.assertEqual(created.status_code, 201)
        body = self.client.get(self.url()).json()
        self.assertEqual(body['file_name'], 'Ada Lovelace CV.pdf')
        self.assertEqual(body['size'], created.json()['size'])
        self.assertTrue(body['file'])
        stored = CV.objects.get(user=self.user, event=self.event)
        # Stored under a random private name, never the uploaded one.
        self.assertTrue(stored.file.name.startswith('cv/'))
        self.assertNotIn('Lovelace', stored.file.name)

    def test_replacing_keeps_one_row_and_deletes_the_old_file(self):
        self.authenticate(self.participant)
        self.upload()
        old = CV.objects.get(user=self.user, event=self.event).file.name

        with self.captureOnCommitCallbacks(execute=True):
            replaced = self.upload(pdf('new.pdf'))

        self.assertEqual(replaced.status_code, 200)
        self.assertEqual(replaced.json()['file_name'], 'new.pdf')
        cv = CV.objects.get(user=self.user, event=self.event)
        self.assertNotEqual(cv.file.name, old)
        self.assertFalse(cv.file.storage.exists(old))
        self.assertTrue(cv.file.storage.exists(cv.file.name))

    def test_each_edition_has_its_own_cv(self):
        self.authenticate(self.participant)
        self.upload(pdf('for 11th.pdf'))
        next_edition = open_event(order=12)

        self.assertEqual(self.client.get(self.url(next_edition)).status_code, 404)
        self.assertEqual(self.upload(pdf('for 12th.pdf'), event=next_edition).status_code, 201)
        self.assertEqual(self.client.get(self.url()).json()['file_name'], 'for 11th.pdf')
        self.assertEqual(self.client.get(self.url(next_edition)).json()['file_name'], 'for 12th.pdf')

        with self.captureOnCommitCallbacks(execute=True):
            self.assertEqual(self.client.delete(self.url(next_edition)).status_code, 204)
        self.assertEqual(self.client.get(self.url()).status_code, 200)

    def test_an_ended_edition_takes_no_new_cvs_but_allows_withdrawal(self):
        ended = make_event(order=10)
        CV.objects.create(user=self.user, event=ended, file=pdf(), file_name='old.pdf', size=10)
        self.authenticate(self.participant)

        response = self.upload(event=ended)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(self.error_codes(response), ['cv_submission_closed'])
        self.assertEqual(self.client.get(self.url(ended)).json()['file_name'], 'old.pdf')
        self.assertEqual(self.client.delete(self.url(ended)).status_code, 204)

    def test_delete_removes_the_row_and_the_file(self):
        self.authenticate(self.participant)
        self.upload()
        name = CV.objects.get(user=self.user).file.name

        with self.captureOnCommitCallbacks(execute=True):
            self.assertEqual(self.client.delete(self.url()).status_code, 204)

        self.assertFalse(CV.objects.filter(user=self.user).exists())
        self.assertFalse(CV._meta.get_field('file').storage.exists(name))
        self.assertEqual(self.client.delete(self.url()).status_code, 404)

    def test_cannot_see_or_touch_another_users_cv(self):
        self.authenticate(self.participant)
        self.upload()
        self.authenticate(make_participant())

        self.assertEqual(self.client.get(self.url()).status_code, 404)
        self.assertEqual(self.client.delete(self.url()).status_code, 404)
        self.assertTrue(CV.objects.filter(user=self.user).exists())

    def test_rejects_files_that_are_not_pdfs(self):
        self.authenticate(self.participant)
        cases = {
            'not a pdf name': SimpleUploadedFile('cv.docx', b'%PDF-1.7 0', content_type='application/pdf'),
            'pdf name, other content': SimpleUploadedFile('cv.pdf', b'MZ\x90\x00', content_type='application/pdf'),
        }
        for label, file in cases.items():
            with self.subTest(label):
                self.assertEqual(self.upload(file).status_code, 400)
        self.assertFalse(CV.objects.exists())

    def test_rejects_files_over_the_limit(self):
        self.authenticate(self.participant)
        response = self.upload(pdf(size=CVSerializer.MAX_SIZE))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(self.error_codes(response), ['file_too_large'])

    def test_uploads_are_rate_limited_but_reads_are_not(self):
        self.authenticate(self.participant)
        with throttle_rates(cv_upload='1/hour'):
            self.assertEqual(self.upload().status_code, 201)
            self.assertEqual(self.upload().status_code, 429)
            self.assertEqual(self.client.get(self.url()).status_code, 200)
