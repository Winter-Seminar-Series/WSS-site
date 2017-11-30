from django.conf.urls import url

from events.views import SeminarView, WorkshopView

urlpatterns = [
    url(r'seminar/(?P<pk>\d+)/$', SeminarView.as_view(), name='seminar'),
    url(r'workshop/(?P<pk>\d+)/$', WorkshopView.as_view(), name='workshop'),
]