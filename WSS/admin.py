from django.contrib import admin
from jet.admin import CompactInline

from WSS.models import Clip, WSS, Image, Sponsor, ExternalLinkType, ExternalLink
from events.models import Seminar, Workshop, Speaker


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


class WSSAdmin(admin.ModelAdmin):
    inlines = [SponsorInline, ExternalLinkInline, ImageInline, ClipInline, SeminarInline, WorkshopInline]

admin.site.register(WSS, WSSAdmin)
admin.site.register(Sponsor)
admin.site.register(ExternalLinkType)
admin.site.register(Speaker)