from django.urls import path

from participant.api import views

urlpatterns = [
    path('SignUp-user/', views.ParticipantCreateAPIView.as_view(), name='Sign Up'),
]
