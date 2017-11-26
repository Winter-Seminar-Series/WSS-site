from django.shortcuts import get_object_or_404
from django.views.generic.detail import DetailView

from WSS.models import WSS


class HomeView(DetailView):
    template_name = 'WSS/home.html'
    context_object_name = 'wss'

    def get_object(self, queryset=None):
        if 'year' in self.kwargs:
            return get_object_or_404(WSS, year=int(self.kwargs['year']))
        return WSS.objects.first()
