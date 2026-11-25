from django.db.models import Prefetch
from rest_framework import generics
from rest_framework.permissions import AllowAny

from staff.models import StaffTeam, StaffTeamMember
from staff.serializers import StaffTeamSerializer


class StaffTeamByEventAPIView(generics.ListAPIView):
    """The organising team of one edition, by team."""

    permission_classes = [AllowAny]
    serializer_class = StaffTeamSerializer

    def get_queryset(self):
        return (
            StaffTeam.objects.filter(event_id=self.kwargs['event_id'])
            .prefetch_related(
                Prefetch(
                    'members',
                    queryset=StaffTeamMember.objects.select_related('staff').order_by('display_order', 'id'),
                )
            )
            .order_by('display_order', 'id')
        )
