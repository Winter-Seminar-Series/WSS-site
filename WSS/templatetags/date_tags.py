from django import template
from django.contrib.humanize.templatetags.humanize import ordinal
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def render_date(wss):
    def day_with_ordinal(day):
        ord = ordinal(day)
        return '{}<sup>{}</sup>'.format(ord[:-2], ord[-2:])

    if wss.start_date.month == wss.end_date.month:
        format_dict = {
            'month': str(wss.start_date.strftime("%B")).upper(),
            'start_day': day_with_ordinal(wss.start_date.day),
            'end_day': day_with_ordinal(wss.end_date.day),
            'year': wss.start_date.year,
        }
        return mark_safe('{month}, {start_day} - {end_day}, {year}'.format(**format_dict))
    else:
        raise NotImplemented()