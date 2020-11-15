from zeep import Client
from zeep.proxy import ServiceProxy
from django.conf import settings


def send_payment_request(callback_url: str, amount: float, desctiption: str, email: str = None, mobile: str = None):
    configs = settings.PAYMENT_SETTING
    MERCHANT = configs['MERCHANT']
    wsdl = configs['wsdl']

    client = Client(wsdl)
    return client.service.PaymentRequest(MERCHANT, amount, desctiption, email, mobile, callback_url)