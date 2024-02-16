from django.urls import path

from skyroom import views

urlpatterns = [
    path('list/', views.SkyroomEventsView.as_view(), name='skyroom-list'),
    path('link/<int:pk>/', views.SkyroomEventLinkView.as_view(), name='skyroom-link'),
]