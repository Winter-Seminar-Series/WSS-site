from django.http import Http404
from django.shortcuts import get_object_or_404
from django.views.generic import ListView
from django.views.generic.detail import DetailView

from WSS.mixins import WSSWithYearMixin, ExternalLinkMixin
from WSS.models import WSS
from events.models import Seminar


class HomeView(ExternalLinkMixin,DetailView):
    template_name = 'WSS/home.html'
    context_object_name = 'wss'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['selected_seminars'] = self.object.non_keynote_seminars.order_by('?')[:8]
        return context

    def get_object(self, queryset=None):
        if 'year' in self.kwargs:
            return get_object_or_404(WSS, year=int(self.kwargs['year']))
        return WSS.objects.first()


class SeminarsListView(ExternalLinkMixin,WSSWithYearMixin, DetailView):
    template_name = 'WSS/seminars_list.html'


class WorkshopsListView(ExternalLinkMixin,WSSWithYearMixin, DetailView):
    template_name = 'WSS/workshops_list.html'


class StaffListView(ExternalLinkMixin,WSSWithYearMixin, DetailView):
    template_name = 'WSS/staff_list.html'


class GalleryView(ExternalLinkMixin,WSSWithYearMixin, DetailView):
    template_name = 'WSS/gallery.html'


class ScheduleView(ExternalLinkMixin,WSSWithYearMixin, DetailView):
    template_name = 'WSS/schedule.html'
