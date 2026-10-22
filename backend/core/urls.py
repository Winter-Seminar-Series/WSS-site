from django.urls import path

from core import views

urlpatterns = [
    path('event/', views.EventListView.as_view(), name='events'),
    path('speaker/<int:pk>/', views.SpeakerDetailView.as_view(), name='speaker'),
    path('seminar/<int:event_id>/', views.SeminarListView.as_view(), name='seminars'),
    path('lab-talk/<int:event_id>/', views.LabTalkListView.as_view(), name='lab-talks'),
    path('round-table/<int:event_id>/', views.RoundTableListView.as_view(), name='round-tables'),
    path('poster-session/image/', views.PosterSessionImageView.as_view(), name='poster-session-image'),
    path(
        'poster-session/image/create/',
        views.PosterSessionImageCreateView.as_view(),
        name='poster-session-image-create',
    ),
    path('poster-session/<int:event_id>/', views.PosterSessionListView.as_view(), name='poster-sessions'),
]
