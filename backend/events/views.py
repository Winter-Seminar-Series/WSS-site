from django.views.generic import DetailView

from WSS.mixins import FooterMixin
from events.models import Seminar, Workshop, PosterSession


class SeminarView(FooterMixin, DetailView):
    template_name = 'events/seminar.html'
    context_object_name = 'seminar'
    model = Seminar

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['wss'] = self.object.wss
        return context

class PosterSessionView(FooterMixin, DetailView):
    template_name = 'events/postersession.html'
    context_object_name = 'postersession'
    model = PosterSession

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['wss'] = self.object.wss
        return context

class WorkshopView(FooterMixin, DetailView):
    template_name = 'events/workshop.html'
    context_object_name = 'workshop'
    model = Workshop

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['wss'] = self.object.wss
        return context
