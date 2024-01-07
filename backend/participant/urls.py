from django.urls import path

from participant import views

urlpatterns = [
    path('sign-up/', views.ParticipantCreateAPIView.as_view(), name='sign-up'),
    path('password-reset/', views.PasswordResetAPIView.as_view(), name='password-reset'),
    path('profile/', views.ParticipantInfoRetrieveUpdateAPIView.as_view(), name='dashboard'),
]
