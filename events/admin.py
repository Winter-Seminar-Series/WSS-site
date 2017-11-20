from django.contrib import admin
from polymorphic.admin.parentadmin import PolymorphicParentModelAdmin

from events.models import Seminar, Workshop, Venue, Event, Material, SeminarMaterial, \
    WorkshopMaterial


class BaseEventAdmin(admin.ModelAdmin):
    list_filter = ('wss__year',)


admin.site.register(Venue)
admin.site.register(Event, BaseEventAdmin)
admin.site.register(SeminarMaterial)
admin.site.register(WorkshopMaterial)
admin.site.register(Seminar, BaseEventAdmin)
admin.site.register(Workshop, BaseEventAdmin)