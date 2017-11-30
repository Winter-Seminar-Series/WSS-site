from django.shortcuts import get_object_or_404

from WSS.models import WSS,ExternalLink


class WSSWithYearMixin:
    context_object_name = 'wss'

    def get_object(self, queryset=None):
        return get_object_or_404(WSS, year=int(self.kwargs['year']))

class ExternalLinkMixin:
    def get_context_data(self,**kwargs):
        context = super().get_context_data()
        context['external_links'] = ExternalLink.objects.all()
        return context