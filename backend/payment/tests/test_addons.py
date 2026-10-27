from unittest import mock

from common.testing import (
    APITest,
    make_addon,
    make_discount,
    make_event,
    make_mode_plan,
    make_participant,
    register,
)
from participant.models import AddonPurchase, Participation
from payment.gateway import Transaction, TransactionStatus
from payment.models import PaymentRequest, PaymentRequestAddon, PaymentStatus


class AddonTest(APITest):
    def setUp(self):
        super().setUp()
        self.event = make_event()
        self.in_person = make_mode_plan(self.event, price=2_000_000, name='In Person')
        self.lunch = make_addon(self.in_person, price=300_000, name='Lunch', max_per_participant=3)
        self.parking = make_addon(self.in_person, price=100_000, name='Parking', capacity=2)
        self.participant = make_participant()
        self.authenticate(self.participant)
        patcher = mock.patch('payment.services.PaymentGateway')
        self.gateway = patcher.start().return_value
        self.addCleanup(patcher.stop)
        self.gateway.create_transaction.return_value = Transaction(order_id='order-1', redirect_url='https://bank/1')

    def body(self, plans, addons, code=''):
        return {
            'plans': [plan.pk for plan in plans],
            'addons': [{'addon': addon.pk, 'quantity': quantity} for addon, quantity in addons],
            'discount_code': code,
        }

    def price(self, plans, addons, code=''):
        return self.client.post('/api/payment/price/', self.body(plans, addons, code), format='json')

    def checkout(self, plans, addons, code=''):
        return self.client.post('/api/payment/create/', self.body(plans, addons, code), format='json')

    def pay(self, plans, addons, code=''):
        """Checks out and has the bank confirm it."""
        self.assertEqual(self.checkout(plans, addons, code).status_code, 201)
        payment = PaymentRequest.objects.latest('pk')
        self.gateway.status.return_value = TransactionStatus.SUCCESS
        self.assertTrue(self.client.get(f'/api/payment/verify/{payment.pk}/').json()['paid'])
        return payment


class AddonPriceTests(AddonTest):
    def test_addons_are_priced_with_their_plan(self):
        response = self.price([self.in_person], [(self.lunch, 2)])
        self.assertEqual(response.json(), {'total_price': 2_600_000, 'calculated_price': 2_600_000})

    def test_discount_applies_only_to_discountable_addons(self):
        make_discount(self.event, percentage=50)
        coffee = make_addon(self.in_person, price=200_000, name='Coffee', discountable=True)
        response = self.price([self.in_person], [(self.lunch, 1), (coffee, 1)], 'SAVE20')
        # Plan and coffee are halved; lunch is paid in full.
        self.assertEqual(response.json(), {'total_price': 2_500_000, 'calculated_price': 1_400_000})

    def test_repeated_lines_are_added_up(self):
        response = self.price([self.in_person], [(self.lunch, 1), (self.lunch, 2)])
        self.assertEqual(response.json()['total_price'], 2_900_000)

    def test_old_clients_that_send_only_plans_still_work(self):
        response = self.client.post('/api/payment/price/', {'plans': [self.in_person.pk]}, format='json')
        self.assertEqual(response.json(), {'total_price': 2_000_000, 'calculated_price': 2_000_000})

    def test_an_empty_basket_is_refused(self):
        self.assertIn('no_plans', self.error_codes(self.price([], [])))

    def test_quantity_must_be_positive(self):
        self.assertEqual(self.price([self.in_person], [(self.lunch, 0)]).status_code, 400)


class AddonRuleTests(AddonTest):
    def test_closed_addons_cannot_be_bought(self):
        self.lunch.is_open = False
        self.lunch.save()
        self.assertIn('addon_closed', self.error_codes(self.checkout([self.in_person], [(self.lunch, 1)])))

    def test_quantity_is_limited_per_participant(self):
        self.assertIn('addon_limit', self.error_codes(self.checkout([self.in_person], [(self.lunch, 4)])))

    def test_the_limit_counts_what_the_participant_already_holds(self):
        self.pay([self.in_person], [(self.lunch, 2)])
        self.assertIn('addon_limit', self.error_codes(self.checkout([], [(self.lunch, 2)])))
        self.assertEqual(self.checkout([], [(self.lunch, 1)]).status_code, 201)

    def test_capacity_counts_units_sold_to_everyone(self):
        other = make_participant()
        register(other, self.in_person)
        AddonPurchase.objects.create(participant=other, addon=self.parking, quantity=1)
        self.parking.max_per_participant = 2
        self.parking.save()

        response = self.checkout([self.in_person], [(self.parking, 2)])

        self.assertIn('addon_full', self.error_codes(response))
        self.assertEqual(self.checkout([self.in_person], [(self.parking, 1)]).status_code, 201)

    def test_an_addon_needs_its_plan(self):
        online = make_mode_plan(self.event, name='Online')
        self.assertIn('addon_without_plan', self.error_codes(self.checkout([online], [(self.lunch, 1)])))
        self.assertIn('addon_without_plan', self.error_codes(self.price([], [(self.lunch, 1)])))

    def test_addons_of_another_edition_cannot_be_mixed_in(self):
        old = make_addon(make_mode_plan(make_event(order=9)))
        self.assertIn('mixed_events', self.error_codes(self.checkout([self.in_person], [(old, 1)])))


class AddonCheckoutTests(AddonTest):
    def test_bank_payment_carries_the_addons(self):
        self.checkout([self.in_person], [(self.lunch, 2)])

        kwargs = self.gateway.create_transaction.call_args.kwargs
        self.assertEqual(kwargs['amount'], 2_600_000)
        self.assertEqual(kwargs['goods'][1], f'{self.lunch} × 2')
        line = PaymentRequestAddon.objects.get()
        self.assertEqual((line.addon, line.quantity), (self.lunch, 2))
        self.assertEqual(PaymentRequest.objects.get().get_price(), (2_600_000, 2_600_000))
        self.assertFalse(AddonPurchase.objects.exists())  # not before the bank confirms

    def test_a_confirmed_payment_records_the_addons_once(self):
        payment = self.pay([self.in_person], [(self.lunch, 2), (self.parking, 1)])
        self.client.get(f'/api/payment/verify/{payment.pk}/')

        purchases = AddonPurchase.objects.filter(participant=self.participant, payment=payment)
        self.assertEqual(
            sorted((purchase.addon_id, purchase.quantity) for purchase in purchases),
            sorted([(self.lunch.pk, 2), (self.parking.pk, 1)]),
        )
        self.assertEqual(Participation.objects.filter(participant=self.participant).count(), 1)

    def test_a_failed_payment_records_no_addons(self):
        self.checkout([self.in_person], [(self.lunch, 1)])
        self.gateway.status.return_value = TransactionStatus.FAILED
        self.client.get(f'/api/payment/verify/{PaymentRequest.objects.get().pk}/')
        self.assertFalse(AddonPurchase.objects.exists())

    def test_addons_can_be_bought_later_without_registering_again(self):
        self.pay([self.in_person], [])

        payment = self.pay([], [(self.parking, 1)])

        self.assertEqual(self.gateway.create_transaction.call_args.kwargs['amount'], 100_000)
        self.assertEqual(AddonPurchase.objects.get(payment=payment).quantity, 1)
        self.assertEqual(Participation.objects.filter(participant=self.participant).count(), 1)

    def test_a_code_is_not_spent_on_a_basket_it_cannot_discount(self):
        register(self.participant, self.in_person)
        code = make_discount(self.event, code='ONCE', percentage=100, count=1)

        self.checkout([], [(self.parking, 1)], 'ONCE')

        self.assertEqual(self.gateway.create_transaction.call_args.kwargs['amount'], 100_000)
        code.refresh_from_db()
        self.assertEqual(code.count, 1)
        self.assertIsNone(PaymentRequest.objects.get().discount)

    def test_a_free_addon_order_is_fulfilled_at_once(self):
        register(self.participant, self.in_person)
        free = make_addon(self.in_person, price=0, name='Badge')

        response = self.checkout([], [(free, 1)])

        self.assertTrue(response.json()['redirect_url'].endswith('/dashboard/profile'))
        self.gateway.create_transaction.assert_not_called()
        self.assertEqual(PaymentRequest.objects.get().status, PaymentStatus.PAID)
        self.assertEqual(AddonPurchase.objects.get().addon, free)


class AddonListingTests(AddonTest):
    def test_plans_list_their_addons_with_units_left(self):
        AddonPurchase.objects.create(participant=make_participant(), addon=self.parking, quantity=1)

        plan = self.client.get(f'/api/mode/{self.event.pk}/').json()[0]

        addons = {addon['name']: addon for addon in plan['addons']}
        self.assertEqual(addons['Parking']['remaining'], 1)
        self.assertIsNone(addons['Lunch']['remaining'])
        self.assertEqual(addons['Lunch']['max_per_participant'], 3)
        self.assertEqual(addons['Lunch']['price'], 300_000)

    def test_participants_see_their_own_addons_summed(self):
        self.pay([self.in_person], [(self.lunch, 1)])
        self.pay([], [(self.lunch, 2)])
        AddonPurchase.objects.create(participant=make_participant(), addon=self.lunch, quantity=1)

        response = self.client.get(f'/api/addon/{self.event.pk}/')

        self.assertEqual(response.json(), [{'addon': self.lunch.pk, 'quantity': 3}])

    def test_holdings_require_sign_in(self):
        self.client.credentials()
        self.assertEqual(self.client.get(f'/api/addon/{self.event.pk}/').status_code, 401)
