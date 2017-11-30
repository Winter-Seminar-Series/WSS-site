from django.contrib import admin
from django.contrib.admin.sites import AdminSite
from jet.admin import CompactInline

from WSS.models import Clip, WSS, Image, Sponsor, ExternalLinkType, ExternalLink, Sponsorship
from events.models import Seminar, Workshop, Event


class SponsorshipInline(CompactInline):
    model = Sponsorship
    extra = 0


class ExternalLinkInline(CompactInline):
    model = ExternalLink
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
    inlines = (SeminarInline, WorkshopInline, EventInline, SponsorshipInline, ExternalLinkInline,
               ImageInline, ClipInline)
    list_display = ('__str__', 'start_date', 'end_date')


class SponsorAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'url', 'logo_tag')


admin.site.register(ExternalLinkType)
admin.site.register(Sponsor, SponsorAdmin)
admin.site.register(WSS, WSSAdmin)
admin.site.register(Image)
admin.site.register(Clip)
