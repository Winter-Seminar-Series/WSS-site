# Create your views here.
from django.views.generic import DetailView

from events.models import Seminar


class SeminarView(DetailView):
    template_name = 'events/seminar.html'
    context_object_name = 'seminar'
    model = Seminar