from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response
from django.views.generic.detail import DetailView
from django.shortcuts import get_object_or_404
from WSS.mixins import FooterMixin
from api.serializer import WorkshopSerializer, SeminarSerializer, PosterSessionSerializer, SponsorshipSerializer, ClipSerializer, BookletSerializer, UrlSerializer
from events.models import Workshop
from WSS.models import WSS
from api.models import Url
from abc import ABC, abstractmethod


def get_wss_object_or_404(year):
    return get_object_or_404(WSS, year=year)


class WSSViewSet(viewsets.ModelViewSet):

    @action(detail=False)
    def main_image_url(self, request, year):
        wss = get_wss_object_or_404(year)
        url = Url(wss.main_image_url)
        serializer = UrlSerializer(url)
        return Response(serializer.data)


class BaseViewSet(viewsets.ViewSet, ABC):

    @property
    def serializer(self):
        raise NotImplementedError()

    @abstractmethod
    def queryset_selector(self, request, wss):
        raise NotImplementedError()

    def get_list(self, request, wss):
        queryset = self.queryset_selector(request, wss)
        serializer = self.serializer(queryset, many=True)
        return serializer.data

    def get_by_pk(self, request, wss, pk):
        queryset = self.queryset_selector(request, wss)
        entity = get_object_or_404(queryset, pk=pk)
        serializer = self.serializer(entity)
        return serializer.data

    def list(self, request, year):
        wss = get_wss_object_or_404(year)
        return Response(self.get_list(request, wss))

    def retrieve(self, request, year, pk=None):
        wss = get_wss_object_or_404(year)
        return Response(self.get_by_pk(request, wss, pk))


class WorkshopViewSet(BaseViewSet):
    serializer = WorkshopSerializer

    def queryset_selector(self, request, wss):
        return wss.workshops


class SeminarViewSet(BaseViewSet):
    serializer = SeminarSerializer

    def queryset_selector(self, request, wss):
        is_keynote = request.query_params.get("keynote", None)
        if is_keynote:
            return wss.seminars.filter(is_keynote=bool(int(is_keynote)))
        return wss.seminars


class PosterSessionViewSet(BaseViewSet):
    serializer = PosterSessionSerializer

    def queryset_selector(self, request, wss):
        return wss.postersessions


class SponsorshipViewSet(BaseViewSet):
    serializer = SponsorshipSerializer

    def queryset_selector(self, request, wss):
        is_main = request.query_params.get("main", None)
        if is_main:
            return wss.sponsorships.filter(is_main=bool(int(is_main)))
        return wss.sponsorships


class ClipViewSet(BaseViewSet):
    serializer = ClipSerializer

    def queryset_selector(self, request, wss):
        return wss.clips
