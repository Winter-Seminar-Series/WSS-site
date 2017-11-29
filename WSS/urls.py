from django.conf.urls import url, include

from WSS.views import HomeView, SeminarsListView, WorkshopsListView, StaffListView

year_urlpatterns = [
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^seminars/$',SeminarsListView.as_view(), name='seminars-list'),
    url(r'^workshops/$',WorkshopsListView.as_view(), name='workshops-list'),
    url(r'^staff/$', StaffListView.as_view(), name='staff-list'),
]

urlpatterns = [
    url(r'^(?P<year>\d{4})/', include(year_urlpatterns)),
    url(r'^$', HomeView.as_view(), name='home'),
]

