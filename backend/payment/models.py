from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator
from django.db import models

from core.models import Event
from participant.models import Participant, ParticipationPlan, PlanAddon
from payment import pricing


class PaymentDiscount(models.Model):
    """A discount code for one edition. `count` is the number of uses left; -1 means unlimited."""

    UNLIMITED = -1

    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True)
    code = models.CharField(max_length=50, blank=False, unique=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    amount = models.IntegerField(default=0)
    count = models.IntegerField(default=UNLIMITED)

    def __str__(self) -> str:
        return f'{self.code}'

    @property
    def is_available(self) -> bool:
        return self.count == self.UNLIMITED or self.count > 0


class PaymentStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    PAID = 'paid', 'Paid'
    FAILED = 'failed', 'Failed'


class PaymentRecord(models.Model):
    """
    State shared by single and group payments. `status` is the source of truth; `paid` mirrors it for the
    existing reports (Metabase) and is only written through `set_status`.
    """

    status = models.CharField(max_length=10, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    paid = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    order_id = models.CharField(max_length=100, blank=True)

    class Meta:
        abstract = True

    def set_status(self, status: PaymentStatus) -> None:
        self.status = status
        self.paid = status == PaymentStatus.PAID
        self.save(update_fields=['status', 'paid'])


class PaymentRequest(PaymentRecord):
    plans = models.ManyToManyField(ParticipationPlan)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    discount = models.ForeignKey(PaymentDiscount, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.participant} - {self.timestamp}'

    def get_price(self) -> tuple[int, int]:
        """(total, payable) in Rial."""
        price = pricing.quote(self.plans.all(), self.discount, self.addon_lines.all())
        return price.total, price.payable


class PaymentRequestAddon(models.Model):
    """Units of an add-on in a payment. They become an AddonPurchase once the payment is fulfilled."""

    payment = models.ForeignKey(PaymentRequest, on_delete=models.CASCADE, related_name='addon_lines')
    addon = models.ForeignKey(PlanAddon, on_delete=models.PROTECT, related_name='payment_lines')
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    class Meta:
        constraints = [models.UniqueConstraint(fields=('payment', 'addon'), name='unique_addon_per_payment')]

    def __str__(self) -> str:
        return f'{self.addon} × {self.quantity}'


class GroupPaymentRequest(PaymentRecord):
    """One participant pays a mode of attendance for a group; everyone in it then gets a free registration code."""

    plan = models.ForeignKey(ParticipationPlan, on_delete=models.CASCADE)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    participant_numbers = models.IntegerField(default=1)
    discount = models.ForeignKey(PaymentDiscount, on_delete=models.CASCADE, null=True, blank=True)
    group_discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    participant_emails = ArrayField(models.EmailField(), blank=True, default=list)

    def __str__(self) -> str:
        return f'{self.participant} + {len(self.participant_emails)} - {self.timestamp}'

    def save(self, *args, **kwargs):
        self.group_discount_percentage = pricing.group_discount_percentage(self.participant_numbers)
        super().save(*args, **kwargs)

    @property
    def all_participants(self) -> list[Participant]:
        """The payer first, then everyone they paid for."""
        others = Participant.objects.filter(user__email__in=self.participant_emails).select_related('user')
        return [self.participant, *others]

    def get_price(self) -> tuple[int, int]:
        """(total, payable) in Rial."""
        price = pricing.group_quote(self.plan, self.participant_numbers, self.discount)
        return price.total, price.payable
