from django.shortcuts import render
from rest_framework import generics, permissions


from staff.models import StaffTeam
from staff.serializers import StaffTeamSerializer

# Create your views here.
class StaffTeamByEventAPIView(generics.ListAPIView):
    queryset = StaffTeam.objects.all()
    serializer_class = StaffTeamSerializer

    def get_queryset(self):
        return StaffTeam.objects.filter(event=self.kwargs['event_id']).prefetch_related('members__staff')