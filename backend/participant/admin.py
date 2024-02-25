from django.contrib import admin
from core.admin import ExportCSVMixin

from participant.models import *
# Register your models here.
admin.site.register(Participant)
admin.site.register(ParticipantInfo)
admin.site.register(ParticipationPlan)

class ParticipationAdmin(admin.ModelAdmin, ExportCSVMixin):
    list_display = ('participant', 'plan')
    list_filter = ('plan', )
    actions = ["export_as_csv"]

admin.site.register(Participation, ParticipationAdmin)
admin.site.register(ParticipationAttachment)
admin.site.register(ModeOfAttendance)