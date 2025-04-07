from django.contrib import admin
from datetime import datetime, timedelta

from django.db.models import Max

from skyroom.models import *
from core.models import Seminar, Event, RoundTable

# Register your models here.
admin.site.register(SkyroomRoom)


class SkyroomEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'room', 'starting_time', 'duration', 'tolerance')
    actions = ['create_events']

    def create_events(self, request, queryset):
        from itertools import chain

        rooms = list(SkyroomRoom.objects.all())
        latest_order = Event.objects.aggregate(Max('order'))['order__max']

        plans = ParticipationPlan.objects.filter(
            event__order=latest_order
        ).order_by('-id')[:3]

        if not rooms:
            self.message_user(request, "No Skyroom rooms found", level='ERROR')
            return

        if not plans:
            self.message_user(request, "No participation plans found", level='ERROR')
            return

        event_seminars = Seminar.objects.filter(
            sub_event__event=Event.objects.last()
        ).order_by('sub_event__date', 'sub_event__starting_time')

        event_roundTables = RoundTable.objects.filter(
            sub_event__event=Event.objects.last()
        ).order_by('sub_event', 'sub_event__starting_time')

        room_count = len(rooms)

        combined_events = list(chain(event_seminars, event_roundTables))
        combined_events.sort(key=lambda e: (e.sub_event.date, e.sub_event.starting_time))

        for index, event in enumerate(combined_events):
            seminar_datetime = datetime.combine(event.sub_event.date, event.sub_event.starting_time)
            ending_datetime = datetime.combine(event.sub_event.date, event.sub_event.ending_time)
            seminar_duration = ending_datetime - seminar_datetime

            room = rooms[index % room_count]

            if hasattr(event, 'speaker') and event.speaker:
                title = f"{event.speaker.name} | {event.sub_event.name}"
            else:
                title = f"RoundTable | {event.sub_event.name}"

            skyroom_event = SkyroomEvent.objects.create(
                title=title,
                description=event.sub_event.description,
                room=room,
                starting_time=seminar_datetime,
                duration=seminar_duration + timedelta(minutes=30),
                tolerance=timedelta(days=7),
            )

            for plan in plans:
                skyroom_event.plans.add(plan)


admin.site.register(SkyroomEvent, SkyroomEventAdmin)
