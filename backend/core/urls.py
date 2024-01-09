from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from core.views import EmailTokenObtainPairView
from core.views import EventAPIView

urlpatterns = [
    path('sign-in/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign-in/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('event/', EventAPIView.as_view(), name='events'),
]