from rest_framework.decorators import action
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from knox.auth import TokenAuthentication

from django.views.generic.detail import DetailView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.conf import settings
from abc import ABC, abstractmethod
from api import serializers
from events.models import Workshop, WssTag, Venue, SeminarMaterial, PosterMaterial, WorkshopMaterial, BaseEvent
from people.models import Speaker, Staff
from WSS.models import WSS, Participant, UserProfile, Sponsor, GradeDoesNotSpecifiedException
from WSS.payment import send_payment_request, verify

from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from django.contrib.auth import login
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth.models import User

import threading
from django.core.mail import send_mail
from templates.consts import *

from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created


def get_wss_object_or_404(year: int) -> WSS:
    return get_object_or_404(WSS, year=year)


def get_user_profile(user: User) -> UserProfile:
    if UserProfile.objects.filter(user=user).count() > 0:
        return user.profile
    return UserProfile.objects.create(user=user)


class ErrorResponse(Response):
    
    def __init__(self, data, status_code: int = 400):
        super().__init__(data)
        self.status_code = status_code


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


class EventViewSet(BaseViewSet, ABC):
    authentication_classes = [TokenAuthentication]

    @staticmethod
    def user_is_participant(user: User, wss: WSS, pk: int) -> bool:
        return user.is_authenticated and not user.is_anonymous and wss.participants.filter(user_profile=get_user_profile(user)).count() == 1

    def get_list(self, request, wss):
        queryset = self.queryset_selector(request, wss)
        serializer = self.serializer(queryset, many=True, serialize_link=False)
        return serializer.data

    def get_by_pk(self, request, wss, pk):
        queryset = self.queryset_selector(request, wss)
        event: BaseEvent = get_object_or_404(queryset, pk=pk)
        serializer = self.serializer(event, serialize_link=False)
        return serializer.data

    @action(methods=['GET'], detail=True)
    def open_webinar(self, request, year, pk):
        wss = get_wss_object_or_404(year)

        events = self.queryset_selector(request, wss)
        event: BaseEvent = get_object_or_404(events, pk=pk)

        if not self.user_is_participant(request.user, wss, pk):
            return ErrorResponse({
                "message": "You have not access to this webinar"
            }, status_code=403)

        if not event.is_available:
            return ErrorResponse({
                "message": "This webinar is currently unavailable"
            })

        return Response({
            "redirect_url": event.link
        })


class WorkshopViewSet(EventViewSet):
    serializer = serializers.WorkshopSerializer

    @staticmethod
    def user_is_registered_workshop(user, wss, pk):
        return wss.participants.get(user_profile=user.profile)\
            .registered_workshops.filter(pk=pk).count() > 0

    @staticmethod
    def user_is_participant(user: User, wss: WSS, pk: int) -> bool:
        if not EventViewSet.user_is_participant(user, wss, pk):
            return False
        
        return WorkshopViewSet.user_is_registered_workshop(user, wss, pk)

    def queryset_selector(self, request, wss):
        return wss.workshops

class RegisteredWorkshopsAPI(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, year):
        wss = get_wss_object_or_404(year)
        user_profile = get_user_profile(request.user)
        workshops = wss.workshops.filter(participants__user_profile=user_profile)
        serializer = serializers.WorkshopSerializer(workshops, many=True, serialize_link=False)
        return Response(serializer.data)


class WorkshopRegistrationViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @action(methods=['GET'], detail=True)
    def register(self, request, year, pk):
        wss = get_wss_object_or_404(year)

        if not wss.workshop_registration_open:
            return ErrorResponse({
                'message': "Sorry, the workshop registration is not available now."
            })

        if not EventViewSet.user_is_participant(request.user, wss, pk):
            return ErrorResponse({
                "message": "You must finish your registration"
            }, status_code=403)

        workshop: Workshop = get_object_or_404(Workshop, pk=pk)

        if WorkshopViewSet.user_is_registered_workshop(request.user, wss, pk):
            return ErrorResponse({
                "message": "You have already registered in this workshop"
            }, status_code=403)

        if workshop.remaining_capacity <= 0:
            return ErrorResponse({
                "message": "This workshop has no more capacity"
            })
        
        participant: Participant = request.user.profile.participants.get(current_wss=wss)
        
        if participant.registered_workshops.count() >= wss.participant_workshop_limit:
            return ErrorResponse({
                "message": f"You cannot register in more than {wss.participant_workshop_limit} workshops"
            })
        
        if participant.registered_workshops.filter(start_time=workshop.start_time).count() > 0:
            return ErrorResponse({
                "message": f"You have already registered in a workshop at this time"
            })
        
        participant.registered_workshops.add(workshop)

        return Response({
            "message": "Done!"
        })
    
    @action(methods=['GET'], detail=True)
    def cancel(self, request, year, pk):
        wss = get_wss_object_or_404(year)
        workshop: Workshop = get_object_or_404(Workshop, pk=pk)

        if not WorkshopViewSet.user_is_participant(request.user, wss, pk):
            return ErrorResponse({
                "message": "You have not registered in this workshop"
            })
        
        if not wss.workshop_registration_open:
            return ErrorResponse({
                'message': "Sorry, the workshop cancellation is not available now."
            })
        
        participant: Participant = request.user.profile.participants.get(current_wss=wss)
        participant.registered_workshops.remove(workshop)

        return Response({
            "message": "Done!"
        })


class SeminarViewSet(EventViewSet):
    serializer = serializers.SeminarSerializer

    def queryset_selector(self, request, wss):
        is_keynote = request.query_params.get("keynote", None)
        if is_keynote:
            return wss.seminars.filter(is_keynote=bool(int(is_keynote)))
        return wss.seminars


class PosterSessionViewSet(EventViewSet):
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
        return wss.holding_teams.order_by('order')


class ImageViewSet(BaseViewSet):
    serializer = serializers.ImageSerializer

    def queryset_selector(self, request, wss):
        return wss.images


class VenueViewSet(BaseViewSet):
    serializer = serializers.VenueSerializer

    def queryset_selector(self, request, wss):
        return wss.events.values_list('venue', flat=True).distinct()


class SponsorViewSet(BaseViewSet):
    serializer = serializers.SponsorSerializer

    def queryset_selector(self, request, wss):
        return wss.sponsorships.values_list('sponsor', flat=True).distinct()


class SpeakerViewSet(BaseViewSet):
    serializer = serializers.SpeakerSerializer

    def queryset_selector(self, request, wss):
        return Speaker.objects.filter(id__in=wss.seminars.values_list('speaker', flat=True)\
            .union(wss.workshops.values_list('speaker', flat=True))\
            .union(wss.postersessions.values_list('speaker', flat=True))\
            .distinct())


class SeminarMaterialViewSet(BaseViewSet):
    serializer = serializers.SeminarMaterialSerializer

    def queryset_selector(self, request, wss):
        return wss.seminars.values_list('material', flat=True).distinct()


class WorkshopMaterialViewSet(BaseViewSet):
    serializer = serializers.WorkshopMaterialSerializer

    def queryset_selector(self, request, wss):
        return wss.workshops.values_list('material', flat=True).distinct()


class PosterMaterialViewSet(BaseViewSet):
    serializer = serializers.PosterMaterialSerializer

    def queryset_selector(self, request, wss):
        return wss.postersessions.values_list('material', flat=True).distinct()


class StaffViewSet(BaseViewSet):
    serializer = serializers.StaffSerializer

    def queryset_selector(self, request, wss):
        return Staff.objects.filter(holding_teams__wss=wss).distinct()


class UserProfileViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer = serializers.UserProfileSerializer

    def list(self, request):
        user_profile = get_user_profile(request.user)
        serializer = self.serializer(user_profile)
        return Response(serializer.data)
    
    @action(methods=['PUT'], detail=False)
    def edit(self, request):
        user_profile = get_user_profile(request.user)
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
        user_profile = get_user_profile(request.user)

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
        user_profile = get_user_profile(request.user)
        tag_pk = request.query_params.get('tag')

        tag = WssTag.objects.get(pk=tag_pk)

        user_profile.favorite_tags.remove(tag)
        user_profile.save()

        return Response(self.serializer(user_profile).data)

    @action(methods=['GET'], detail=False)
    def is_registered(self, request):
        user_profile = get_user_profile(request.user)
        year = request.query_params.get('year', 0)
        wss = get_wss_object_or_404(year)

        if year is None:
            return ErrorResponse({
                'message': '`year` should be passed in query string.'
            })
        
        return Response({
            'is_registered': user_profile.participants.filter(current_wss=wss).count() > 0
        })


class AnnouncementViewSet(BaseViewSet):
    serializer = serializers.AnnouncementSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def queryset_selector(self, request, wss):
        return wss.announcements.order_by('-create_timestamp')


class ParticipantViewSet(BaseViewSet):
    serializer = serializers.ParticipantDeepSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def queryset_selector(self, request, wss):
        return wss.participants


class TagsViewSet(BaseViewSet):
    serializer = serializers.WssTagSerializer

    def queryset_selector(self, request, wss):
        return wss.tag


class PaymentViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @action(methods=['GET'], detail=False)
    def request(self, request, year):
        wss = get_wss_object_or_404(year)
        if not wss.registration_open:
            return ErrorResponse({
                'message': "Sorry, the registration is not available now."
            })
        
        callback_url = request.query_params.get("callback", None)

        if callback_url is None:
            return ErrorResponse({
                'message': "`callback` should be passed in query string"
            })
        
        user_profile = get_user_profile(request.user)

        if user_profile.participants.filter(current_wss=wss).count() != 0:
            return ErrorResponse({
                "message": "You already have finished your payment."
            })

        try:
            if wss.is_capacity_full(user_profile.grade):
                return ErrorResponse({
                    "message": f"Sorry, {wss} has no more registration capacity."
                })
        except GradeDoesNotSpecifiedException:
            return ErrorResponse({
                "message": "You must specify your grade in your profile before registration."
            }, status_code=403)
        
        amount = wss.registration_fee
        description = settings.PAYMENT_SETTING['description'].format(year, user_profile.username)

        result = send_payment_request(callback_url, amount, description, user_profile.email, user_profile.phone_number)

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
                'message': "Sorry, the registration is not available now."
            })
        
        user_profile = get_user_profile(request.user)

        if user_profile.participants.filter(current_wss=wss).count() != 0:
            return ErrorResponse({
                "message": "You already have finished your payment."
            })        

        if request.query_params.get('Status', None) == 'OK':
            authority = request.query_params.get('Authority', None)
            if authority is None:
                return ErrorResponse({
                    'message': 'Authority should be passed in query string'
                }, status_code=403)
            
            amount = wss.registration_fee

            result = verify(authority, amount)
            
            if result.Status == 100:
                participant = Participant(current_wss=wss, user_profile=user_profile,
                                          payment_ref_id=str(result.RefID), payment_amount=amount)
                participant.save()

                # Notify user about successful payment
                user = participant.user_profile.user
                
                threading.Thread(target=lambda: send_mail(
                    PAYMENT_SUBJECT, 'text content',
                    settings.EMAIL_HOST_USER,
                    [user.email],
                    fail_silently=True,
                    html_message=BASE_HTML_CONTENT.format(
                        PAYMENT_EMAIL.format(
                            user.first_name, participant.payment_ref_id)
                    )
                )
                ).start()
                
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
 

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = serializers.ChangePasswordSerializer
    model = User

    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": "Wrong password"}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()

            return Response({
                'message': 'Password updated successfully'
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
