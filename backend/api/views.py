from rest_framework.decorators import action
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.views.generic.detail import DetailView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.conf import settings
from abc import ABC, abstractmethod
from api import serializers
from events.models import Workshop, WssTag
from WSS.models import WSS, Participant, UserProfile
from WSS.payment import send_payment_request, verify

from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from django.contrib.auth import login
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth.models import User


def get_wss_object_or_404(year: int) -> WSS:
    return get_object_or_404(WSS, year=year)


class WSSViewSet(viewsets.ViewSet):
    
    def list(self, request, year):
        wss = get_wss_object_or_404(year)
        serializer = serializers.WSSSerializer(wss)
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
    serializer = serializers.WorkshopSerializer

    def queryset_selector(self, request, wss):
        return wss.workshops


class SeminarViewSet(BaseViewSet):
    serializer = serializers.SeminarSerializer

    def queryset_selector(self, request, wss):
        is_keynote = request.query_params.get("keynote", None)
        if is_keynote:
            return wss.seminars.filter(is_keynote=bool(int(is_keynote)))
        return wss.seminars


class PosterSessionViewSet(BaseViewSet):
    serializer = serializers.PosterSessionSerializer

    def queryset_selector(self, request, wss):
        return wss.postersessions


class SponsorshipViewSet(BaseViewSet):
    serializer = serializers.SponsorshipSerializer

    def queryset_selector(self, request, wss):
        is_main = request.query_params.get("main", None)
        if is_main:
            return wss.sponsorships.filter(is_main=bool(int(is_main)))
        return wss.sponsorships


class ClipViewSet(BaseViewSet):
    serializer = serializers.ClipSerializer

    def queryset_selector(self, request, wss):
        return wss.clips


class HoldingTeamViewSet(BaseViewSet):
    serializer = serializers.HoldingTeamSerializer

    def queryset_selector(self, request, wss):
        return wss.holding_teams


class ImageViewSet(BaseViewSet):
    serializer = serializers.ImageSerializer

    def queryset_selector(self, request, wss):
        return wss.images


class ErrorResponse(Response):
    
    def __init__(self, data, status_code: int = 400):
        super().__init__(data)
        self.status_code = status_code


class UserProfileViewSet(viewsets.ViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer = serializers.UserProfileSerializer

    def list(self, request):
        user_profile: UserProfile = request.user.profile
        serializer = self.serializer(user_profile)
        return Response(serializer.data)
    
    @action(methods=['PUT'], detail=False)
    def edit(self, request):
        user_profile: UserProfile = request.user.profile
        user_data_parameter = request.data

        fields = ['first_name', 'last_name', 'phone_number', 'age'
                  'job', 'university', 'introduction_method',
                  'gender', 'city', 'country', 'field_of_interest',
                  'grade', 'is_student']

        for field in fields:
            if user_data_parameter.get(field):
                setattr(user_profile, field, user_data_parameter[field])
        
        user_profile.save()
        request.user.save()
        return Response(self.serializer(user_profile).data)
    
    @action(methods=['POST'], detail=False)
    def add_favorite_tag(self, request):
        user_profile: UserProfile = request.user.profile

        wss = get_wss_object_or_404(year=request.query_params.get('year'))
        tag = wss.tag.get(pk=request.query_params.get('tag'))

        if tag in user_profile.favorite_tags.all():
            return ErrorResponse({
                "message": "this tag is already in your list!"
            })

        user_profile.favorite_tags.add(tag)
        user_profile.save()

        return Response(self.serializer(user_profile).data)
    
    @action(methods=['DELETE'], detail=False)
    def remove_favorite_tag(self, request):
        user_profile: UserProfile = request.user.profile
        tag_pk = request.query_params.get('tag')

        tag = WssTag.objects.get(pk=tag_pk)

        user_profile.favorite_tags.remove(tag)
        user_profile.save()

        return Response(self.serializer(user_profile).data)


class TagsViewSet(BaseViewSet):
    serializer = serializers.WssTagSerializer

    def queryset_selector(self, request, wss):
        return wss.tag


class PaymentViewSet(viewsets.ViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @action(methods=['GET'], detail=False)
    def request(self, request, year):
        wss = get_wss_object_or_404(year)
        if not wss.registration_open:
            return ErrorResponse({
                'message': "Sorry, the registration has been ended."
            })
        
        callback_url = request.query_params.get("callback", None)

        if callback_url is None:
            return ErrorResponse({
                'message': "`callback` should be passed in query string"
            })
        
        user_profile: UserProfile = request.user.profile

        if user_profile.participants.filter(current_wss=wss).count() != 0:
            return ErrorResponse({
                "message": "You already have finished your payment."
            })  
        
        amount = wss.registration_fee
        description = f"{settings.PAYMENT_SETTING['description']} {year}"

        result = send_payment_request(callback_url, amount, description)

        if result.Status != 100:
            return ErrorResponse({
                'message': "An error occured!",
                'code': result.Status
            })

        payment_url = settings.PAYMENT_SETTING['payment_url']

        return Response({
            "redirect_url": f"{payment_url}{result.Authority}"
        })
    

    @action(methods=['GET'], detail=False)
    def verify(self, request, year):
        wss = get_wss_object_or_404(year)
        if not wss.registration_open:
            return ErrorResponse({
                'message': "Sorry, the registration has been ended."
            })
        
        user_profile = request.user.profile

        if user_profile.participants.filter(current_wss=wss).count() != 0:
            return ErrorResponse({
                "message": "You already have finished your payment."
            })        

        if request.GET.get('Status') == 'OK':
            amount = wss.registration_fee
            result = verify(request.GET['Authority'], amount)
            
            if result.Status == 100:
                participant = Participant(current_wss=wss, user_profile=user_profile,
                                          payment_ref_id=str(result.RefID), payment_amount=amount)
                participant.save()
                
                return Response({
                    "message": 'OK',
                    "RefID": result.RefID
                })
            
            if result.Status == 101:
                return ErrorResponse({'status': 'ALREADY SUBMITTED'})
            
            return ErrorResponse({
                'message': 'FAILED',
                'status': result.Status
            })
        

        return ErrorResponse({
            'message': 'FAILED|CANCELLED'
        })
            
            
class RegisterAPI(generics.GenericAPIView):
    serializer_class = serializers.RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        # email field in User isn't unique & setting it manually caused failure in CI, so ...
        if User.objects.filter(email=request.data['email']).exists():
            return Response({
                "email": ["user with this email address already exists."]
            }, status=400)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": serializers.UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)
