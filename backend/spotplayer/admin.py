from django.contrib import admin

from spotplayer.models import SpotPlayerCourse, SpotPlayerLicense, SpotPlayerCourseLicense
# Register your models here

admin.site.register(SpotPlayerCourse)
admin.site.register(SpotPlayerLicense)
admin.site.register(SpotPlayerCourseLicense)