from rest_framework import viewsets, permissions

from core_app.models import LeadStatus, Lead
from core_app.serializers import LeadStatusSerializer, LeadSerializer


class LeadStatusViewSet(viewsets.ModelViewSet):
    queryset = LeadStatus.objects.all()
    serializer_class = LeadStatusSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
