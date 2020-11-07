from django.urls import path
from api.views import WorkshopViewSet
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include


router = DefaultRouter()
router.register(r'workshops', WorkshopViewSet, basename='user')
year_urlpatterns = router.urls




urlpatterns = [
    url(r'^(?P<year>\d{4})/', include(year_urlpatterns)),
]