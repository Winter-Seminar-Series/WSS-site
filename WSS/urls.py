from django.conf.urls import url

from WSS.views import HomeView, SeminarsListView

urlpatterns = [
    url(r'^(?P<year>\d{4})/$', HomeView.as_view(), name='home'),
    url(r'^(?P<year>\d{4})/seminars/$',SeminarsListView.as_view(), name='seminars-list'),
    url(r'^$', HomeView.as_view(), name='home'),
]