from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from core.views import EmailTokenObtainPairView, EventAPIView, SpeakerAPIView

urlpatterns = [
    path('sign-in/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign-in/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('event/', EventAPIView.as_view(), name='events'),
    path('speaker/<pk>/', SpeakerAPIView.as_view(), name='speaker'),
]