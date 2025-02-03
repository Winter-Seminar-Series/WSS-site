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

# Register your models here.
admin.site.register(Event)
admin.site.register(SubEvent)
admin.site.register(Speaker)
admin.site.register(Seminar)
admin.site.register(Workshop)
admin.site.register(WorkshopSession)
admin.site.register(RoundTable)
admin.site.register(LabTalk)
admin.site.register(PosterSession)
admin.site.register(PosterSessionImage)
