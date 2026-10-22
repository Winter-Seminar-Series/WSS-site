from django.urls import path

from payment import views

urlpatterns = [
    path('price/', views.PriceView.as_view(), name='payment-price'),
    path('create/', views.CreatePaymentView.as_view(), name='payment-create'),
    path('verify/<int:pk>/', views.VerifyPaymentView.as_view(), name='payment-verify'),
    path('price/group/', views.GroupPriceView.as_view(), name='group-payment-price'),
    path('create/group/', views.CreateGroupPaymentView.as_view(), name='group-payment-create'),
    path('verify/group/<int:pk>/', views.VerifyGroupPaymentView.as_view(), name='group-payment-verify'),
]
