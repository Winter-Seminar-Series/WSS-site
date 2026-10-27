from django.urls import path

from participant import views

urlpatterns = [
    path('sign-in/', views.SignInView.as_view(), name='sign-in'),
    path('sign-in/refresh/', views.SignInRefreshView.as_view(), name='sign-in-refresh'),
    path('sign-up/', views.SignUpView.as_view(), name='sign-up'),
    path('password-reset/', views.PasswordResetView.as_view(), name='password-reset'),
    path('password-change/', views.PasswordChangeView.as_view(), name='password-change'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('plan/<int:event_id>/', views.PlanListView.as_view(), name='plans'),
    path('workshop/<int:event_id>/', views.WorkshopPlanListView.as_view(), name='workshop-plans'),
    path('mode/<int:event_id>/', views.ModeOfAttendancePlanListView.as_view(), name='mode-plans'),
    path('participation/<int:event_id>/', views.ParticipationListView.as_view(), name='participations'),
    path('addon/<int:event_id>/', views.AddonHoldingListView.as_view(), name='addon-holdings'),
    path('attachment/<int:event_id>/', views.AttachmentListView.as_view(), name='attachments'),
    path('file/<path:file_id>/', views.FileView.as_view(), name='file'),
]
