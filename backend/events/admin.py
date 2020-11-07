from django.contrib import admin

from events.models import Seminar, PosterSession, Workshop, Venue, Event, SeminarMaterial, \
    WorkshopMaterial, PosterMaterial


class BaseEventAdmin(admin.ModelAdmin):
    list_filter = ('wss__year',)


admin.site.register(Venue)
admin.site.register(Event, BaseEventAdmin)
admin.site.register(SeminarMaterial)
admin.site.register(PosterMaterial)
admin.site.register(WorkshopMaterial)
admin.site.register(Seminar, BaseEventAdmin)
admin.site.register(PosterSession, BaseEventAdmin)
admin.site.register(Workshop, BaseEventAdmin)
