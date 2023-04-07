from django.contrib import admin

from events.models import (
    Seminar, PosterSession, Workshop, Venue, Event, SeminarMaterial,
    WorkshopMaterial, PosterMaterial, Room, LabTalk, RoundTable
)
from WSS.models import Participant


class BaseEventAdmin(admin.ModelAdmin):
    list_filter = ('wss__year',)


class WorkshopRegistrationInline(admin.TabularInline):
    model = Participant.registered_workshops.through
    extra = 0


class WorkshopAdmin(BaseEventAdmin):
    readonly_fields = ('remaining_capacity',)
    inlines = (WorkshopRegistrationInline,)


admin.site.register(Venue)
admin.site.register(Event, BaseEventAdmin)
admin.site.register(SeminarMaterial)
admin.site.register(PosterMaterial)
admin.site.register(WorkshopMaterial)
admin.site.register(Seminar, BaseEventAdmin)
admin.site.register(PosterSession, BaseEventAdmin)
admin.site.register(Workshop, WorkshopAdmin)
admin.site.register(Room)
admin.site.register(LabTalk)
admin.site.register(RoundTable)
