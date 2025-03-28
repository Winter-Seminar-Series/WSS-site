from rest_framework import generics

from certificate.models import Certificate
from certificate.serializers import CertificateSerializer


class CertificateAPIView(generics.ListAPIView):
    serializer_class = CertificateSerializer

    def get_queryset(self):
        current_user = self.request.user

        return Certificate.objects.filter(
            participation__participant__user=current_user,
            participation__plan__event=self.kwargs['event_id'],
        )
