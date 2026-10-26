from decimal import Decimal
from types import SimpleNamespace

from django.test import SimpleTestCase

from participant.models import ParticipationPlan
from payment import pricing


def plan(kind: str, price: int):
    return SimpleNamespace(kind=kind, price=price)


def discount(amount: int = 0, percentage: str = '0'):
    return SimpleNamespace(amount=amount, percentage=Decimal(percentage))


MODE = ParticipationPlan.KIND_MODE
WORKSHOP = ParticipationPlan.KIND_WORKSHOP


def line(price: int, quantity: int = 1, discountable: bool = False):
    return pricing.OrderLine(addon=SimpleNamespace(price=price, discountable=discountable), quantity=quantity)


class AddonQuoteTests(SimpleTestCase):
    def test_addons_are_priced_per_unit(self):
        quote = pricing.quote([plan(MODE, 1000)], addons=[line(200, quantity=3)])
        self.assertEqual(quote, pricing.Quote(1600, 1600))

    def test_discount_skips_addons_that_are_not_discountable(self):
        quote = pricing.quote([plan(MODE, 1000)], discount(percentage='50'), [line(200, quantity=2)])
        self.assertEqual(quote, pricing.Quote(1400, 900))

    def test_discount_covers_discountable_addons(self):
        quote = pricing.quote(
            [plan(MODE, 1000)], discount(percentage='50'), [line(200, quantity=2, discountable=True), line(100)]
        )
        self.assertEqual(quote, pricing.Quote(1500, 800))

    def test_a_fixed_discount_never_goes_below_zero_on_addons_alone(self):
        quote = pricing.quote([], discount(amount=1000), [line(300, discountable=True), line(100)])
        self.assertEqual(quote, pricing.Quote(400, 100))


class QuoteTests(SimpleTestCase):
    def test_no_discount(self):
        self.assertEqual(pricing.quote([plan(MODE, 1000), plan(WORKSHOP, 500)]), pricing.Quote(1500, 1500))

    def test_percentage_applies_to_the_mode_of_attendance_only(self):
        quote = pricing.quote([plan(MODE, 1000), plan(WORKSHOP, 500)], discount(percentage='20'))
        self.assertEqual(quote, pricing.Quote(1500, 1300))
        self.assertEqual(quote.discount, 200)

    def test_a_fixed_amount_wins_and_never_goes_below_zero(self):
        quote = pricing.quote([plan(MODE, 1000), plan(WORKSHOP, 500)], discount(amount=5000, percentage='50'))
        self.assertEqual(quote, pricing.Quote(1500, 500))

    def test_fractions_are_truncated(self):
        self.assertEqual(pricing.quote([plan(MODE, 999)], discount(percentage='33.33')).payable, 666)


class GroupQuoteTests(SimpleTestCase):
    def test_tiers(self):
        self.assertEqual([pricing.group_discount_percentage(n) for n in (1, 2, 3, 4, 5, 9)], [0, 0, 15, 20, 25, 25])

    def test_group_tier_then_code(self):
        quote = pricing.group_quote(plan(MODE, 1000), 4, discount(percentage='10'))
        self.assertEqual(quote, pricing.Quote(4000, 4 * 720))
