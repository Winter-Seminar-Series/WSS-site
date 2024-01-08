from django.urls import path
from staff import views

urlpatterns = [
    path('staff/<int:event_id>/', views.StaffTeamByEventAPIView.as_view(), name='staff-team'),
]
