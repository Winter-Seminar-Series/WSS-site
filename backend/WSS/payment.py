from zeep import Client
from zeep.proxy import ServiceProxy
from django.conf import settings


MERCHANT = settings.PAYMENT_SETTING['MERCHANT']
the_client = None

def get_client():
    global the_client

    if the_client:
        return the_client
    
    wsdl = settings.PAYMENT_SETTING['wsdl']
    the_client = Client(wsdl)
    return the_client


def send_payment_request(callback_url: str, amount: int, desctiption: str, email: str = None, mobile: str = None):
    client = get_client()
    return client.service.PaymentRequest(MERCHANT, amount, desctiption, email, mobile, callback_url)

def verify(authority: str, amount: float):
    client = get_client()
    return client.service.PaymentVerification(MERCHANT, authority, amount)
