from django.urls import path

from participant import views

urlpatterns = [
    path('sign-up/', views.ParticipantCreateAPIView.as_view(), name='sign-up'),
    path('password-reset/', views.PasswordResetAPIView.as_view(), name='password-reset'),
    path('confirm-challenger/', views.ParticipantConfirmAPIView.as_view(), name='confirm-participant'),
    path('profile/', views.ParticipantInfoRetrieveUpdateAPIView.as_view(), name='dashboard'),
    path('participation/<int:event_id>/', views.ParticipationByEventAPIView.as_view(), name='plan'),
    path('plan/<int:event_id>/', views.ParticipationPlanByEventAPIView.as_view(), name='plan'),
    path('workshop/<int:event_id>/', views.WorkshopByEventAPIView.as_view(), name='workshop'),
    path('mode/<int:event_id>/', views.ModeOfAttendanceByEventAPIView.as_view(), name='mode'),
]
