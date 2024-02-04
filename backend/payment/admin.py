from django.contrib import admin

from payment.models import PaymentDiscount, PaymentRequest

# Register your models here.
admin.site.register(PaymentDiscount)
admin.site.register(PaymentRequest)