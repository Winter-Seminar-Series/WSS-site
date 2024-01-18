from django.urls import path

from payment import views

urlpatterns = [
    path('create/', views.PaymentRequestCreateAPIView.as_view(), name='payment-create'),
    path('verify/<int:pk>/', views.PaymentRequestVerifyAPIView.as_view(), name='payment-verify'),
]