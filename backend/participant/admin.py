import csv

from django.contrib import admin
from django.http import HttpResponse

from core.admin import ExportCSVMixin
from participant.models import (
    ModeOfAttendance,
    Participant,
    ParticipantInfo,
    Participation,
    ParticipationAttachment,
    ParticipationPlan,
)


@admin.register(Participant)
class ParticipantAdmin(ExportCSVMixin, admin.ModelAdmin):
    list_display = ('info', 'user', 'get_national_code')
    list_select_related = ('info', 'user')
    search_fields = ('info__first_name', 'info__last_name', 'user__email', 'info__national_code',)
    actions = ['export_as_csv']

    @admin.display(description='National code')
    def get_national_code(self, obj):
        return obj.info.national_code if obj.info else ''


@admin.register(Participation)
class ParticipationAdmin(admin.ModelAdmin):
    list_display = ('participant', 'participant_email', 'plan')
    list_select_related = ('participant__user', 'participant__info', 'plan__event', 'plan__workshop',
                           'plan__mode_of_attendance')
    list_filter = ('plan', 'plan__event__order',)
    autocomplete_fields = ('participant', 'info',)
    search_fields = ('participant__user__email', 'participant__info__national_code',)
    actions = ["export_data"]

    def participant_email(self, obj):
        return obj.participant.user.email if obj.participant and obj.participant.user else ""

    participant_email.short_description = "Email"

    def export_data(self, request, queryset):
        queryset = queryset.select_related(*self.list_select_related)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=participation_data.csv'
        writer = csv.writer(response)

        headers = [
            'Participation Id',
            'Email',
            'First Name',
            'Last Name',
            'National Code',
            'Phone Number',
            'Plan'
        ]
        writer.writerow(headers)

        for obj in queryset:
            row = [
                obj.id if obj.id else '',
                obj.participant.user.email if obj.participant and obj.participant.user else '',
                obj.participant.info.first_name if obj.participant and obj.participant.info else '',
                obj.participant.info.last_name if obj.participant and obj.participant.info else '',
                obj.participant.info.national_code if obj.participant and obj.participant.info else '',
                obj.participant.info.phone_number if obj.participant and obj.participant.info else '',
                str(obj.plan) if obj.plan else ''
            ]
            writer.writerow(row)

        return response

    export_data.short_description = "Export Registration Data As CSV"


@admin.register(ParticipantInfo)
class ParticipantInfoAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'national_code')
    search_fields = ('first_name', 'last_name',)

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


@admin.register(ParticipationPlan)
class ParticipationPlanAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'kind', 'price', 'is_open', 'capacity')
    list_select_related = ('event', 'workshop', 'mode_of_attendance')
    list_editable = ('is_open', 'capacity')
    list_filter = ('event', 'kind', 'is_open')


admin.site.register(ParticipationAttachment)
admin.site.register(ModeOfAttendance)
