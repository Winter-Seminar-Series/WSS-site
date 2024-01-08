from rest_framework import serializers
from staff.models import Staff, StaffTeam, StaffTeamMember

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ('id', 'name', 'designation', 'description', 'image')

class StaffTeamMemberSerializer(serializers.ModelSerializer):
    staff = serializers.StaffSerializer()

    class Meta:
        model = StaffTeamMember
        fields = ('id', 'staff')

class StaffTeamSerializer(serializers.ModelSerializer):
    members = StaffTeamMemberSerializer(many=True, read_only=True)

    class Meta:
        model = StaffTeam
        fields = ('id', 'name', 'members')