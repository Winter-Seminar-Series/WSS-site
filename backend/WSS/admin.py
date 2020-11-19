from django.contrib import admin
from jet.admin import CompactInline

from WSS.models import Clip, Booklet, WSS, Image, Sponsor, ExternalLink, Sponsorship, Grade, Participant, UserProfile, ShortLink, Reserve
from events.models import Seminar, Workshop, PosterSession, Event
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin


class SponsorshipInline(CompactInline):
    model = Sponsorship
    extra = 0


class ImageInline(CompactInline):
    model = Image
    extra = 0


class ClipInline(CompactInline):
    model = Clip
    extra = 0

class BookletInline(CompactInline):
    model = Booklet
    extra = 0


class SeminarInline(CompactInline):
    model = Seminar
    extra = 0

class PosterSessionInline(CompactInline):
    model = PosterSession
    extra = 0


class WorkshopInline(CompactInline):
    model = Workshop
    extra = 0


class EventInline(CompactInline):
    model = Event
    extra = 0

class GradeInline(CompactInline):
    model = Grade
    extra = 0


class ParticipateInline(CompactInline):
    model = Participant
    extra = 0


class ReserveInline(CompactInline):
    model = Reserve
    extra = 0



class WSSAdmin(admin.ModelAdmin):
    inlines = (SeminarInline, PosterSessionInline, WorkshopInline, EventInline, SponsorshipInline, ImageInline,
               ClipInline, BookletInline)
    list_display = ('__str__', 'start_date', 'end_date')


class SponsorAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'url', 'logo_tag')


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    max_num = 1
    can_delete = False

class UserAdmin(AuthUserAdmin):
    inlines = [UserProfileInline]



admin.site.register(ExternalLink)
admin.site.register(Sponsor, SponsorAdmin)
admin.site.register(WSS, WSSAdmin)
admin.site.register(Image)
admin.site.register(Clip)
admin.site.register(Booklet)
admin.site.register(Participant)
admin.site.register(ShortLink)
admin.site.register(Reserve)
admin.site.register(Grade)

# unregister old user admin
admin.site.unregister(User)
# register new user admin
admin.site.register(User, UserAdmin)
