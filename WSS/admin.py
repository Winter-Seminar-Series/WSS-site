from _ast import Suite

from django.contrib import admin
from django.contrib.admin import TabularInline
from jet.admin import CompactInline

from WSS.models import Clip, WSS, Image, Sponsor, ExternalLinkType, ExternalLink


class SponsorInline(CompactInline):
    model = Sponsor


class ExternalLinkInline(CompactInline):
    model = ExternalLink


class ImageInline(CompactInline):
    model = Image


class ClipInline(CompactInline):
    model = Clip


class WSSAdmin(admin.ModelAdmin):
    inlines = [SponsorInline, ExternalLinkInline, ImageInline, ClipInline]


admin.site.register(WSS, WSSAdmin)
admin.site.register(Sponsor)
admin.site.register(ExternalLinkType)
