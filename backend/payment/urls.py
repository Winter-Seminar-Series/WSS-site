from django.urls import path

from payment import views

urlpatterns = [
    path('price/', views.PaymentRequestPriceAPIView.as_view(), name='payment-price'),
    path('create/', views.PaymentRequestCreateAPIView.as_view(), name='payment-create'),
    path('verify/<int:pk>/', views.PaymentRequestVerifyAPIView.as_view(), name='payment-verify'),
    path('price/group/', views.GroupPaymentRequestPriceAPIView.as_view(), name='group-payment-price'),
    path('create/group/', views.GroupPaymentRequestCreateAPIView.as_view(), name='group-payment-create'),
    path('verify/group/<int:pk>/', views.GroupPaymentRequestVerifyAPIView.as_view(), name='group-payment-verify'),
]