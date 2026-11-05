import datetime
import io
import json
import tempfile
from pathlib import Path

from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import CommandError, call_command
from django.test import override_settings

from common.testing import APITest, make_event, make_participant, make_seminar, make_speaker
from core.models import CareerStep, LabTalk, Organization, PosterSession, PosterSessionImage, RoundTable, SubEvent

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


def with_career(speaker, steps: int = 2):
    for _ in range(steps):
        organization = Organization.objects.create(name=f'{speaker.name} organization {CareerStep.objects.count()}')
        CareerStep.objects.create(speaker=speaker, organization=organization)
    return speaker


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

    def test_speaker_profile_links_are_optional_and_public(self):
        speaker = make_speaker()
        speaker.linkedin = 'https://www.linkedin.com/in/ada'
        speaker.google_scholar = 'https://scholar.google.com/citations?user=abc'
        speaker.save()
        make_seminar(self.event, speaker=speaker, starting_time=datetime.time(9))
        make_seminar(self.event, starting_time=datetime.time(14))

        body = self.client.get(f'/api/seminar/{self.event.pk}/').json()

        self.assertEqual(body[0]['speaker']['linkedin'], 'https://www.linkedin.com/in/ada')
        self.assertEqual(body[0]['speaker']['google_scholar'], 'https://scholar.google.com/citations?user=abc')
        self.assertEqual((body[1]['speaker']['linkedin'], body[1]['speaker']['google_scholar']), ('', ''))

    def test_seminar_list_is_two_queries_however_long(self):
        for _ in range(5):
            make_seminar(self.event, speaker=with_career(make_speaker()))
        with self.assertNumQueries(2):
            self.client.get(f'/api/seminar/{self.event.pk}/')

    def test_round_tables_prefetch_their_speakers(self):
        for _ in range(3):
            table = RoundTable.objects.create(sub_event=sub_event(self.event, 'R'))
            table.speakers.set([with_career(make_speaker()), make_speaker()])
        with self.assertNumQueries(3):
            response = self.client.get(f'/api/round-table/{self.event.pk}/')
        self.assertEqual([len(item['speakers']) for item in response.json()], [2, 2, 2])

    def test_poster_session_route_lists_poster_sessions_not_lab_talks(self):
        LabTalk.objects.create(sub_event=sub_event(self.event, 'L', name='Lab'), speaker=make_speaker())
        PosterSession.objects.create(sub_event=sub_event(self.event, 'P', name='Poster'), speaker=make_speaker())

        response = self.client.get(f'/api/poster-session/{self.event.pk}/')

        self.assertEqual([item['sub_event']['name'] for item in response.json()], ['Poster'])

    def test_speakers_carry_their_career_in_order(self):
        speaker = make_speaker()
        later = Organization.objects.create(name='Later Lab', website='https://later.example')
        earlier = Organization.objects.create(name='Earlier University')
        CareerStep.objects.create(speaker=speaker, organization=later, order=2)
        CareerStep.objects.create(speaker=speaker, organization=earlier, order=1)
        speaker.current_organization = later
        speaker.save()
        make_seminar(self.event, speaker=speaker, starting_time=datetime.time(9))
        make_seminar(self.event, starting_time=datetime.time(14))

        body = self.client.get(f'/api/seminar/{self.event.pk}/').json()

        self.assertEqual(
            body[0]['speaker']['career'],
            [
                {'name': 'Earlier University', 'logo': None, 'website': ''},
                {'name': 'Later Lab', 'logo': None, 'website': 'https://later.example'},
            ],
        )
        self.assertEqual(body[0]['speaker']['current_organization']['name'], 'Later Lab')
        self.assertEqual(body[1]['speaker']['career'], [])
        self.assertIsNone(body[1]['speaker']['current_organization'])
        career = self.client.get(f'/api/speaker/{speaker.pk}/').json()['career']
        self.assertEqual(career[0]['name'], 'Earlier University')

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


class LoadCareersTests(APITest):
    def write_fixture(self, folder, speakers):
        data = {'organizations': {'lab': {'name': 'Lab'}, 'uni': {'name': 'Uni'}}, 'speakers': speakers}
        path = folder / 'careers.json'
        path.write_text(json.dumps(data))
        return str(path)

    def test_loads_careers_and_current_organization_for_every_row_of_a_speaker(self):
        rows = [make_speaker('Ada'), make_speaker('Ada')]
        with tempfile.TemporaryDirectory() as folder:
            path = self.write_fixture(Path(folder), [{'name': 'Ada', 'current': 'lab', 'career': ['uni', 'lab']}])
            call_command('load_careers', path, stdout=io.StringIO())
            call_command('load_careers', path, stdout=io.StringIO())  # idempotent

        self.assertEqual(Organization.objects.count(), 2)
        for speaker in rows:
            speaker.refresh_from_db()
            self.assertEqual(speaker.current_organization.name, 'Lab')
            self.assertEqual([step.organization.name for step in speaker.career.all()], ['Uni', 'Lab'])

    def test_keeps_a_career_set_by_hand_unless_replacing(self):
        speaker = make_speaker('Ada')
        CareerStep.objects.create(speaker=speaker, organization=Organization.objects.create(name='Mine'))
        with tempfile.TemporaryDirectory() as folder:
            path = self.write_fixture(Path(folder), [{'name': 'Ada', 'current': None, 'career': ['uni']}])
            call_command('load_careers', path, stdout=io.StringIO())
            self.assertEqual([step.organization.name for step in speaker.career.all()], ['Mine'])
            call_command('load_careers', path, '--replace', stdout=io.StringIO())
        self.assertEqual([step.organization.name for step in speaker.career.all()], ['Uni'])

    def test_unknown_speakers_stop_the_load(self):
        with tempfile.TemporaryDirectory() as folder:
            path = self.write_fixture(Path(folder), [{'name': 'Nobody', 'current': None, 'career': []}])
            with self.assertRaisesMessage(CommandError, 'Nobody'):
                call_command('load_careers', path, stdout=io.StringIO())

    def test_a_repeated_organization_stops_the_load_before_any_write(self):
        make_speaker('Ada')
        with tempfile.TemporaryDirectory() as folder:
            path = self.write_fixture(Path(folder), [{'name': 'Ada', 'current': 'lab', 'career': ['lab', 'lab']}])
            with self.assertRaisesMessage(CommandError, 'Ada'):
                call_command('load_careers', path, stdout=io.StringIO())
        self.assertFalse(Organization.objects.exists())

    def test_a_dry_run_writes_nothing(self):
        make_speaker('Ada')
        with tempfile.TemporaryDirectory() as folder:
            path = self.write_fixture(Path(folder), [{'name': 'Ada', 'current': 'lab', 'career': ['uni']}])
            call_command('load_careers', path, '--dry-run', stdout=io.StringIO())
        self.assertFalse(Organization.objects.exists())
        self.assertFalse(CareerStep.objects.exists())
