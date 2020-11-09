from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from django.views.generic.detail import DetailView
from django.shortcuts import get_object_or_404
from WSS.mixins import FooterMixin
from api.serializer import WorkshopSerializer
from events.models import Workshop
from WSS.models import WSS

def get_wss_object_or_404(year):
    return get_object_or_404(WSS, year=year)

class BaseViewSet(viewsets.ViewSet):

    def __init__(self, serializer, queryset_selector):
        self.serializer = serializer
        self.queryset_selector = queryset_selector

    def get_list(self, wss):
        queryset = self.queryset_selector(wss)
        serializer = self.serializer(queryset, many=True)
        return serializer.data
    
    def get_by_pk(self, wss, pk):
        queryset = self.queryset_selector(wss)
        entity = get_object_or_404(queryset, pk=pk)
        serializer = self.serializer(entity)
        return serializer.data
    
    def list(self, request, year):
        wss = get_wss_object_or_404(year)
        return Response(self.get_list(wss))
    
    def retrieve(self, request, year, pk=None):
        wss = get_wss_object_or_404(year)
        return Response(self.get_by_pk(wss, pk))


class WorkshopViewSet(BaseViewSet):

    def __init__(self):
        super().__init__(WorkshopSerializer, lambda wss: wss.workshops)