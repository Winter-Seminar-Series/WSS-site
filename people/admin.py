from django.contrib import admin
from jet.admin import CompactInline

from people.models import Staff, HoldingTeam, Speaker


class StaffInline(CompactInline):
    model = Staff
    extra = 0


class HoldingTeamInline(CompactInline):
    model = HoldingTeam
    extra = 0


class HoldingTeamAdmin(admin.ModelAdmin):
    filter_vertical = ('staff',)
    list_display = ('__str__', 'wss')
    list_filter = ('wss__year',)


admin.site.register(HoldingTeam, HoldingTeamAdmin)
admin.site.register(Staff)
admin.site.register(Speaker)
