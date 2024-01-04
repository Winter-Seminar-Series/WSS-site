from django.urls import path

from participant import views

urlpatterns = [
    path('sign-up/', views.ParticipantCreateAPIView.as_view(), name='Sign Up'),
]
