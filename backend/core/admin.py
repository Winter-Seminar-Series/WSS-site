from django.contrib import admin
from django.http import HttpResponse
import csv

from core.models import *


class ExportCSVMixin:
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)
        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])
        return response

    export_as_csv.short_description = "Export Selected As CSV"


@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'designation')
    search_fields = ('name', 'designation')
    list_filter = ('name',)
    ordering = ('name', 'id')


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('display_str', 'wss_order', 'starting_date', 'ending_date')

    def display_str(self, obj):
        return str(obj)

    def wss_order(self, obj):
        return obj.id


@admin.register(SubEvent)
class SubEventAdmin(admin.ModelAdmin):
    list_display = ('name', 'event', 'kind',)
    search_fields = ('name', 'event__name')
    list_filter = ('kind', 'event')


@admin.register(Seminar)
class SeminarAdmin(admin.ModelAdmin):
    list_display = ('sub_event', 'event_name', 'speaker',)
    autocomplete_fields = ('sub_event', 'speaker')
    search_fields = ('sub_event__name', 'speaker__name',)
    list_filter = ('sub_event__event',)

    def event_name(self, obj):
        return obj.sub_event.event if obj.sub_event else None


@admin.register(RoundTable)
class RoundTableAdmin(admin.ModelAdmin):
    list_display = ('sub_event', 'event_name', 'display_speakers',)
    autocomplete_fields = ('sub_event', 'speakers',)
    search_fields = ('sub_event__name', 'speakers__name',)
    list_filter = ('sub_event__event', 'speakers',)

    def event_name(self, obj):
        return obj.sub_event.event if obj.sub_event else None

    def display_speakers(self, obj):
        return ", ".join([speaker.name for speaker in obj.speakers.all()]) if obj.speakers.exists() else "No Speakers"

    display_speakers.short_description = "Speakers"


# Register your models here.


admin.site.register(Workshop)
admin.site.register(WorkshopSession)
admin.site.register(LabTalk)
admin.site.register(PosterSession)
admin.site.register(PosterSessionImage)
