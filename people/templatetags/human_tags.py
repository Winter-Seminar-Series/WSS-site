from django import template
from django.template.loader import render_to_string

register = template.Library()


@register.simple_tag
def render_human(human, subtitle=None, url=None):
    context = {
        'human': human,
        'subtitle': subtitle,
        'url': url,
    }
    return render_to_string('people/human.html', context=context)
