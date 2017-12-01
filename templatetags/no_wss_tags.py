from django import template
from django.template.loader import render_to_string

register = template.Library()


@register.simple_tag
def no_wss_navbar():
    return render_to_string('no_wss_navbar.html')
