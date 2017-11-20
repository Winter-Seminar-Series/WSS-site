from django.contrib import admin
from jet.admin import CompactInline
from polymorphic.admin import PolymorphicParentModelAdmin
from polymorphic.admin.filters import PolymorphicChildModelFilter

from events.models import Speaker
from staff.models import Human, Staff, HoldingTeam


class StaffInline(CompactInline):
    model = Staff
    extra = 0


class HoldingTeamInline(CompactInline):
    model = HoldingTeam
    extra = 0




class HoldingTeamAdmin(admin.ModelAdmin):
    filter_vertical = ('staff',)

admin.site.register(HoldingTeam, HoldingTeamAdmin)
admin.site.register(Staff)
