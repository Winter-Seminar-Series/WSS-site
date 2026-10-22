import datetime
from unittest import mock

from django.utils import timezone

from common.testing import APITest, make_event, make_mode_plan, make_participant, register
from skyroom.models import SkyroomEvent, SkyroomRoom


class StreamTests(APITest):
    def setUp(self):
        super().setUp()
        self.plan = make_mode_plan(make_event())
        room = SkyroomRoom.objects.create(room_id=42, name='hall', title='Main hall')
        self.live = self.stream(room, starts_in=datetime.timedelta(minutes=-5))
        self.later = self.stream(room, starts_in=datetime.timedelta(days=2))
        self.participant = make_participant()
        self.authenticate(self.participant)

    def stream(self, room, starts_in):
        event = SkyroomEvent.objects.create(
            room=room,
            title='Talk',
            starting_time=timezone.now() + starts_in,
            duration=datetime.timedelta(hours=1),
            tolerance=datetime.timedelta(minutes=10),
        )
        event.plans.set([self.plan])
        return event

    def test_lists_open_sessions_of_paid_plans_only(self):
        self.assertEqual(self.client.get('/api/skyroom/list/').json(), [])
        register(self.participant, self.plan)
        self.assertEqual([item['id'] for item in self.client.get('/api/skyroom/list/').json()], [self.live.pk])

    def test_links_need_a_paid_plan_and_an_open_session(self):
        self.assertEqual(self.client.get(f'/api/skyroom/link/{self.live.pk}/').status_code, 404)
        register(self.participant, self.plan)
        self.assertEqual(self.client.get(f'/api/skyroom/link/{self.later.pk}/').status_code, 404)

        with mock.patch('skyroom.views.SkyroomClient') as client:
            client.return_value.login_url.return_value = 'https://skyroom/login'
            response = self.client.get(f'/api/skyroom/link/{self.live.pk}/')

        self.assertEqual(response.json(), {'id': self.live.pk, 'link': 'https://skyroom/login'})
        self.assertEqual(client.return_value.login_url.call_args.kwargs['nickname'], 'Ada Lovelace')
