from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.generic.detail import DetailView

from WSS.mixins import ExternalLinkMixin, WSSWithYearMixin
from WSS.models import WSS


class HomeView(ExternalLinkMixin, DetailView):
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


class SeminarsListView(ExternalLinkMixin, DetailView):
    template_name = 'WSS/seminars_list.html'
    model = WSS
    context_object_name = 'wss'

    def get_object(self, queryset=None):
        return get_object_or_404(WSS, year=int(self.kwargs['year']))


class WorkshopsListView(ExternalLinkMixin, DetailView):
    template_name = 'WSS/workshops_list.html'
    model = WSS
    context_object_name = 'wss'

    def get_object(self, queryset=None):
        return get_object_or_404(WSS, year=int(self.kwargs['year']))


class StaffListView(ExternalLinkMixin, DetailView):
    template_name = 'WSS/staff_list.html'
    model = WSS
    context_object_name = 'wss'

    def get_object(self, queryset=None):
        return get_object_or_404(WSS, year=int(self.kwargs['year']))


class GalleryImageView(ExternalLinkMixin, WSSWithYearMixin, DetailView):
    template_name = 'WSS/gallery_images.html'


class GalleryVideoView(ExternalLinkMixin, WSSWithYearMixin, DetailView):
    template_name = 'WSS/gallery_videos.html'


@method_decorator(login_required, name='dispatch')
class ScheduleView(ExternalLinkMixin, WSSWithYearMixin, DetailView):
    template_name = 'WSS/schedule.html'
