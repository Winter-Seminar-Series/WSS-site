from django.contrib import admin
from core.admin import ExportCSVMixin

from participant.models import *


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin, ExportCSVMixin):
    list_display = ('info', 'user', 'get_national_code')
    search_fields = ('info__first_name', 'info__last_name', 'user__email', 'info__national_code',)

    def get_national_code(self, obj):
        return obj.info.national_code

    get_national_code.short_description = "National Code"


@admin.register(Participation)
class ParticipationAdmin(admin.ModelAdmin, ExportCSVMixin):
    list_display = ('participant', 'participant_email', 'plan')
    list_filter = ('plan', 'plan__event__order',)
    autocomplete_fields = ('participant', 'info',)
    search_fields = ('participant__user__email', 'participant__info__national_code',)
    actions = ["export_as_csv"]

    def participant_email(self, obj):
        return obj.participant.user.email if obj.participant and obj.participant.user else ""

    participant_email.short_description = "Email"


@admin.register(ParticipantInfo)
class ParticipantInfoAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'national_code')
    search_fields = ('first_name', 'last_name',)

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


admin.site.register(ParticipationPlan)
admin.site.register(ParticipationAttachment)
admin.site.register(ModeOfAttendance)
