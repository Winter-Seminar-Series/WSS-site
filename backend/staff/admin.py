from django.contrib import admin

from core.models import Event
from .models import Staff, StaffTeam, StaffTeamMember


@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation', 'get_teams', 'get_events')
    search_fields = ('name', 'designation', 'email')
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


class StaffTeamMemberInline(admin.TabularInline):
    model = StaffTeamMember
    fields = ('display_order', 'staff')
    autocomplete_fields = ('staff',)
    ordering = ('display_order', 'id')
    extra = 0
    verbose_name = 'member'
    verbose_name_plural = 'Members (shown in this order on the site, lowest number first)'


@admin.register(StaffTeam)
class StaffTeamAdmin(admin.ModelAdmin):
    inlines = (StaffTeamMemberInline,)
    list_display = ('get_name', 'display_order')
    list_editable = ('display_order',)
    ordering = ('event', 'display_order', 'id')
    list_filter = ('event', 'name',)
    search_fields = ('name', 'event__order')

    def get_name(self, obj):
        return str(obj)

    get_name.short_description = "Name"


@admin.register(StaffTeamMember)
class StaffTeamMemberAdmin(admin.ModelAdmin):
    list_display = ('staff', 'staff_team', 'display_order')
    list_editable = ('display_order',)
    ordering = ('staff_team__event', 'staff_team__display_order', 'staff_team', 'display_order', 'id')
    list_filter = ('staff_team__event', 'staff_team__name',)
    search_fields = ('staff__name',)
    autocomplete_fields = ('staff', 'staff_team',)
