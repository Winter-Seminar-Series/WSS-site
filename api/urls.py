from django.urls import path
from api.views import WorkshopViewSet, SeminarViewSet, PosterSessionViewSet, SponsorshipViewSet, ClipViewSet, WSSViewSet
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include


router = DefaultRouter()
router.register(r'workshops', WorkshopViewSet, basename='workshop')
router.register(r'seminars', SeminarViewSet, basename='seminar')
router.register(r'postersessions', PosterSessionViewSet, basename='postersession')
router.register(r'sponsorships', SponsorshipViewSet, basename='sponsorship')
router.register(r'clips', ClipViewSet, basename='clips')
router.register(r'', WSSViewSet, basename='wss')
year_urlpatterns = router.urls




urlpatterns = [
    url(r'^(?P<year>\d{4})/', include(year_urlpatterns)),
]