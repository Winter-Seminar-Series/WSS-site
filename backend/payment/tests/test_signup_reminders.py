import datetime
from unittest import mock

from django.contrib.auth import get_user_model
from django.core import mail
from django.test import TestCase, override_settings
from django.utils import timezone

from common.testing import make_event, make_mode_plan, make_participant, make_workshop_plan, register
from participant.models import Participant
from payment.models import GroupPaymentRequest, PaymentReminder, PaymentRequest, PaymentStatus
from payment.reminders import deliver_reminders, prepare_reminders, prepare_signup_reminders

User = get_user_model()


def make_payment(participant, plans, status=PaymentStatus.FAILED):
    payment = PaymentRequest.objects.create(participant=participant)
    payment.set_status(status)
    payment.plans.set(plans)
    PaymentRequest.objects.filter(pk=payment.pk).update(timestamp=timezone.now() - datetime.timedelta(hours=1))
    return payment


def joined_days_ago(participant, days):
    User.objects.filter(pk=participant.user_id).update(date_joined=timezone.now() - datetime.timedelta(days=days))


@override_settings(
    PAYMENT_REMINDER_MAX=2,
    PAYMENT_REMINDER_INTERVAL_HOURS=48,
    SIGNUP_REMINDER_DAYS=30,
    FRONTEND_ORIGIN='https://wss.test',
)
class SignupRemindersTests(TestCase):
    def setUp(self):
        self.old_event = make_event(order=10)
        self.event = make_event(order=11)
        self.in_person = make_mode_plan(self.event, name='In-person')
        self.online = make_mode_plan(self.event, name='Online')
        self.workshop = make_workshop_plan(self.event)
        self.participant = make_participant('ada@example.com')
        joined_days_ago(self.participant, 2)

    def send(self):
        batch = prepare_signup_reminders(Participant.objects.all())
        deliver_reminders(batch.reminders)
        return batch

    def count(self):
        reminder = PaymentReminder.objects.filter(participant=self.participant, event=self.event).first()
        return reminder.count if reminder else 0

    def test_a_new_participant_without_payments_gets_one_email(self):
        self.send()

        self.assertEqual(len(mail.outbox), 1)
        message = mail.outbox[0]
        self.assertEqual(message.to, ['ada@example.com'])
        self.assertIn('one step away', message.subject)
        self.assertIn('In-person attendance', message.body)
        self.assertIn('Online attendance', message.body)
        self.assertIn('1 hands-on workshop', message.body)
        self.assertIn('https://wss.test/dashboard/register', message.alternatives[0][0])
        self.assertEqual(self.count(), 1)

    def test_skips_people_who_signed_up_too_long_ago(self):
        joined_days_ago(self.participant, 31)

        self.assertEqual(self.send().joined_too_long_ago, 1)
        self.assertEqual(mail.outbox, [])

    def test_skips_anyone_with_a_payment_for_the_edition_whatever_its_status(self):
        for status in (PaymentStatus.PENDING, PaymentStatus.FAILED, PaymentStatus.PAID):
            with self.subTest(status=status):
                payment = make_payment(self.participant, [self.online], status)

                self.assertEqual(self.send().started_payment, 1)
                self.assertEqual(mail.outbox, [])
                payment.delete()

    def test_skips_someone_registered_in_the_edition(self):
        register(self.participant, self.online)

        self.assertEqual(self.send().started_payment, 1)
        self.assertEqual(mail.outbox, [])

    def test_skips_someone_with_a_group_payment_for_the_edition(self):
        GroupPaymentRequest.objects.create(participant=self.participant, plan=self.online, participant_numbers=3)

        self.assertEqual(self.send().started_payment, 1)
        self.assertEqual(mail.outbox, [])

    def test_a_payment_for_an_older_edition_does_not_count(self):
        make_payment(self.participant, [make_mode_plan(self.old_event)], PaymentStatus.PAID)

        self.send()

        self.assertEqual(len(mail.outbox), 1)

    def test_nothing_is_sent_while_registration_is_closed(self):
        self.event.participationplan_set.update(is_open=False)

        self.assertEqual(self.send().registration_closed, 1)
        self.assertEqual(mail.outbox, [])

    def test_full_plans_are_not_offered(self):
        self.workshop.capacity = 1
        self.workshop.save()
        register(make_participant(), self.workshop)

        self.send()

        self.assertNotIn('workshop', mail.outbox[0].body.split('Choose your plan')[0].split('open for:')[1])

    def test_one_email_per_address(self):
        twin = make_participant('ADA@example.com')
        joined_days_ago(twin, 1)

        self.send()

        self.assertEqual(len(mail.outbox), 1)

    def test_waits_between_reminders_and_stops_at_the_limit(self):
        self.send()
        self.assertEqual(self.send().too_soon, 1)

        PaymentReminder.objects.update(last_sent_at=timezone.now() - datetime.timedelta(hours=49))
        self.send()
        PaymentReminder.objects.update(last_sent_at=timezone.now() - datetime.timedelta(hours=49))
        batch = self.send()

        self.assertEqual(len(mail.outbox), 2)
        self.assertEqual(batch.at_limit, 1)

    def test_shares_the_wait_with_payment_reminders(self):
        self.send()
        make_payment(self.participant, [self.online], PaymentStatus.FAILED)

        batch = prepare_reminders(PaymentRequest.objects.all())

        self.assertEqual(batch.reminders, [])
        self.assertEqual(batch.too_soon, 1)


# The admin's pages need its static files; the test run has no collectstatic manifest.
@override_settings(
    STORAGES={
        'default': {'BACKEND': 'django.core.files.storage.InMemoryStorage'},
        'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
    }
)
class ParticipantAdminTests(TestCase):
    def setUp(self):
        admin = User.objects.create_superuser('admin', 'admin@example.com', 'admin-password')
        self.client.force_login(admin)
        event = make_event(order=11)
        make_mode_plan(event)
        self.recent = make_participant('recent@example.com')
        joined_days_ago(self.recent, 2)
        self.older = make_participant('older@example.com')
        joined_days_ago(self.older, 20)

    def test_filters_by_how_recently_people_signed_up(self):
        response = self.client.get('/admin/participant/participant/', {'joined_within': '7'})

        self.assertEqual(list(response.context['cl'].queryset), [self.recent])

    def test_the_action_sends_in_the_background(self):
        with mock.patch('participant.admin.send_in_background') as send, self.captureOnCommitCallbacks(execute=True):
            response = self.client.post(
                '/admin/participant/participant/',
                {'action': 'send_signup_reminders', '_selected_action': [self.recent.pk, self.older.pk]},
                follow=True,
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(send.call_args.args[0]), 2)
        self.assertContains(response, 'Sending 2 reminder email(s) in the background.')
