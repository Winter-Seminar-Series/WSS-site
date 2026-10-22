"""Client of the payment service (../payment, Go), which talks to the bank gateway. Internal network only."""

import logging
from dataclasses import dataclass
from enum import Enum

import requests
from django.conf import settings

from common.exceptions import UpstreamError

logger = logging.getLogger(__name__)


class TransactionStatus(str, Enum):
    INITIATED = 'initiated'
    SUCCESS = 'success'
    FAILED = 'failed'
    TIMEOUT = 'timeout'


@dataclass(frozen=True)
class Transaction:
    order_id: str
    redirect_url: str


class PaymentGateway:
    def __init__(self, base_url: str | None = None, timeout: float | None = None):
        self.base_url = (base_url or settings.PAYMENT_SERVICE_URL).rstrip('/')
        self.timeout = timeout or settings.INTEGRATION_TIMEOUT

    def create_transaction(
        self,
        *,
        user_id: int,
        amount: int,
        discount: int,
        goods: list[str],
        callback_url: str,
        name: str = '',
        phone: str = '',
        email: str = '',
    ) -> Transaction:
        """Starts a payment of `amount` Rial (must be positive) and returns where to send the payer."""
        payload = {
            'user_id': user_id,
            'to_pay_amount': amount,
            'discount_amount': discount,
            'buying_goods': goods,
            'name': name,
            'phone': phone,
            'mail': email,
            'callback_url': callback_url,
        }
        data = self._request('POST', '/transaction', expected=201, json=payload)
        return Transaction(order_id=str(data['order_id']), redirect_url=data['redirect_url'])

    def status(self, order_id: str) -> TransactionStatus:
        """The payment's state; the service verifies it with the bank first if it is still pending."""
        data = self._request('GET', '/transaction', expected=200, params={'order_id': order_id})
        try:
            return TransactionStatus(data['payment_status'])
        except (KeyError, ValueError):
            logger.error('Payment service returned an unknown status for order %s', order_id)
            raise UpstreamError()

    def _request(self, method: str, path: str, *, expected: int, **kwargs) -> dict:
        try:
            response = requests.request(method, f'{self.base_url}{path}', timeout=self.timeout, **kwargs)
        except requests.RequestException:
            logger.exception('Payment service unreachable: %s %s', method, path)
            raise UpstreamError()
        if response.status_code != expected:
            # The body is the service's error message; it never contains card data.
            logger.error('Payment service %s %s answered %s: %s', method, path, response.status_code, response.text)
            raise UpstreamError()
        return response.json()
