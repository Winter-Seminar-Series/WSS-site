from django.contrib import admin
from django.urls import include, path

from common.views import HealthView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', HealthView.as_view(), name='health'),
    path('api/', include('core.urls')),
    path('api/', include('participant.urls')),
    path('api/', include('staff.urls')),
    path('api/payment/', include('payment.urls')),
    path('api/skyroom/', include('skyroom.urls')),
]
