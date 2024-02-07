from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from core.views import EmailTokenObtainPairView, EventAPIView, SeminarAPIView, SpeakerAPIView

urlpatterns = [
    path('sign-in/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign-in/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('event/', EventAPIView.as_view(), name='events'),
    path('seminar/<int:event_id>/', SeminarAPIView.as_view(), name='seminars'),
    path('speaker/<pk>/', SpeakerAPIView.as_view(), name='speaker'),
]