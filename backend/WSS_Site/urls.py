from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

urlpatterns = [
                  url(r'^jet/', include('jet.urls', 'jet')),
                  url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
                  path("api/admin/", admin.site.urls),
                  url(r'^api/', include(('api.urls', 'api'), namespace='api')),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = 'WSS Administration'
admin.site.site_title = 'WSS Administration'
