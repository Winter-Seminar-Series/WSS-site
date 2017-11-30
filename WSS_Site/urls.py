from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^jet/', include('jet.urls', 'jet')),
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    url(r'^admin/', admin.site.urls),
    url(r'^', include('WSS.urls', namespace='wss')),
    url(r'^',include('events.urls',namespace='events')),
    url(r'^', include('people.urls', namespace='people')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = 'WSS Administration'
admin.site.site_title = 'WSS Administration'

handler400 = TemplateView.as_view(template_name='404.html')
