from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from core.views import EmailTokenObtainPairView, EventAPIView, LabTalkAPIView, SeminarAPIView, SpeakerAPIView, \
    RoundTableAPIView

urlpatterns = [
    path('sign-in/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign-in/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('event/', EventAPIView.as_view(), name='events'),
    path('seminar/<int:event_id>/', SeminarAPIView.as_view(), name='seminars'),
    path('lab-talk/<int:event_id>/', LabTalkAPIView.as_view(), name='lab-talks'),
    path('round-table/<int:event_id>/', RoundTableAPIView.as_view(), name='round-tables'),
    path('speaker/<pk>/', SpeakerAPIView.as_view(), name='speaker'),
]
