from django.urls import path
from api.views import WorkshopViewSet, SeminarViewSet
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include


router = DefaultRouter()
router.register(r'workshops', WorkshopViewSet, basename='workshop')
router.register(r'seminars', SeminarViewSet, basename='seminar')
year_urlpatterns = router.urls




urlpatterns = [
    url(r'^(?P<year>\d{4})/', include(year_urlpatterns)),
]