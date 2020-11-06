from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from django.views.generic.detail import DetailView
from django.shortcuts import get_object_or_404
from WSS.mixins import FooterMixin
from api.serializer import WorkshopSerializer
from events.models import Workshop
from WSS.models import WSS

class WorkshopViewSet(viewsets.ViewSet, FooterMixin):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = Workshop.objects.all()
        serializer = WorkshopSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Workshop.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = WorkshopSerializer(user)
        return Response(serializer.data)

