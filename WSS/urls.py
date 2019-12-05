from django.conf.urls import url, include

import WSS
from WSS.views import HomeView, SeminarsListView, WorkshopsListView, StaffListView, \
    GalleryImageView, RegisterView, \
    ScheduleView, ReserveView, GalleryVideoView

year_urlpatterns = [
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^seminars/$', SeminarsListView.as_view(), name='seminars-list'),
    url(r'^workshops/$', WorkshopsListView.as_view(), name='workshops-list'),
    url(r'^staff/$', StaffListView.as_view(), name='staff-list'),
    url(r'^gallery/images/$', GalleryImageView.as_view(), name='gallery-image'),
    url(r'^gallery/videos/$', GalleryVideoView.as_view(), name='gallery-video'),
    url(r'^schedule/$', ScheduleView.as_view(), name='schedule'),
    url(r'^register/$', RegisterView.as_view(), name='register'),
    url(r'^signup/$', WSS.views.send_request, name='register'),
    url(r'^reserve/$', ReserveView.as_view(), name='reserve'),
    url(r'^go/(?P<url>\w+)/$', WSS.views.go, name='go'),
    url(r'^verify/(?P<email>([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$))$', WSS.views.verify, name='go'),
]

urlpatterns = [
    url(r'^(?P<year>\d{4})/', include(year_urlpatterns)),
    url(r'^$', HomeView.as_view(), name='home'),
]
