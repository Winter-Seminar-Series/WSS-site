from django.contrib import admin
from django.contrib.admin.templatetags.admin_urls import add_preserved_filters
from polymorphic.admin import PolymorphicChildModelFilter
from polymorphic.admin.parentadmin import PolymorphicParentModelAdmin

from events.models import Event, Seminar, Workshop, Venue


class EventAdmin(PolymorphicParentModelAdmin):
    base_model = Event
    child_models = (Event, Seminar, Workshop)
    list_filter = ('wss__year',)

    def add_view(self, request, form_url='', extra_context=None):
        real_admin = self._get_real_admin_by_model(Event)
        return real_admin.add_view(request, form_url, extra_context)


admin.site.register(Venue)
admin.site.register(Event, EventAdmin)
admin.site.register(Seminar)
admin.site.register(Workshop)