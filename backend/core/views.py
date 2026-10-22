from django.db.models import QuerySet
from django.http import Http404
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from core.models import Event, LabTalk, PosterSession, PosterSessionImage, RoundTable, Seminar, Speaker
from core.serializers import (
    EventSerializer,
    PosterSessionImageSerializer,
    RoundTableSerializer,
    SingleSpeakerSessionSerializer,
    SpeakerSerializer,
)

# --- Public content (read by the frontend at build/ISR time; one query per list) -----------------------------------


class EventListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Event.objects.order_by('order')
    serializer_class = EventSerializer


class SpeakerDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer


class EditionSessionListView(generics.ListAPIView):
    """Sessions of one edition (`<event_id>`), in schedule order."""

    permission_classes = [AllowAny]
    model: type[Seminar | LabTalk | PosterSession | RoundTable]

    def get_queryset(self) -> QuerySet:
        return (
            self.model.objects.filter(sub_event__event_id=self.kwargs['event_id'])
            .select_related('sub_event')
            .order_by('sub_event__date', 'sub_event__starting_time', 'sub_event_id')
        )


class SingleSpeakerSessionListView(EditionSessionListView):
    serializer_class = SingleSpeakerSessionSerializer

    def get_queryset(self) -> QuerySet:
        return super().get_queryset().select_related('speaker')


class SeminarListView(SingleSpeakerSessionListView):
    model = Seminar


class LabTalkListView(SingleSpeakerSessionListView):
    model = LabTalk


class PosterSessionListView(SingleSpeakerSessionListView):
    model = PosterSession


class RoundTableListView(EditionSessionListView):
    model = RoundTable
    serializer_class = RoundTableSerializer

    def get_queryset(self) -> QuerySet:
        return super().get_queryset().prefetch_related('speakers')


# --- The signed-in participant's poster submission -----------------------------------------------------------------


class PosterSessionImageView(generics.RetrieveUpdateDestroyAPIView):
    """GET (404 when nothing is submitted yet), PUT/PATCH to replace the file, DELETE to withdraw."""

    serializer_class = PosterSessionImageSerializer

    def get_object(self) -> PosterSessionImage:
        try:
            return PosterSessionImage.objects.get(user=self.request.user)
        except PosterSessionImage.DoesNotExist:
            raise Http404('No poster has been submitted yet.')


class PosterSessionImageCreateView(generics.CreateAPIView):
    serializer_class = PosterSessionImageSerializer

    def create(self, request, *args, **kwargs):
        if PosterSessionImage.objects.filter(user=request.user).exists():
            return Response(
                {'detail': 'A poster has already been submitted; replace it instead.'},
                status=status.HTTP_409_CONFLICT,
            )
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
