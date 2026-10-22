"""
Prices of an order, in Rial. Pure functions of the plans and the discount: no database access, no side effects.

Discount codes apply to the mode of attendance only; workshops are always paid in full. A fixed-amount discount
wins over a percentage, and never makes the price negative.
"""

from dataclasses import dataclass
from typing import Iterable, Protocol

from participant.models import ParticipationPlan

# Group checkout: participants in the group → percent off the mode of attendance.
GROUP_DISCOUNT_TIERS = ((5, 25), (4, 20), (3, 15))


class Discount(Protocol):
    amount: int
    percentage: object  # Decimal on the model


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


def quote(plans: Iterable[ParticipationPlan], discount: Discount | None = None) -> Quote:
    plans = list(plans)
    modes = sum(plan.price for plan in plans if plan.kind == ParticipationPlan.KIND_MODE)
    workshops = sum(plan.price for plan in plans if plan.kind == ParticipationPlan.KIND_WORKSHOP)
    return Quote(total=modes + workshops, payable=int(apply_discount(modes, discount)) + workshops)


def group_discount_percentage(participants: int) -> int:
    return next((percent for size, percent in GROUP_DISCOUNT_TIERS if participants >= size), 0)


def group_quote(plan: ParticipationPlan, participants: int, discount: Discount | None = None) -> Quote:
    """One mode of attendance bought for `participants` people: the group tier first, then the code."""
    each = plan.price - plan.price * group_discount_percentage(participants) / 100
    each = int(apply_discount(each, discount))
    return Quote(total=plan.price * participants, payable=each * participants)
