from django.contrib import admin
from django.contrib.admin.sites import AdminSite
from jet.admin import CompactInline

from WSS.models import Clip, WSS, Image, Sponsor, ExternalLinkType, ExternalLink
from events.models import Seminar, Workshop, Event


class SponsorInline(CompactInline):
    model = Sponsor
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
    inlines = (SponsorInline, SeminarInline, WorkshopInline, EventInline, ExternalLinkInline,
               ImageInline, ClipInline)
    list_display = ('__str__', 'start_date', 'end_date')


class SponsorAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'wss', 'logo_tag')
    readonly_fields = ('logo_tag',)

class ExternalLinkTypeAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'logo_tag')

admin.site.register(ExternalLinkType, ExternalLinkTypeAdmin)
admin.site.register(Sponsor, SponsorAdmin)
admin.site.register(WSS, WSSAdmin)
