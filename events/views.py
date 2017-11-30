# Create your views here.
from django.views.generic import DetailView

from WSS.mixins import ExternalLinkMixin
from events.models import Seminar


class SeminarView(ExternalLinkMixin,DetailView):
    template_name = 'events/seminar.html'
    context_object_name = 'seminar'
    model = Seminar