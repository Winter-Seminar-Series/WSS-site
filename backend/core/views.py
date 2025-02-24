from rest_framework import generics, status
from rest_framework.response import Response

from core.models import Event, LabTalk, Seminar, Speaker, RoundTable, PosterSession, PosterSessionImage
from core.serializers import EventSerializer, SeminarSerializer, SpeakerSerializer, RoundTableSerializer, \
    PosterSessionSerializer, PosterSessionImageSerializer

# Create your views here.
from rest_framework_simplejwt.views import TokenObtainPairView
from core.serializers import CustomTokenObtainPairSerializer


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class EventAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class SpeakerAPIView(generics.RetrieveAPIView):
    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer


class SeminarAPIView(generics.ListAPIView):
    queryset = Seminar.objects.all()
    serializer_class = SeminarSerializer

    def get_queryset(self):
        return Seminar.objects.filter(
            sub_event__event=self.kwargs['event_id']
        ).order_by('sub_event__date', 'sub_event__starting_time')


class LabTalkAPIView(generics.ListAPIView):
    queryset = LabTalk.objects.all()
    serializer_class = SeminarSerializer

    def get_queryset(self):
        return LabTalk.objects.filter(
            sub_event__event=self.kwargs['event_id']
        ).order_by('sub_event__date', 'sub_event__starting_time')


class PosterSessionAPIView(generics.ListAPIView):
    queryset = PosterSession.objects.all()
    serializer_class = PosterSessionSerializer

    def get_queryset(self):
        return PosterSession.objects.filter(
            sub_event__event=self.kwargs['event_id']
        ).order_by('sub_event__date', 'sub_event__starting_time')


class RoundTableAPIView(generics.ListAPIView):
    queryset = RoundTable.objects.all()
    serializer_class = RoundTableSerializer

    def get_queryset(self):
        return RoundTable.objects.filter(
            sub_event__event=self.kwargs['event_id']
        ).order_by('sub_event__date', 'sub_event__starting_time')


class PosterSessionImageAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PosterSessionImageSerializer

    def get_object(self):
        try:
            # Try to get the PosterSessionImage object for the current user
            return PosterSessionImage.objects.get(user=self.request.user)
        except PosterSessionImage.DoesNotExist:
            # Return None if the object does not exist
            return None

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            # Return an empty response with 200 OK status
            return Response({}, status=status.HTTP_200_OK)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            # Return an empty response with 404 NOT FOUND status
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            # Return an empty response with 404 NOT FOUND status
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        return super().destroy(request, *args, **kwargs)


class PosterSessionImageCreateAPIView(generics.CreateAPIView):
    serializer_class = PosterSessionImageSerializer
