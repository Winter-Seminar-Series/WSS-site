from participant.serializers import encode_file_id
from common.testing import APITest, make_event, make_mode_plan, make_participant, make_workshop_plan, register
from participant.models import ParticipationAttachment


class ProfileTests(APITest):
    def setUp(self):
        super().setUp()
        self.participant = make_participant('ada@example.com')
        self.authenticate(self.participant)

    def test_returns_the_profile_with_the_account_email(self):
        body = self.client.get('/api/profile/').json()
        self.assertEqual(body['email'], 'ada@example.com')
        self.assertEqual(body['first_name'], 'Ada')

    def test_national_codes_are_checked_and_padded(self):
        self.assertEqual(self.client.patch('/api/profile/', {'national_code': '1234567890'}).status_code, 400)
        response = self.client.patch('/api/profile/', {'national_code': '13246542'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['national_code'], '0013246542')

    def test_a_participant_without_a_profile_gets_one(self):
        self.participant.info.delete()
        self.assertEqual(self.client.get('/api/profile/').status_code, 200)


class PlanListTests(APITest):
    def test_workshops_come_with_their_sessions_and_speakers_in_two_queries(self):
        event = make_event()
        for _ in range(3):
            make_workshop_plan(event, sessions=2)
        make_mode_plan(event)

        with self.assertNumQueries(2):
            response = self.client.get(f'/api/workshop/{event.pk}/')

        plans = response.json()
        self.assertEqual(len(plans), 3)
        session = plans[0]['workshop']['sessions'][0]
        self.assertIsInstance(session['speaker'], int)
        self.assertEqual(session['speaker_details']['id'], session['speaker'])

    def test_modes_report_whether_they_are_open(self):
        event = make_event()
        make_mode_plan(event, is_open=False)
        self.assertEqual([plan['is_open'] for plan in self.client.get(f'/api/mode/{event.pk}/').json()], [False])


class RegistrationListTests(APITest):
    def test_lists_only_the_participants_own_registrations(self):
        event = make_event()
        plan = make_mode_plan(event)
        mine, theirs = make_participant(), make_participant()
        register(mine, plan)
        register(theirs, make_workshop_plan(event))

        self.authenticate(mine)
        response = self.client.get(f'/api/participation/{event.pk}/')

        self.assertEqual(response.json(), [{'plan': plan.pk, 'license_key': None}])


class CertificateFileTests(APITest):
    def test_resolves_existing_certificates_only(self):
        participant = make_participant()
        participation = register(participant, make_mode_plan(make_event()))
        ParticipationAttachment.objects.create(participation=participation, attachment='participation/abc.pdf')

        found = self.client.get(f'/api/file/{encode_file_id("participation/abc.pdf")}/')
        self.assertEqual(found.status_code, 200)
        self.assertIn('participation/abc.pdf', found.json()['attachment'])

        self.assertEqual(self.client.get(f'/api/file/{encode_file_id("other/secret.pdf")}/').status_code, 404)
        self.assertEqual(self.client.get('/api/file/not-base64!/').status_code, 404)
