from django.contrib import admin

# Register your models here.

from .models import Staff, StaffTeam, StaffTeamMember

admin.site.register(Staff)
admin.site.register(StaffTeam)
admin.site.register(StaffTeamMember)