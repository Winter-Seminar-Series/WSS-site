import datetime

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings

from common.testing import APITest, make_event, make_participant, make_seminar, make_speaker
from core.models import LabTalk, PosterSession, PosterSessionImage, RoundTable, SubEvent

IN_MEMORY_STORAGE = {
    'default': {'BACKEND': 'django.core.files.storage.InMemoryStorage'},
    'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
}


def sub_event(event, kind, **fields):
    return SubEvent.objects.create(
        event=event,
        kind=kind,
        name=fields.pop('name', 'Session'),
        date=fields.pop('date', datetime.date(2025, 4, 10)),
        starting_time=fields.pop('starting_time', datetime.time(9)),
        ending_time=fields.pop('ending_time', datetime.time(10)),
        **fields,
    )


class SessionListTests(APITest):
    def setUp(self):
        super().setUp()
        self.event = make_event()

    def test_seminars_are_public_in_schedule_order_with_their_speaker(self):
        late = make_seminar(self.event, starting_time=datetime.time(14), name='Late')
        early = make_seminar(self.event, starting_time=datetime.time(9), name='Early')
        make_seminar(make_event(order=9))  # another edition

        response = self.client.get(f'/api/seminar/{self.event.pk}/')

        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual([item['sub_event']['id'] for item in body], [early.sub_event_id, late.sub_event_id])
        self.assertEqual(body[0]['speaker']['name'], early.speaker.name)

    def test_sessions_expose_their_link(self):
        linked = make_seminar(self.event, link='https://www.skyroom.online/ch/wss/seminar', starting_time=datetime.time(9))
        make_seminar(self.event, starting_time=datetime.time(14))

        body = self.client.get(f'/api/seminar/{self.event.pk}/').json()

        self.assertEqual([item['sub_event']['link'] for item in body], [linked.sub_event.link, ''])

    def test_seminar_list_is_one_query_however_long(self):
        for _ in range(5):
            make_seminar(self.event)
        with self.assertNumQueries(1):
            self.client.get(f'/api/seminar/{self.event.pk}/')

    def test_round_tables_prefetch_their_speakers(self):
        for _ in range(3):
            table = RoundTable.objects.create(sub_event=sub_event(self.event, 'R'))
            table.speakers.set([make_speaker(), make_speaker()])
        with self.assertNumQueries(2):
            response = self.client.get(f'/api/round-table/{self.event.pk}/')
        self.assertEqual([len(item['speakers']) for item in response.json()], [2, 2, 2])

    def test_poster_session_route_lists_poster_sessions_not_lab_talks(self):
        LabTalk.objects.create(sub_event=sub_event(self.event, 'L', name='Lab'), speaker=make_speaker())
        PosterSession.objects.create(sub_event=sub_event(self.event, 'P', name='Poster'), speaker=make_speaker())

        response = self.client.get(f'/api/poster-session/{self.event.pk}/')

        self.assertEqual([item['sub_event']['name'] for item in response.json()], ['Poster'])

    def test_event_and_speaker_endpoints_are_public(self):
        speaker = make_speaker()
        self.assertEqual(self.client.get('/api/event/').status_code, 200)
        self.assertEqual(self.client.get(f'/api/speaker/{speaker.pk}/').json()['name'], speaker.name)


@override_settings(STORAGES=IN_MEMORY_STORAGE)
class PosterSubmissionTests(APITest):
    def setUp(self):
        super().setUp()
        self.participant = make_participant()

    def pdf(self, size: int = 100):
        return SimpleUploadedFile('poster.pdf', b'%PDF' + b'0' * size, content_type='application/pdf')

    def test_requires_sign_in(self):
        response = self.client.post('/api/poster-session/image/create/', {'image': self.pdf()}, format='multipart')
        self.assertEqual(response.status_code, 401)

    def test_nothing_submitted_is_a_404(self):
        self.authenticate(self.participant)
        self.assertEqual(self.client.get('/api/poster-session/image/').status_code, 404)

    def test_submit_then_replace(self):
        self.authenticate(self.participant)
        created = self.client.post('/api/poster-session/image/create/', {'image': self.pdf()}, format='multipart')
        self.assertEqual(created.status_code, 201)

        again = self.client.post('/api/poster-session/image/create/', {'image': self.pdf()}, format='multipart')
        self.assertEqual(again.status_code, 409)

        replaced = self.client.put('/api/poster-session/image/', {'image': self.pdf()}, format='multipart')
        self.assertEqual(replaced.status_code, 200)
        self.assertEqual(PosterSessionImage.objects.filter(user=self.participant.user).count(), 1)

    def test_rejects_other_file_types(self):
        self.authenticate(self.participant)
        image = SimpleUploadedFile('poster.exe', b'MZ', content_type='application/octet-stream')
        response = self.client.post('/api/poster-session/image/create/', {'image': image}, format='multipart')
        self.assertEqual(response.status_code, 400)
