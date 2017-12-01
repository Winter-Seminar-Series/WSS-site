from django.conf.urls import url
from django.views.generic.base import TemplateView

from people.views import CreatorsListView

urlpatterns = [
    url(r'^creators/$', CreatorsListView.as_view(), name='creators-list'),
]


