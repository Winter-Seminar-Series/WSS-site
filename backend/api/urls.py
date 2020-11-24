from django.urls import path
from api.views import WorkshopViewSet, SeminarViewSet, PosterSessionViewSet, SponsorshipViewSet, ClipViewSet, WSSViewSet, HoldingTeamViewSet, ImageViewSet, PaymentViewSet
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include

from api.views import RegisterAPI, LoginAPI
from knox import views as knox_views


router = DefaultRouter()
router.register(r'wss', WSSViewSet, basename='wss')
router.register(r'workshops', WorkshopViewSet, basename='workshop')
router.register(r'seminars', SeminarViewSet, basename='seminar')
router.register(r'postersessions', PosterSessionViewSet, basename='postersession')
router.register(r'sponsorships', SponsorshipViewSet, basename='sponsorship')
router.register(r'clips', ClipViewSet, basename='clips')
router.register(r'holding_teams', HoldingTeamViewSet, basename='holding_team')
router.register(r'images', ImageViewSet, basename='image')
router.register(r'payment', PaymentViewSet, basename='payment')
year_urlpatterns = router.urls

urlpatterns = [
    url(r'^(?P<year>\d{4})/', include(year_urlpatterns)),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]