from django.urls import path

from participant import views

urlpatterns = [
    path('sign-up/', views.ParticipantCreateAPIView.as_view(), name='sign-up'),
    path('password-reset/', views.PasswordResetAPIView.as_view(), name='password-reset'),
    path('password-change/', views.ParticipantPasswordChangeAPIView.as_view(), name='password-change'),
    path('profile/', views.ParticipantInfoRetrieveUpdateAPIView.as_view(), name='dashboard'),
    path('participation/<int:event_id>/', views.ParticipationByEventAPIView.as_view(), name='participation'),
    path('plan/<int:event_id>/', views.ParticipationPlanByEventAPIView.as_view(), name='plan'),
    path('workshop/<int:event_id>/', views.WorkshopByEventAPIView.as_view(), name='workshop'),
    path('mode/<int:event_id>/', views.ModeOfAttendanceByEventAPIView.as_view(), name='mode'),
    path('attachment/<int:event_id>/', views.ParticipationAttachmentByEventAPIView.as_view(), name='attachment'),
    path('file/<str:file_id>/', views.FileByIDAPIView.as_view(), name='file'),
]
