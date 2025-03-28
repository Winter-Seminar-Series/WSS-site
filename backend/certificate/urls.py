from django.urls import path

from certificate.views import CertificateAPIView

urlpatterns = [
    path('certificate/<int:event_id>/', CertificateAPIView.as_view(), name='certificate_view'),
]
