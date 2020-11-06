from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from django.views.generic.detail import DetailView
from django.shortcuts import get_object_or_404
from WSS.mixins import FooterMixin
from api.serializer import WorkshopSerializer
from events.models import Workshop
from WSS.models import WSS

# from .models import Task
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }
    return Response(api_urls)

class WorkshopViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = Workshop.objects.all()
        serializer = WorkshopSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Workshop.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = WorkshopSerializer(user)
        return Response(serializer.data)

@api_view(['GET'])
def list_workshops(request):
    print(request.__dict__)
    workshops = WSS.objects.first().workshops
    WSS.objects.filter()
    serializer = WorkshopSerializer(workshops, many=True)
    return Response(serializer.data)