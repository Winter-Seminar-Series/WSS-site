from django.urls import path
from api.views import WorkshopViewSet, SeminarViewSet, PosterSessionViewSet, SponsorshipViewSet, ClipViewSet, WSSViewSet, HoldingTeamViewSet, ImageViewSet
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include


router = DefaultRouter()
router.register(r'wss', WSSViewSet, basename='wss')
router.register(r'workshops', WorkshopViewSet, basename='workshop')
router.register(r'seminars', SeminarViewSet, basename='seminar')
router.register(r'postersessions', PosterSessionViewSet, basename='postersession')
router.register(r'sponsorships', SponsorshipViewSet, basename='sponsorship')
router.register(r'clips', ClipViewSet, basename='clips')
router.register(r'holding_teams', HoldingTeamViewSet, basename='holding_team')
router.register(r'images', ImageViewSet, basename='image')
year_urlpatterns = router.urls




urlpatterns = [
    url(r'^(?P<year>\d{4})/', include(year_urlpatterns)),
]