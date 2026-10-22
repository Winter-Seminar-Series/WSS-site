import csv

from django.contrib import admin
from django.http import HttpResponse

from core.models import (
    Event,
    LabTalk,
    PosterSession,
    PosterSessionImage,
    RoundTable,
    Seminar,
    Speaker,
    SubEvent,
    Workshop,
    WorkshopSession,
)


class ExportCSVMixin:
    """Adds an "Export selected as CSV" action over the model's own columns."""

    @admin.action(description='Export selected as CSV')
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename={meta}.csv'
        writer = csv.writer(response)
        writer.writerow(field_names)
        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])
        return response


@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'designation')
    search_fields = ('name', 'designation')
    list_filter = ('name',)
    ordering = ('name', 'id')


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('display_str', 'id', 'starting_date', 'ending_date')
    ordering = ('-order',)

    @admin.display(description='Edition')
    def display_str(self, obj):
        return str(obj)


@admin.register(SubEvent)
class SubEventAdmin(admin.ModelAdmin):
    list_display = ('name', 'event', 'kind',)
    list_select_related = ('event',)
    search_fields = ('name', 'event__name')
    list_filter = ('kind', 'event')


@admin.register(Seminar)
class SeminarAdmin(admin.ModelAdmin):
    list_display = ('sub_event', 'event_name', 'speaker',)
    list_select_related = ('sub_event__event', 'speaker')
    autocomplete_fields = ('sub_event', 'speaker')
    search_fields = ('sub_event__name', 'speaker__name',)
    list_filter = ('sub_event__event',)

    def event_name(self, obj):
        return obj.sub_event.event if obj.sub_event else None


@admin.register(RoundTable)
class RoundTableAdmin(admin.ModelAdmin):
    list_display = ('sub_event', 'event_name', 'display_speakers',)
    list_select_related = ('sub_event__event',)
    autocomplete_fields = ('sub_event', 'speakers',)
    search_fields = ('sub_event__name', 'speakers__name',)
    list_filter = ('sub_event__event', 'speakers',)

    def event_name(self, obj):
        return obj.sub_event.event if obj.sub_event else None

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('speakers')

    @admin.display(description='Speakers')
    def display_speakers(self, obj):
        return ', '.join(speaker.name for speaker in obj.speakers.all()) or 'No speakers'


admin.site.register(Workshop)
admin.site.register(WorkshopSession)
admin.site.register(LabTalk)
admin.site.register(PosterSession)
admin.site.register(PosterSessionImage)
