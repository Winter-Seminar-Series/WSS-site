from django.conf.urls import url

from events.views import SeminarView, WorkshopView, PosterSessionView

urlpatterns = [
    url(r'seminar/(?P<pk>\d+)/$', SeminarView.as_view(), name='seminar'),
    url(r'workshop/(?P<pk>\d+)/$', WorkshopView.as_view(), name='workshop'),
    url(r'postersession/(?P<pk>\d+)/$', PosterSessionView.as_view(), name='postersession'),
]
