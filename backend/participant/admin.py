from django.contrib import admin

from participant.models import *
# Register your models here.
admin.site.register(Participant)
admin.site.register(ParticipantInfo)
admin.site.register(ParticipationPlan)

class ParticipationAdmin(admin.ModelAdmin):
    list_display = ('participant', 'plan')
    list_filter = ('plan', )

admin.site.register(Participation, ParticipationAdmin)
admin.site.register(ParticipationAttachment)
admin.site.register(ModeOfAttendance)