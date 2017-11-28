from django.conf.urls import url

from events.views import SeminarView

urlpatterns = [
    url(r'seminar/(?P<pk>\d+)/$', SeminarView.as_view(), name='seminar'),
]