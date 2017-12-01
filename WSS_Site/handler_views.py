from django.views.generic import TemplateView

from WSS.mixins import ExternalLinkMixin


class Handler400View(ExternalLinkMixin, TemplateView):
    template_name = '404.html'  # I know what I'm doing! BTW It seems a bit dirty:)))
