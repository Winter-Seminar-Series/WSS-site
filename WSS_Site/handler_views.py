from django.views.generic import TemplateView

from WSS.mixins import ExternalLinkMixin


class Handler404View(ExternalLinkMixin, TemplateView):
    template_name = '404.html'  # It seems a bit dirty:)))
