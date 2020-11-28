from django.urls import path
from api import views
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include

from api.views import RegisterAPI, LoginAPI
from knox import views as knox_views


year_router = DefaultRouter()
year_router.register(r'wss', views.WSSViewSet, basename='wss')
year_router.register(r'workshops', views.WorkshopViewSet, basename='workshop')
year_router.register(r'seminars', views.SeminarViewSet, basename='seminar')
year_router.register(r'postersessions', views.PosterSessionViewSet, basename='postersession')
year_router.register(r'sponsorships', views.SponsorshipViewSet, basename='sponsorship')
year_router.register(r'clips', views.ClipViewSet, basename='clips')
year_router.register(r'holding_teams', views.HoldingTeamViewSet, basename='holding_team')
year_router.register(r'images', views.ImageViewSet, basename='image')
year_router.register(r'payment', views.PaymentViewSet, basename='payment')
year_urlpatterns = year_router.urls

base_router = DefaultRouter()
base_router.register(f'profile', views.UserProfileViewSet, basename='profile')
base_urlpatterns = base_router.urls


urlpatterns = [
    url(r'^(?P<year>\d{4})/', include(year_urlpatterns)),
    url(r'', include(base_urlpatterns)),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]