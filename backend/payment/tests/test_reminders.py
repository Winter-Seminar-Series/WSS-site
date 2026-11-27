import datetime
from unittest import mock

from django.contrib.auth import get_user_model
from django.core import mail
from django.db import connection
from django.test import TestCase, override_settings
from django.test.utils import CaptureQueriesContext
from django.utils import timezone

from common.testing import make_addon, make_event, make_mode_plan, make_participant, make_workshop_plan, register
from payment.models import GroupPaymentRequest, PaymentReminder, PaymentRequest, PaymentRequestAddon, PaymentStatus
from payment.reminders import deliver_reminders, prepare_reminders


def make_payment(participant, plans=(), status=PaymentStatus.FAILED, addons=(), age=datetime.timedelta(hours=1)):
    payment = PaymentRequest.objects.create(participant=participant)
    payment.set_status(status)
    # `timestamp` is auto_now_add; age it so pending payments are not taken for ones still at the bank.
    PaymentRequest.objects.filter(pk=payment.pk).update(timestamp=timezone.now() - age)
    payment.refresh_from_db()
    payment.plans.set(plans)
    for addon in addons:
        PaymentRequestAddon.objects.create(payment=payment, addon=addon, quantity=1)
    return payment


# No wait between reminders here, so repeated runs reach the limit; the wait is tested in ReminderIntervalTests.
@override_settings(PAYMENT_REMINDER_MAX=2, PAYMENT_REMINDER_INTERVAL_HOURS=0, FRONTEND_ORIGIN='https://wss.test')
class PrepareRemindersTests(TestCase):
    def setUp(self):
        self.event = make_event(order=11)
        self.online = make_mode_plan(self.event, name='Online')
        self.workshop = make_workshop_plan(self.event)
        self.participant = make_participant('ada@example.com')

    def send(self):
        batch = prepare_reminders(PaymentRequest.objects.all())
        deliver_reminders(batch.reminders)
        return batch

    def count(self, participant=None, event=None):
        reminder = PaymentReminder.objects.filter(
            participant=participant or self.participant, event=event or self.event
        ).first()
        return reminder.count if reminder else 0

    def test_one_email_per_participant_however_many_payments_are_unpaid(self):
        make_payment(self.participant, [self.online], PaymentStatus.FAILED)
        make_payment(self.participant, [self.online], PaymentStatus.PENDING)
        make_payment(self.participant, [self.workshop], PaymentStatus.FAILED)

        self.send()

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ['ada@example.com'])
        self.assertEqual(self.count(), 1)

    def test_the_email_lists_the_latest_payment_and_links_to_registration(self):
        make_payment(self.participant, [self.online])
        make_payment(self.participant, [self.workshop])

        self.send()

        body = mail.outbox[0].body
        self.assertIn(f'Workshop: {self.workshop.workshop.name}', body)
        self.assertNotIn('Online attendance', body)
        self.assertIn('https://wss.test/dashboard/register', body)
        html = mail.outbox[0].alternatives[0][0]
        self.assertIn('https://wss.test/dashboard/register', html)

    def test_stops_at_the_configured_maximum(self):
        make_payment(self.participant, [self.online])

        self.send()
        self.send()
        batch = self.send()

        self.assertEqual(len(mail.outbox), 2)
        self.assertEqual(self.count(), 2)
        self.assertEqual(batch.at_limit, 1)

    def test_counts_are_kept_per_edition(self):
        PaymentReminder.objects.create(participant=self.participant, event=self.event, count=2)
        other_event = make_event(order=12)
        make_payment(self.participant, [make_mode_plan(other_event)])

        self.send()

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(self.count(event=other_event), 1)

    def test_falls_back_to_an_older_edition_when_the_latest_is_at_the_limit(self):
        other_event = make_event(order=12)
        make_payment(self.participant, [self.online])
        make_payment(self.participant, [make_mode_plan(other_event)])
        PaymentReminder.objects.create(participant=self.participant, event=other_event, count=2)

        self.send()

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(self.count(), 1)
        self.assertEqual(self.count(event=other_event), 2)

    def test_paid_payments_are_ignored(self):
        make_payment(self.participant, [self.online], PaymentStatus.PAID)

        batch = self.send()

        self.assertEqual(mail.outbox, [])
        self.assertEqual(batch.reminders, [])

    def test_no_reminder_after_failed_payments_then_a_paid_one_for_the_edition(self):
        for _ in range(3):
            make_payment(self.participant, [self.workshop], PaymentStatus.FAILED)
        make_payment(self.participant, [self.online], PaymentStatus.PAID)
        register(self.participant, self.online)

        batch = self.send()

        self.assertEqual(mail.outbox, [])
        self.assertEqual(batch.registered, 1)
        self.assertEqual(self.count(), 0)

    def test_a_paid_payment_alone_counts_as_in_the_edition(self):
        make_payment(self.participant, [self.workshop], PaymentStatus.FAILED)
        make_payment(self.participant, [self.online], PaymentStatus.PAID)

        self.assertEqual(self.send().registered, 1)
        self.assertEqual(mail.outbox, [])

    def test_a_registration_made_in_the_admin_counts_as_in_the_edition(self):
        make_payment(self.participant, [self.workshop], PaymentStatus.FAILED)
        register(self.participant, self.online)

        self.assertEqual(self.send().registered, 1)
        self.assertEqual(mail.outbox, [])

    def test_a_paid_group_payment_counts_as_in_the_edition(self):
        make_payment(self.participant, [self.online], PaymentStatus.FAILED)
        group = GroupPaymentRequest.objects.create(
            participant=self.participant, plan=self.online, participant_numbers=3
        )
        group.set_status(PaymentStatus.PAID)

        self.assertEqual(self.send().registered, 1)
        self.assertEqual(mail.outbox, [])

    def test_being_in_another_edition_does_not_stop_the_reminder(self):
        old_event = make_event(order=10)
        register(self.participant, make_mode_plan(old_event))
        make_payment(self.participant, [self.online])

        self.send()

        self.assertEqual(len(mail.outbox), 1)

    def test_accounts_sharing_an_email_are_one_person(self):
        twin = make_participant('ADA@example.com')
        make_payment(self.participant, [self.online])
        make_payment(twin, [self.workshop])

        self.send()

        self.assertEqual(len(mail.outbox), 1)

    def test_a_paid_payment_on_another_account_with_the_same_email_counts(self):
        twin = make_participant('Ada@Example.com')
        make_payment(self.participant, [self.online], PaymentStatus.FAILED)
        make_payment(twin, [self.online], PaymentStatus.PAID)

        self.assertEqual(self.send().registered, 1)
        self.assertEqual(mail.outbox, [])

    def test_skips_plans_that_are_closed(self):
        self.online.is_open = False
        self.online.save()
        make_payment(self.participant, [self.online])

        self.assertEqual(self.send().nothing_to_buy, 1)
        self.assertEqual(mail.outbox, [])

    def test_skips_plans_that_are_full(self):
        self.workshop.capacity = 1
        self.workshop.save()
        register(make_participant(), self.workshop)
        make_payment(self.participant, [self.workshop])

        self.assertEqual(self.send().nothing_to_buy, 1)
        self.assertEqual(mail.outbox, [])

    def test_lists_only_what_is_still_open(self):
        lunch = make_addon(self.online, name='Lunch')
        self.online.is_open = False
        self.online.save()
        make_payment(self.participant, [self.online, self.workshop], addons=[lunch])

        self.send()

        body = mail.outbox[0].body
        self.assertNotIn('Online attendance', body)
        self.assertIn('Lunch', body)
        self.assertIn(self.workshop.workshop.name, body)

    def test_accounts_sharing_an_email_share_the_limit(self):
        twin = make_participant('ada@EXAMPLE.com')
        make_payment(self.participant, [self.online], age=datetime.timedelta(hours=2))
        make_payment(twin, [self.workshop])

        for _ in range(4):
            self.send()

        self.assertEqual(len(mail.outbox), 2)

    def test_leaves_alone_someone_whose_payment_is_under_way(self):
        make_payment(self.participant, [self.online], PaymentStatus.FAILED, age=datetime.timedelta(days=1))
        make_payment(self.participant, [self.online], PaymentStatus.PENDING, age=datetime.timedelta(minutes=5))

        batch = self.send()

        self.assertEqual(mail.outbox, [])
        self.assertEqual(batch.paying_now, 1)
        self.assertEqual(self.count(), 0)

    def test_an_old_pending_payment_is_reminded(self):
        make_payment(self.participant, [self.online], PaymentStatus.PENDING, age=datetime.timedelta(hours=2))

        self.send()

        self.assertEqual(len(mail.outbox), 1)

    def test_each_participant_gets_their_own_email(self):
        grace = make_participant('grace@example.com')
        make_payment(self.participant, [self.online])
        make_payment(grace, [self.online], PaymentStatus.PENDING)

        self.send()

        self.assertCountEqual([message.to[0] for message in mail.outbox], ['ada@example.com', 'grace@example.com'])

    def test_a_failed_email_does_not_count(self):
        make_payment(self.participant, [self.online])
        batch = prepare_reminders(PaymentRequest.objects.all())
        self.assertEqual(self.count(), 1)

        with mock.patch('django.core.mail.EmailMultiAlternatives.send', side_effect=OSError('smtp down')):
            sent = deliver_reminders(batch.reminders)

        self.assertEqual(sent, 0)
        self.assertEqual(self.count(), 0)

    def test_no_reminder_counts_when_the_mail_server_is_unreachable(self):
        make_payment(self.participant, [self.online])
        batch = prepare_reminders(PaymentRequest.objects.all())

        with mock.patch('django.core.mail.backends.locmem.EmailBackend.open', side_effect=OSError('refused')):
            sent = deliver_reminders(batch.reminders)

        self.assertEqual(sent, 0)
        self.assertEqual(self.count(), 0)


@override_settings(PAYMENT_REMINDER_MAX=2, PAYMENT_REMINDER_INTERVAL_HOURS=72)
class ReminderIntervalTests(TestCase):
    def setUp(self):
        self.event = make_event(order=11)
        self.plan = make_mode_plan(self.event)
        self.participant = make_participant('ada@example.com')
        make_payment(self.participant, [self.plan])

    def send(self):
        batch = prepare_reminders(PaymentRequest.objects.all())
        deliver_reminders(batch.reminders)
        return batch

    def reminder(self, event=None):
        return PaymentReminder.objects.get(participant=self.participant, event=event or self.event)

    def sent_hours_ago(self, hours, event=None):
        PaymentReminder.objects.filter(participant=self.participant, event=event or self.event).update(
            last_sent_at=timezone.now() - datetime.timedelta(hours=hours)
        )

    def test_no_second_reminder_within_the_interval(self):
        self.send()
        self.sent_hours_ago(2)

        batch = self.send()

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(batch.too_soon, 1)
        self.assertEqual(self.reminder().count, 1)

    def test_a_second_reminder_once_the_interval_has_passed(self):
        self.send()
        self.sent_hours_ago(73)

        self.send()

        self.assertEqual(len(mail.outbox), 2)
        self.assertEqual(self.reminder().count, 2)

    def test_the_limit_still_applies_after_the_interval(self):
        for _ in range(3):
            self.send()
            self.sent_hours_ago(73)

        self.assertEqual(len(mail.outbox), 2)

    def test_the_interval_spans_editions(self):
        other_event = make_event(order=12)
        make_payment(self.participant, [make_mode_plan(other_event)])
        PaymentReminder.objects.create(participant=self.participant, event=self.event, count=1)
        self.sent_hours_ago(2)

        batch = self.send()

        self.assertEqual(mail.outbox, [])
        self.assertEqual(batch.too_soon, 1)

    def test_a_failed_email_does_not_start_the_interval(self):
        self.send()
        self.sent_hours_ago(73)
        before = self.reminder().last_sent_at

        batch = prepare_reminders(PaymentRequest.objects.all())
        with mock.patch('django.core.mail.EmailMultiAlternatives.send', side_effect=OSError('smtp down')):
            deliver_reminders(batch.reminders)

        reminder = self.reminder()
        self.assertEqual(reminder.count, 1)
        self.assertEqual(reminder.last_sent_at, before)
        self.send()
        self.assertEqual(len(mail.outbox), 2)

    @override_settings(PAYMENT_REMINDER_INTERVAL_HOURS=0)
    def test_zero_means_no_wait(self):
        self.send()
        self.send()

        self.assertEqual(len(mail.outbox), 2)


# The admin's pages need its static files; the test run has no collectstatic manifest.
@override_settings(
    STORAGES={
        'default': {'BACKEND': 'django.core.files.storage.InMemoryStorage'},
        'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
    }
)
class ReminderAdminActionTests(TestCase):
    def setUp(self):
        admin = get_user_model().objects.create_superuser('admin', 'admin@example.com', 'admin-password')
        self.client.force_login(admin)
        event = make_event()
        self.payment = make_payment(make_participant(), [make_mode_plan(event)])

    def test_sends_the_reminders_in_the_background(self):
        with mock.patch('payment.admin.send_in_background') as send, self.captureOnCommitCallbacks(execute=True):
            response = self.client.post(
                '/admin/payment/paymentrequest/',
                {'action': 'send_payment_reminders', '_selected_action': [self.payment.pk]},
                follow=True,
            )

        self.assertEqual(response.status_code, 200)
        send.assert_called_once()
        self.assertEqual(len(send.call_args.args[0]), 1)
        self.assertContains(response, 'Sending 1 reminder email(s) in the background.')


@override_settings(
    STORAGES={
        'default': {'BACKEND': 'django.core.files.storage.InMemoryStorage'},
        'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
    }
)
class PaymentRequestEventFilterTests(TestCase):
    def setUp(self):
        admin = get_user_model().objects.create_superuser('admin', 'admin@example.com', 'admin-password')
        self.client.force_login(admin)
        self.event = make_event(order=11)
        other_event = make_event(order=12)
        plan = make_mode_plan(self.event)
        participant = make_participant()
        self.with_plans = make_payment(participant, [plan, make_workshop_plan(self.event)])
        self.addons_only = make_payment(participant, addons=[make_addon(plan)])
        self.elsewhere = make_payment(participant, [make_mode_plan(other_event)])

    def test_lists_each_payment_of_the_edition_once(self):
        response = self.client.get('/admin/payment/paymentrequest/', {'event': self.event.pk})

        listed = list(response.context['cl'].queryset)
        self.assertCountEqual(listed, [self.with_plans, self.addons_only])


@override_settings(
    STORAGES={
        'default': {'BACKEND': 'django.core.files.storage.InMemoryStorage'},
        'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
    }
)
class PaymentRequestAdminPageTests(TestCase):
    def setUp(self):
        admin = get_user_model().objects.create_superuser('admin', 'admin@example.com', 'admin-password')
        self.client.force_login(admin)
        self.plan = make_mode_plan(make_event())
        self.payment = make_payment(make_participant('grace@example.com', first_name='Grace'), [self.plan])
        make_payment(make_participant('alan@example.com', first_name='Alan'), [self.plan])

    def test_searches_by_email_and_name(self):
        for query in ('grace@example', 'Grace'):
            with self.subTest(query=query):
                response = self.client.get('/admin/payment/paymentrequest/', {'q': query})
                self.assertEqual(list(response.context['cl'].queryset), [self.payment])

    def test_the_change_page_does_not_grow_with_the_participants(self):
        url = f'/admin/payment/paymentrequest/{self.payment.pk}/change/'
        self.client.get(url)  # warms the per-process caches (content types, session)
        with CaptureQueriesContext(connection) as before:
            self.assertEqual(self.client.get(url).status_code, 200)
        for _ in range(20):
            make_participant()

        with self.assertNumQueries(len(before)):
            self.client.get(url)
