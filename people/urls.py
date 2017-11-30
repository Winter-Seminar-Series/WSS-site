from django.conf.urls import url, handler404
from django.views.generic.base import TemplateView

from people.views import CreatorsListView

handler404 = TemplateView()

urlpatterns = [
    url(r'^creators/', CreatorsListView.as_view(), name='creators-list'),
]

