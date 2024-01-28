from django.contrib import admin

from participant.models import *
# Register your models here.
admin.site.register(Participant)
admin.site.register(ParticipantInfo)
admin.site.register(ParticipationPlan)
admin.site.register(Participation)
admin.site.register(ParticipationAttachment)
admin.site.register(ModeOfAttendance)