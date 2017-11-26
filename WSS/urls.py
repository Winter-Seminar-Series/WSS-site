from django.conf.urls import url

from WSS.views import HomeView

urlpatterns = [
    url(r'^(?P<year>\d{4})/$', HomeView.as_view(), name='home'),
    url(r'^$', HomeView.as_view(), name='home'),
]