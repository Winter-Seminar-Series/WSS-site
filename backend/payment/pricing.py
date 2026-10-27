"""
Prices of an order, in Rial. Pure functions of the plans, add-ons and discount: no database access, no side effects.

Discount codes apply to the mode of attendance and to add-ons marked `discountable`; workshops and other add-ons are
always paid in full. A fixed-amount discount wins over a percentage, and never makes the price negative.
"""

from dataclasses import dataclass
from typing import Iterable, Protocol

from participant.models import ParticipationPlan, PlanAddon

# Group checkout: participants in the group → percent off the mode of attendance.
GROUP_DISCOUNT_TIERS = ((5, 25), (4, 20), (3, 15))


class Discount(Protocol):
    amount: int
    percentage: object  # Decimal on the model


class AddonLine(Protocol):
    """Units of one add-on: an `OrderLine`, or a `PaymentRequestAddon` row."""

    addon: PlanAddon
    quantity: int


@dataclass(frozen=True)
class OrderLine:
    addon: PlanAddon
    quantity: int


@dataclass(frozen=True)
class Quote:
    total: int
    payable: int

    @property
    def discount(self) -> int:
        return self.total - self.payable


def apply_discount(price: float, discount: Discount | None) -> float:
    if discount is None:
        return price
    amount = int(discount.amount)
    percentage = float(discount.percentage)
    if amount:
        return max(0, price - amount)
    if percentage > 0:
        return price - price * percentage / 100
    return price


def quote(
    plans: Iterable[ParticipationPlan], discount: Discount | None = None, addons: Iterable[AddonLine] = ()
) -> Quote:
    plans, addons = list(plans), list(addons)
    discountable = sum(plan.price for plan in plans if plan.kind == ParticipationPlan.KIND_MODE)
    discountable += sum(line.addon.price * line.quantity for line in addons if line.addon.discountable)
    full_price = sum(plan.price for plan in plans if plan.kind == ParticipationPlan.KIND_WORKSHOP)
    full_price += sum(line.addon.price * line.quantity for line in addons if not line.addon.discountable)
    return Quote(
        total=discountable + full_price, payable=int(apply_discount(discountable, discount)) + full_price
    )


def group_discount_percentage(participants: int) -> int:
    return next((percent for size, percent in GROUP_DISCOUNT_TIERS if participants >= size), 0)


def group_quote(plan: ParticipationPlan, participants: int, discount: Discount | None = None) -> Quote:
    """One mode of attendance bought for `participants` people: the group tier first, then the code."""
    each = plan.price - plan.price * group_discount_percentage(participants) / 100
    each = int(apply_discount(each, discount))
    return Quote(total=plan.price * participants, payable=each * participants)
