from django.contrib import admin

from WSS.models import Clip, WSS, Image, Sponsor, ExternalLinkType, ExternalLink

admin.site.register(WSS)
admin.site.register(Image)
admin.site.register(Clip)
admin.site.register(Sponsor)
admin.site.register(ExternalLinkType)
admin.site.register(ExternalLink)
