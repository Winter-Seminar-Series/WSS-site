from rest_framework import status
from rest_framework.exceptions import APIException


class UpstreamError(APIException):
    """An integration (payment service, Skyroom, SpotPlayer) failed or did not answer in time."""

    status_code = status.HTTP_502_BAD_GATEWAY
    default_detail = 'A service we depend on is unavailable. Please try again in a few minutes.'
    default_code = 'upstream_error'
