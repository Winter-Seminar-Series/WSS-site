from django.contrib import admin
from jet.admin import CompactInline

from WSS.models import Clip, Booklet, WSS, Image, Sponsor, ExternalLink, Sponsorship, Grade, Participant, UserProfile, \
    ShortLink, Reserve, WssTag, Announcement
from events.models import Seminar, Workshop, PosterSession, Event
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin
from events.admin import WorkshopRegistrationInline


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
    readonly_fields = ('remaining_capacity',)
    model = Workshop
    extra = 0


class EventInline(CompactInline):
    model = Event
    extra = 0

class GradeInline(CompactInline):
    model = Grade
    extra = 0


class ParticipantAdmin(admin.ModelAdmin):
    readonly_fields = ('payment_timestamp',)
    inlines = (WorkshopRegistrationInline, )


class AnnouncementAdmin(admin.ModelAdmin):
    readonly_fields = ('create_timestamp', 'last_modify_timestamp')


class ReserveInline(CompactInline):
    model = Reserve
    extra = 0


class TagInline(CompactInline):
    model = WssTag
    extra = 0


class WSSAdmin(admin.ModelAdmin):
    inlines = (SeminarInline, PosterSessionInline, WorkshopInline, EventInline, SponsorshipInline, ImageInline,
               ClipInline, BookletInline, TagInline)
    readonly_fields = ('bs_participant_count', 'ms_participant_count', 'phd_participant_count')
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
admin.site.register(Participant, ParticipantAdmin)
admin.site.register(Announcement, AnnouncementAdmin)
admin.site.register(ShortLink)
admin.site.register(Reserve)
admin.site.register(Grade)
admin.site.register(WssTag)
# unregister old user admin
admin.site.unregister(User)
# register new user admin
admin.site.register(User, UserAdmin)
