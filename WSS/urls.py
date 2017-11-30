from django.conf.urls import url, include

from WSS.views import HomeView, SeminarsListView, WorkshopsListView, StaffListView, GalleryImageView, GalleryVideoView

year_urlpatterns = [
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^seminars/$',SeminarsListView.as_view(), name='seminars-list'),
    url(r'^workshops/$',WorkshopsListView.as_view(), name='workshops-list'),
    url(r'^staff/$', StaffListView.as_view(), name='staff-list'),
    url(r'^gallery/images/$', GalleryImageView.as_view(), name='gallery-image'),
    url(r'^gallery/videos/$', GalleryVideoView.as_view(), name='gallery-video'),
    url(r'^schedule/$', ScheduleView.as_view(), name='gallery'),
]

urlpatterns = [
    url(r'^(?P<year>\d{4})/', include(year_urlpatterns)),
    url(r'^$', HomeView.as_view(), name='home'),
]

