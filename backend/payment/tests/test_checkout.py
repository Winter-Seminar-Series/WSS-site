from unittest import mock

from common.exceptions import UpstreamError
from common.testing import (
    APITest,
    make_discount,
    make_event,
    make_mode_plan,
    make_participant,
    make_workshop_plan,
    register,
)
from participant.models import Participation
from payment.gateway import Transaction, TransactionStatus
from payment.models import PaymentDiscount, PaymentRequest, PaymentStatus


class CheckoutTest(APITest):
    def setUp(self):
        super().setUp()
        self.event = make_event()
        self.online = make_mode_plan(self.event, price=2_000_000)
        self.workshop = make_workshop_plan(self.event, price=500_000)
        self.participant = make_participant()
        self.authenticate(self.participant)
        patcher = mock.patch('payment.services.PaymentGateway')
        self.gateway = patcher.start().return_value
        self.addCleanup(patcher.stop)
        self.gateway.create_transaction.return_value = Transaction(order_id='order-1', redirect_url='https://bank/1')

    def price(self, plans, code=''):
        body = {'plans': [plan.pk for plan in plans], 'total_price': 0, 'calculated_price': 0}
        return self.client.post('/api/payment/price/', {**body, 'discount_code': code}, format='json')

    def checkout(self, plans, code=''):
        body = {'plans': [plan.pk for plan in plans], 'discount_code': code}
        return self.client.post('/api/payment/create/', body, format='json')

    def verify(self, payment_id):
        return self.client.get(f'/api/payment/verify/{payment_id}/')


class PriceTests(CheckoutTest):
    def test_prices_the_basket_in_rial(self):
        response = self.price([self.online, self.workshop])
        self.assertEqual(response.json(), {'total_price': 2_500_000, 'calculated_price': 2_500_000})

    def test_unknown_discount_codes_are_reported_as_invalid(self):
        # The frontend re-prices without the code when it sees this exact code.
        response = self.price([self.online], 'NOPE')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['errors'][0]['code'], 'invalid')

    def test_used_up_and_other_edition_codes_are_invalid(self):
        make_discount(self.event, code='USED', percentage=10, count=0)
        make_discount(make_event(order=9), code='OLD', percentage=10)
        self.assertEqual(self.price([self.online], 'USED').status_code, 400)
        self.assertEqual(self.price([self.online], 'OLD').status_code, 400)

    def test_closed_plans_cannot_be_priced(self):
        closed = make_mode_plan(self.event, name='In Person', is_open=False)
        response = self.price([closed])
        self.assertEqual(response.status_code, 400)
        self.assertIn('plan_closed', self.error_codes(response))

    def test_full_plans_cannot_be_priced(self):
        limited = make_mode_plan(self.event, capacity=1)
        register(make_participant(), limited)
        self.assertIn('plan_full', self.error_codes(self.price([limited])))

    def test_requires_sign_in(self):
        self.client.credentials()
        self.assertEqual(self.price([self.online]).status_code, 401)


class CreatePaymentTests(CheckoutTest):
    def test_starts_a_bank_payment_for_the_discounted_amount(self):
        make_discount(self.event, percentage=25, count=5)

        response = self.checkout([self.online, self.workshop], 'SAVE20')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'redirect_url': 'https://bank/1'})
        kwargs = self.gateway.create_transaction.call_args.kwargs
        self.assertEqual((kwargs['amount'], kwargs['discount']), (2_000_000, 500_000))
        payment = PaymentRequest.objects.get()
        self.assertEqual((payment.order_id, payment.status), ('order-1', PaymentStatus.PENDING))
        self.assertEqual(PaymentDiscount.objects.get().count, 4)

    def test_a_free_order_registers_at_once(self):
        make_discount(self.event, code='FREE', percentage=100, count=1)

        response = self.checkout([self.online], 'FREE')

        self.assertTrue(response.json()['redirect_url'].endswith('/dashboard/profile'))
        self.gateway.create_transaction.assert_not_called()
        self.assertEqual(PaymentRequest.objects.get().status, PaymentStatus.PAID)
        participation = Participation.objects.get()
        self.assertEqual(participation.plan, self.online)
        self.assertNotEqual(participation.info_id, self.participant.info_id)  # a snapshot, not the live profile
        self.assertEqual(self.price([self.online], 'FREE').status_code, 400)  # its only use is spent

    def test_a_gateway_failure_leaves_nothing_behind(self):
        make_discount(self.event, percentage=10, count=1)
        self.gateway.create_transaction.side_effect = UpstreamError()
        # 5xx responses are reported through got_request_exception, which the test client would re-raise.
        self.client.raise_request_exception = False

        response = self.checkout([self.online], 'SAVE20')

        self.assertEqual(response.status_code, 502)
        self.assertFalse(PaymentRequest.objects.exists())
        self.assertEqual(PaymentDiscount.objects.get().count, 1)

    def test_cannot_buy_a_plan_twice(self):
        register(self.participant, self.workshop)
        self.assertIn('already_registered', self.error_codes(self.checkout([self.workshop])))

    def test_only_one_mode_of_attendance_per_edition(self):
        register(self.participant, self.online)
        self.assertIn('multiple_modes', self.error_codes(self.checkout([make_mode_plan(self.event)])))

    def test_a_mode_in_a_past_edition_does_not_block_the_new_one(self):
        register(self.participant, make_mode_plan(make_event(order=9)))
        self.assertEqual(self.checkout([self.online]).status_code, 201)

    def test_plans_of_different_editions_cannot_be_mixed(self):
        other = make_workshop_plan(make_event(order=9))
        self.assertIn('mixed_events', self.error_codes(self.checkout([self.online, other])))


class VerifyPaymentTests(CheckoutTest):
    def start_payment(self, code=''):
        self.checkout([self.online, self.workshop], code)
        return PaymentRequest.objects.get()

    def test_a_successful_payment_registers_once_however_often_it_is_verified(self):
        payment = self.start_payment()
        self.gateway.status.return_value = TransactionStatus.SUCCESS

        first, second = self.verify(payment.pk), self.verify(payment.pk)

        self.assertEqual(first.json(), {'id': payment.pk, 'order_id': 'order-1', 'paid': True})
        self.assertEqual(second.json()['paid'], True)
        self.assertEqual(self.gateway.status.call_count, 1)
        self.assertEqual(Participation.objects.filter(participant=self.participant).count(), 2)

    def test_a_failed_payment_returns_its_discount_use_once(self):
        make_discount(self.event, percentage=10, count=1)
        payment = self.start_payment('SAVE20')
        self.gateway.status.return_value = TransactionStatus.FAILED

        self.verify(payment.pk)
        self.verify(payment.pk)

        payment.refresh_from_db()
        self.assertEqual((payment.status, payment.paid), (PaymentStatus.FAILED, False))
        self.assertEqual(PaymentDiscount.objects.get().count, 1)
        self.assertFalse(Participation.objects.exists())

    def test_a_payment_still_at_the_bank_is_a_409(self):
        payment = self.start_payment()
        self.gateway.status.return_value = TransactionStatus.INITIATED
        response = self.verify(payment.pk)
        self.assertEqual(response.status_code, 409)
        payment.refresh_from_db()
        self.assertEqual(payment.status, PaymentStatus.PENDING)

    def test_someone_elses_payment_is_not_found(self):
        payment = self.start_payment()
        self.authenticate(make_participant())
        self.assertEqual(self.verify(payment.pk).status_code, 404)

    def test_a_licence_failure_does_not_undo_the_registration(self):
        from spotplayer.models import SpotPlayerCourse

        self.workshop.spotplayer_course = SpotPlayerCourse.objects.create(course_id='c1', course_name='Recorded')
        self.workshop.save()
        payment = self.start_payment()
        self.gateway.status.return_value = TransactionStatus.SUCCESS

        with mock.patch('payment.services.SpotPlayerClient') as client:
            client.return_value.create_license.side_effect = UpstreamError()
            response = self.verify(payment.pk)

        self.assertTrue(response.json()['paid'])
        self.assertEqual(Participation.objects.filter(spotplayer_license__isnull=True).count(), 2)
