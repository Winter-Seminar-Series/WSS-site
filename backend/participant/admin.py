import csv
from datetime import timedelta

from django.conf import settings
from django.contrib import admin, messages
from django.db import transaction
from django.db.models import Sum
from django.db.models.functions import Coalesce
from django.http import HttpResponse
from django.template.defaultfilters import filesizeformat
from django.utils import timezone
from django.utils.html import format_html

from core.admin import ExportCSVMixin
from participant.models import (
    AddonPurchase,
    CV,
    ModeOfAttendance,
    Participant,
    ParticipantInfo,
    Participation,
    ParticipationAttachment,
    ParticipationPlan,
    PlanAddon,
)
from payment.reminders import prepare_signup_reminders, send_in_background


class JoinedWithinFilter(admin.SimpleListFilter):
    title = 'signed up'
    parameter_name = 'joined_within'
    DAYS = (3, 7, 14, 30, 90, 180, 360)

    def lookups(self, request, model_admin):
        return [(str(days), f'In the last {days} days') for days in self.DAYS]

    def queryset(self, request, queryset):
        if self.value() not in {str(days) for days in self.DAYS}:
            return queryset
        return queryset.filter(user__date_joined__gte=timezone.now() - timedelta(days=int(self.value())))


@admin.register(Participant)
class ParticipantAdmin(ExportCSVMixin, admin.ModelAdmin):
    list_display = ('info', 'user', 'get_national_code', 'date_joined')
    list_select_related = ('info', 'user')
    list_filter = (JoinedWithinFilter,)
    search_fields = ('info__first_name', 'info__last_name', 'user__email', 'info__national_code',)
    actions = ['export_as_csv', 'send_signup_reminders']

    @admin.display(description='Signed up', ordering='user__date_joined')
    def date_joined(self, obj):
        return obj.user.date_joined

    @admin.action(description='Send sign-up reminders (no payment yet)', permissions=['change'])
    def send_signup_reminders(self, request, queryset):
        batch = prepare_signup_reminders(queryset)
        if batch.reminders:
            transaction.on_commit(lambda: send_in_background(batch.reminders))
        skipped = []
        if batch.joined_too_long_ago:
            skipped.append(
                f'{batch.joined_too_long_ago} signed up more than {settings.SIGNUP_REMINDER_DAYS} days ago'
            )
        if batch.started_payment:
            skipped.append(f'{batch.started_payment} already have a payment or registration for this edition')
        if batch.registration_closed:
            skipped.append(f'{batch.registration_closed}: registration is closed (no open plan)')
        if batch.too_soon:
            skipped.append(
                f'{batch.too_soon} had a reminder in the last {settings.PAYMENT_REMINDER_INTERVAL_HOURS} hours'
            )
        if batch.at_limit:
            skipped.append(f'{batch.at_limit} already had {settings.PAYMENT_REMINDER_MAX} reminder(s)')
        summary = f'Sending {len(batch.reminders)} reminder email(s) in the background.'
        if skipped:
            summary += ' Skipped people: ' + '; '.join(skipped) + '.'
        self.message_user(request, summary, messages.SUCCESS if batch.reminders else messages.WARNING)

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


@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    """CVs per edition. Read-only here: participants upload and replace their own from the dashboard. Deleting a row
    deletes its file."""

    list_display = ('user', 'participant_name', 'event', 'file_name', 'file_size', 'updated_at', 'open_file')
    list_filter = ('event',)
    list_select_related = ('user__participant__info', 'event')
    search_fields = ('user__email', 'user__participant__info__first_name', 'user__participant__info__last_name')
    date_hierarchy = 'updated_at'
    ordering = ('-updated_at',)
    raw_id_fields = ('user',)
    readonly_fields = ('user', 'event', 'file', 'file_name', 'size', 'uploaded_at', 'updated_at', 'open_file')

    def has_add_permission(self, request):
        return False

    @admin.display(description='Name')
    def participant_name(self, obj):
        info = getattr(getattr(obj.user, 'participant', None), 'info', None)
        return f'{info.first_name} {info.last_name}'.strip() if info else ''

    @admin.display(description='Size', ordering='size')
    def file_size(self, obj):
        return filesizeformat(obj.size)

    @admin.display(description='File')
    def open_file(self, obj):
        # A signed URL, minted per page view: it expires, so it is never stored.
        return format_html('<a href="{}" target="_blank" rel="noopener noreferrer">Open</a>', obj.file.url)
