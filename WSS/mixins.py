from django.shortcuts import get_object_or_404

from WSS.models import WSS


class WSSWithYearMixin:
    context_object_name = 'wss'

    def get_object(self, queryset=None):
        return get_object_or_404(WSS, year=int(self.kwargs['year']))

