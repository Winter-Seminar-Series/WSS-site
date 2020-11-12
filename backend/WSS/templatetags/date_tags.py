from django import template
from django.contrib.humanize.templatetags.humanize import ordinal
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def render_date(wss):
    def day_with_ordinal(day):
        ord = ordinal(day)
        return '{}<sup>{}</sup>'.format(ord[:-2], ord[-2:])

    if wss.start_date.year == wss.end_date.year:
        if wss.start_date.month == wss.end_date.month:
            format_dict = {
                'month': str(wss.start_date.strftime("%B")).upper(),
                'start_day': day_with_ordinal(wss.start_date.day),
                'end_day': day_with_ordinal(wss.end_date.day),
                'year': wss.start_date.year,
            }
            return mark_safe('{month} {start_day} - {end_day}, {year}'.format(**format_dict))
        else:
            format_dict = {
                'start_month': str(wss.start_date.strftime("%B")).upper(),
                'start_day': day_with_ordinal(wss.start_date.day),
                'end_month': str(wss.end_date.strftime("%B")).upper(),
                'end_day': day_with_ordinal(wss.end_date.day),
                'year': wss.start_date.year,
            }
        return mark_safe(
            '{start_month} {start_day} - {end_month} {end_day}, {year}'.format(**format_dict))
    else:
        format_dict = {
            'start_year': wss.start_date.year,
            'start_month': str(wss.start_date.strftime("%B")).upper(),
            'start_day': day_with_ordinal(wss.start_date.day),
            'end_year': wss.end_date.year,
            'end_month': str(wss.end_date.strftime("%B")).upper(),
            'end_day': day_with_ordinal(wss.end_date.day),
        }
        return mark_safe(
            '{start_month} {start_day} {start_year} - {end_month} {end_day} {end_year}'.format(
                **format_dict))


@register.simple_tag
def date_string(date):
    return date.strftime('%A, %d %B %Y')


@register.simple_tag
def time_string(date):
    return date.strftime('%H:%M')
