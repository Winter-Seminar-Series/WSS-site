import codecs
import csv

from django import forms
from django.conf import settings
from django.contrib import admin, messages
from django.db import transaction
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.urls import path

from core.admin import ExportCSVMixin
from core.models import Event
from payment.models import PaymentDiscount, PaymentReminder, PaymentRequest, PaymentRequestAddon
from payment.reminders import prepare_reminders, send_in_background


def latest_edition() -> Event | None:
    return Event.objects.order_by('-order').first()


class CsvImportForm(forms.Form):
    csv_file = forms.FileField()

class PaymentDiscountAdmin(ExportCSVMixin, admin.ModelAdmin):
    search_fields = ('code',)
    list_display = ('code', 'percentage', 'amount', 'count')
    actions = ["export_as_csv"]

    change_list_template = "discount_changelist.html"

    def import_from_csv(self, request):
        if request.method == 'POST':
            csv_file = request.FILES["csv_file"]
            reader = csv.reader(codecs.iterdecode(csv_file, 'UTF-8'))
            for row in reader:
                _, created = PaymentDiscount.objects.get_or_create(
                    event=latest_edition(),
                    code=row[0],
                    percentage=row[1],
                    amount=row[2],
                    count=row[3]
                )
            self.message_user(request, "Your csv file has been imported")
            return redirect("..")
        form = CsvImportForm()
        payload = {"form": form}
        return render(
            request, "csv_form.html", payload
        )

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('import-csv/', self.import_from_csv),
        ]
        return my_urls + urls

admin.site.register(PaymentDiscount, PaymentDiscountAdmin)

class DiscountCodesImportForm(forms.Form):
    file = forms.FileField()

class PaymentRequestAddonInline(admin.TabularInline):
    """Read-only: what was ordered is part of the payment's record."""

    model = PaymentRequestAddon
    extra = 0
    can_delete = False
    readonly_fields = ('addon', 'quantity')

    def has_add_permission(self, request, obj=None):
        return False


class EventFilter(admin.SimpleListFilter):
    """A payment's edition is its plans' (or, for an add-ons-only payment, its add-ons' plans'), newest first."""

    title = 'event'
    parameter_name = 'event'

    def lookups(self, request, model_admin):
        return [(event.pk, str(event)) for event in Event.objects.order_by('-order')]

    def queryset(self, request, queryset):
        if self.value() is None:
            return queryset
        in_event = PaymentRequest.objects.filter(
            Q(plans__event_id=self.value()) | Q(addon_lines__addon__plan__event_id=self.value())
        )
        return queryset.filter(pk__in=in_event.values('pk'))


class PaymentRequestAdmin(ExportCSVMixin, admin.ModelAdmin):
    list_display = ('participant', 'timestamp', 'status', 'discount_code', 'order_id', 'base_price', 'paid_price')
    list_select_related = ('participant__user', 'participant__info', 'discount')
    list_filter = (EventFilter, 'status', 'discount__code')
    search_fields = (
        'participant__user__email',
        'participant__info__first_name',
        'participant__info__last_name',
        'participant__info__phone_number',
        'order_id',
        'discount__code',
    )
    # A <select> of every participant (each label reads its profile) cost ~6,400 queries per change page.
    raw_id_fields = ('participant', 'discount')
    inlines = (PaymentRequestAddonInline,)

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('plans', 'addon_lines__addon')
    actions = ["export_as_csv", "calculate_discount_usage", "send_payment_reminders"]
    change_list_template = "payment_request_changelist.html"

    def base_price(self, obj):
        return obj.get_price()[0]
    
    def paid_price(self, obj):
        return obj.get_price()[1]
    
    def discount_code(self, obj):
        return obj.discount.code if obj.discount is not None else None

    def calculate_discount_usage(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=discount_usage.csv'
        writer = csv.writer(response)

        headers = [
            'Discount Code',
            'Event',
            'Total Usage',
            'Successful Payments'
        ]
        writer.writerow(headers)

        discount_codes = PaymentDiscount.objects.filter(
            paymentrequest__in=queryset
        ).distinct()

        for discount in discount_codes:
            total_usage = queryset.filter(discount=discount).count()
            
            successful_payments = queryset.filter(
                discount=discount,
                paid=True
            ).count()

            row = [
                discount.code,
                str(discount.event) if discount.event else 'No Event',
                total_usage,
                successful_payments
            ]
            writer.writerow(row)

        return response

    calculate_discount_usage.short_description = "Calculate Discount Code Usage"

    @admin.action(description='Send payment reminders (pending or failed)', permissions=['change'])
    def send_payment_reminders(self, request, queryset):
        batch = prepare_reminders(queryset)
        if batch.reminders:
            transaction.on_commit(lambda: send_in_background(batch.reminders))
        skipped = []
        if batch.at_limit:
            skipped.append(f'{batch.at_limit} already had {settings.PAYMENT_REMINDER_MAX} reminder(s)')
        if batch.too_soon:
            skipped.append(
                f'{batch.too_soon} had a reminder in the last {settings.PAYMENT_REMINDER_INTERVAL_HOURS} hours'
            )
        if batch.registered:
            skipped.append(f'{batch.registered} already registered or paid for that edition')
        if batch.paying_now:
            skipped.append(f'{batch.paying_now} have a payment under way (pending, under 30 minutes old)')
        if batch.nothing_to_buy:
            skipped.append(f'{batch.nothing_to_buy} chose only plans that are now closed or full')
        summary = f'Sending {len(batch.reminders)} reminder email(s) in the background.'
        if skipped:
            summary += ' Skipped people: ' + '; '.join(skipped) + '.'
        self.message_user(request, summary, messages.SUCCESS if batch.reminders else messages.WARNING)

    def import_discount_codes(self, request):
        if request.method == 'POST':
            file = request.FILES["file"]
            content = file.read().decode('utf-8')
            discount_codes = [code.strip() for code in content.split('\n') if code.strip()]
            
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename=discount_usage_report.csv'
            writer = csv.writer(response)

            headers = [
                'Discount Code',
                'Event',
                'Total Usage',
                'Successful Payments'
            ]
            writer.writerow(headers)

            for code in discount_codes:
                try:
                    discount = PaymentDiscount.objects.get(code=code)
                    total_usage = PaymentRequest.objects.filter(discount=discount).count()
                    successful_payments = PaymentRequest.objects.filter(
                        discount=discount,
                        paid=True
                    ).count()

                    row = [
                        discount.code,
                        str(discount.event) if discount.event else 'No Event',
                        total_usage,
                        successful_payments
                    ]
                    writer.writerow(row)
                except PaymentDiscount.DoesNotExist:
                    row = [code, 'Not Found', 0, 0]
                    writer.writerow(row)

            return response

        form = DiscountCodesImportForm()
        payload = {"form": form}
        return render(
            request, "csv_form.html", payload
        )

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('import-discount-codes/', self.import_discount_codes),
        ]
        return my_urls + urls

admin.site.register(PaymentRequest, PaymentRequestAdmin)


@admin.register(PaymentReminder)
class PaymentReminderAdmin(admin.ModelAdmin):
    """How many reminders each person (on their oldest account) has had per edition. Lower a count to allow another."""

    list_display = ('participant', 'event', 'count', 'last_sent_at')
    list_select_related = ('participant__user', 'participant__info', 'event')
    list_filter = ('event',)
    search_fields = ('participant__user__email',)
    readonly_fields = ('participant', 'event', 'last_sent_at')

    def has_add_permission(self, request):
        return False
