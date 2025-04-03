import codecs
from django import forms
from django.contrib import admin
import csv
from django.shortcuts import redirect, render
from django.urls import path
from core.admin import ExportCSVMixin
from django.http import HttpResponse

from payment.models import PaymentDiscount, PaymentRequest
from core.models import Event

# Register your models here.

class CsvImportForm(forms.Form):
    csv_file = forms.FileField()

class PaymentDiscountAdmin(admin.ModelAdmin, ExportCSVMixin):
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
                    event=Event.objects.last(),
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

class PaymentRequestAdmin(admin.ModelAdmin, ExportCSVMixin):
    list_display = ('participant', 'timestamp', 'paid', 'discount_code', 'order_id', 'base_price', 'paid_price')
    list_filter = ('paid', 'discount__code')
    actions = ["export_as_csv", "calculate_discount_usage"]

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

admin.site.register(PaymentRequest, PaymentRequestAdmin)