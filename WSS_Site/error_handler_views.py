from django.views.generic import TemplateView

from WSS.mixins import FooterMixin


class Handler404View(FooterMixin, TemplateView):
    template_name = '404.html'  # It seems a bit dirty:)))
