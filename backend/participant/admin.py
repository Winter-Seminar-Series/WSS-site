import csv

from django.contrib import admin
from django.db.models import Sum
from django.db.models.functions import Coalesce
from django.http import HttpResponse

from core.admin import ExportCSVMixin
from participant.models import (
    AddonPurchase,
    ModeOfAttendance,
    Participant,
    ParticipantInfo,
    Participation,
    ParticipationAttachment,
    ParticipationPlan,
    PlanAddon,
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


class PlanAddonInline(admin.TabularInline):
    model = PlanAddon
    extra = 0
    fields = ('name', 'description', 'price', 'discountable', 'is_open', 'capacity', 'max_per_participant')


@admin.register(ParticipationPlan)
class ParticipationPlanAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'kind', 'price', 'is_open', 'capacity')
    list_select_related = ('event', 'workshop', 'mode_of_attendance')
    list_editable = ('is_open', 'capacity')
    list_filter = ('event', 'kind', 'is_open')
    search_fields = ('workshop__name', 'mode_of_attendance__name')
    inlines = (PlanAddonInline,)


@admin.register(PlanAddon)
class PlanAddonAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'price', 'discountable', 'is_open', 'capacity', 'max_per_participant', 'sold')
    list_select_related = ('plan__event', 'plan__workshop', 'plan__mode_of_attendance')
    list_editable = ('is_open', 'capacity')
    list_filter = ('plan__event', 'is_open', 'discountable')
    search_fields = ('name',)
    autocomplete_fields = ('plan',)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(units_sold=Coalesce(Sum('purchases__quantity'), 0))

    @admin.display(description='Sold', ordering='units_sold')
    def sold(self, obj):
        return obj.units_sold


@admin.register(AddonPurchase)
class AddonPurchaseAdmin(admin.ModelAdmin):
    list_display = ('participant', 'participant_email', 'addon', 'quantity', 'date', 'payment')
    list_select_related = (
        'participant__user', 'participant__info', 'addon__plan__event', 'addon__plan__workshop',
        'addon__plan__mode_of_attendance',
    )
    list_filter = ('addon__plan__event', 'addon')
    search_fields = ('participant__user__email', 'participant__info__national_code')
    autocomplete_fields = ('participant', 'addon')
    readonly_fields = ('payment', 'date')
    actions = ['export_data']

    @admin.display(description='Email')
    def participant_email(self, obj):
        return obj.participant.user.email

    @admin.action(description='Export add-on purchases as CSV')
    def export_data(self, request, queryset):
        queryset = queryset.select_related(*self.list_select_related)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=addon_purchases.csv'
        writer = csv.writer(response)
        writer.writerow(['Email', 'First Name', 'Last Name', 'National Code', 'Phone Number', 'Add-on', 'Quantity'])
        for obj in queryset:
            info = obj.participant.info
            writer.writerow([
                obj.participant.user.email,
                info.first_name if info else '',
                info.last_name if info else '',
                info.national_code if info else '',
                info.phone_number if info else '',
                str(obj.addon),
                obj.quantity,
            ])
        return response


admin.site.register(ParticipationAttachment)
admin.site.register(ModeOfAttendance)
