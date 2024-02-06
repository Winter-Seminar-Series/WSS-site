import codecs
from django import forms
from django.contrib import admin
import csv
from django.shortcuts import redirect, render
from django.urls import path

from payment.models import PaymentDiscount, PaymentRequest

# Register your models here.

class CsvImportForm(forms.Form):
    csv_file = forms.FileField()

class PaymentDiscountAdmin(admin.ModelAdmin):
    search_fields = ('code',)
    list_display = ('code', 'percentage', 'amount', 'count')

    change_list_template = "discount_changelist.html"

    def import_from_csv(self, request):
        if request.method == 'POST':
            csv_file = request.FILES["csv_file"]
            reader = csv.reader(codecs.iterdecode(csv_file, 'UTF-8'))
            for row in reader:
                _, created = PaymentDiscount.objects.get_or_create(
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

admin.site.register(PaymentRequest)