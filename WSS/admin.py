from django.contrib import admin
from jet.admin import CompactInline

from WSS.models import Clip, WSS, Image, Sponsor, ExternalLink, Sponsorship, Exhibitor, Reservatore
from events.models import Seminar, Workshop, Event


class SponsorshipInline(CompactInline):
    model = Sponsorship
    extra = 0


class ImageInline(CompactInline):
    model = Image
    extra = 0


class ClipInline(CompactInline):
    model = Clip
    extra = 0


class SeminarInline(CompactInline):
    model = Seminar
    extra = 0


class WorkshopInline(CompactInline):
    model = Workshop
    extra = 0


class EventInline(CompactInline):
    model = Event
    extra = 0


class WSSAdmin(admin.ModelAdmin):
    inlines = (SeminarInline, WorkshopInline, EventInline, SponsorshipInline, ImageInline,
               ClipInline)
    list_display = ('__str__', 'start_date', 'end_date')


class SponsorAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'url', 'logo_tag')


admin.site.register(ExternalLink)
admin.site.register(Sponsor, SponsorAdmin)
admin.site.register(WSS, WSSAdmin)
admin.site.register(Image)
admin.site.register(Clip)
admin.site.register(Exhibitor)
admin.site.register(Reservatore)
