from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response
from django.views.generic.detail import DetailView
from django.shortcuts import get_object_or_404, redirect
from WSS.mixins import FooterMixin
from api.serializer import WSSSerializer, WorkshopSerializer, SeminarSerializer, PosterSessionSerializer, SponsorshipSerializer, ClipSerializer, BookletSerializer, HoldingTeamSerializer, ImageSerializer
from events.models import Workshop
from WSS.models import WSS
from abc import ABC, abstractmethod
from django.http import JsonResponse
from WSS.payment import send_payment_request
from django.conf import settings


def get_wss_object_or_404(year: int) -> WSS:
    return get_object_or_404(WSS, year=year)


class WSSViewSet(viewsets.ViewSet):
    
    def list(self, request, year):
        wss = get_wss_object_or_404(year)
        serializer = WSSSerializer(wss)
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
    
    @action(detail=False)
    def count(self, request, year):
        wss = get_wss_object_or_404(year)
        return Response({
            "count": self.queryset_selector(request, wss).count()
        })


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


class HoldingTeamViewSet(BaseViewSet):
    serializer = HoldingTeamSerializer

    def queryset_selector(self, request, wss):
        return wss.holding_teams


class ImageViewSet(BaseViewSet):
    serializer = ImageSerializer

    def queryset_selector(self, request, wss):
        return wss.images


class ErrorResponse(JsonResponse):
    
    def __init__(self, data, status_code: int = 400):
        super().__init__(data)
        self.status_code = status_code


class PaymentViewSet(viewsets.ViewSet):

    @action(methods=['POST'], detail=False)
    def request(self, request, year):
        wss = get_wss_object_or_404(year)
        if not wss.registration_open:
            return ErrorResponse("Sorry, the registration has been ended.")
        
        amount = wss.registration_fee
        description = f"{settings.PAYMENT_SETTING['description']} {year}"
        email = request.POST.get("email")
        mobile = request.POST.get("mobile") 
        result = send_payment_request(amount, description, email, mobile)
        payment_url = settings.PAYMENT_SETTING['payment_url']

        if result.Status != 100:
            return ErrorResponse("An error occured!", status_code= result.Status)
        
        return redirect(f"{payment_url}{result.Authority}")


        