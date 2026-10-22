from django.db import connection
from django.db.utils import DatabaseError
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthView(APIView):
    """Liveness and readiness in one: the process answers and can reach Postgres. Used by the image HEALTHCHECK."""

    authentication_classes = []
    permission_classes = [AllowAny]
    throttle_classes = []

    def get(self, request):
        try:
            connection.ensure_connection()
        except DatabaseError:
            return Response({'status': 'unavailable'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        return Response({'status': 'ok'})
