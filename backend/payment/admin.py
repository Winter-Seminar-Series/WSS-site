import codecs
import csv

from django import forms
from django.contrib import admin
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.urls import path

from core.admin import ExportCSVMixin
from core.models import Event
from payment.models import PaymentDiscount, PaymentRequest, PaymentRequestAddon


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


class PaymentRequestAdmin(ExportCSVMixin, admin.ModelAdmin):
    list_display = ('participant', 'timestamp', 'status', 'discount_code', 'order_id', 'base_price', 'paid_price')
    list_select_related = ('participant__user', 'participant__info', 'discount')
    list_filter = ('status', 'discount__code')
    inlines = (PaymentRequestAddonInline,)

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('plans', 'addon_lines__addon')
    actions = ["export_as_csv", "calculate_discount_usage"]
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