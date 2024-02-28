from django.contrib import admin
from datetime import datetime, timedelta

from skyroom.models import *
from core.models import Seminar, Event
# Register your models here.
admin.site.register(SkyroomRoom)

class SkyroomEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'room', 'starting_time', 'duration', 'tolerance')
    actions = ['create_from_seminars']

    def create_from_seminars(self, request, queryset):
        room = SkyroomRoom.objects.first()
        plan = ParticipationPlan.objects.first()
        if room is None:
            self.message_user(request, "No Skyroom room found", level='ERROR')
            return
        event_seminars = Seminar.objects.filter(sub_event__event=Event.objects.last()).order_by('sub_event__date', 'sub_event__starting_time')
        for seminar in event_seminars:
            seminar_datetime = datetime.combine(seminar.sub_event.date, seminar.sub_event.starting_time)
            ending_datetime = datetime.combine(seminar.sub_event.date, seminar.sub_event.ending_time)
            seminar_duration = ending_datetime - seminar_datetime
            SkyroomEvent.objects.create(
                title=seminar.sub_event.name,
                description=seminar.sub_event.description,
                room=room,
                starting_time=seminar_datetime,
                duration=seminar_duration,
                tolerance=timedelta(minutes=10),
            ).plans.add(plan)

admin.site.register(SkyroomEvent, SkyroomEventAdmin)