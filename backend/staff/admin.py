from django.contrib import admin

from core.models import Event
from .models import Staff, StaffTeam, StaffTeamMember


@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation', 'get_teams', 'get_events')
    search_fields = ('name', 'designation')
    list_filter = ('events__staff_team__event', 'events__staff_team')

    def get_teams(self, obj):
        teams = obj.events.values_list('staff_team__name', flat=True).distinct()
        return ", ".join(teams)

    get_teams.short_description = "Teams"

    def get_events(self, obj):
        events = obj.events.values_list('staff_team__event', flat=True).distinct()
        event_objects = Event.objects.filter(id__in=events)
        return ", ".join(str(event) for event in event_objects)

    get_events.short_description = "Events"


@admin.register(StaffTeam)
class StaffTeamAdmin(admin.ModelAdmin):
    list_display = ('get_name',)
    list_filter = ('event', 'name',)
    search_fields = ('name', 'event__order')

    def get_name(self, obj):
        return str(obj)

    get_name.short_description = "Name"


@admin.register(StaffTeamMember)
class StaffTeamMemberAdmin(admin.ModelAdmin):
    list_display = ('staff', 'staff_team',)
    list_filter = ('staff_team__event', 'staff_team__name',)
    search_fields = ('staff__name',)
    autocomplete_fields = ('staff', 'staff_team',)
