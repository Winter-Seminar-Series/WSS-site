from zeep import Client
from zeep.proxy import ServiceProxy
from django.conf import settings

wsdl = settings.PAYMENT_SETTING['wsdl']
MERCHANT = settings.PAYMENT_SETTING['MERCHANT']
client = Client(wsdl)

def send_payment_request(callback_url: str, amount: float, desctiption: str, email: str = None, mobile: str = None):
    return client.service.PaymentRequest(MERCHANT, amount, desctiption, email, mobile, callback_url)

def verify(authority: str, amount: float):
    return client.service.PaymentVerification(MERCHANT, authority, amount)
