from rest_framework import viewsets
from apps.users.permissions import IsAdminOrReadOnly, IsStaffOrReadOnly
from .models import Competition, Match, Standing
from .serializers import CompetitionSerializer, MatchSerializer, StandingSerializer


class CompetitionViewSet(viewsets.ModelViewSet):
    """CRUD completo para competiciones."""
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ['competition_type', 'phase', 'is_featured']
    search_fields = ['name', 'location']
    ordering_fields = ['start_date', 'name']


class MatchViewSet(viewsets.ModelViewSet):
    """CRUD completo para partidos."""
    queryset = Match.objects.select_related('competition').all()
    serializer_class = MatchSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ['competition', 'status', 'result', 'phase']
    search_fields = ['home_team', 'away_team', 'venue']
    ordering_fields = ['match_date']


class StandingViewSet(viewsets.ModelViewSet):
    """CRUD para tabla de posiciones."""
    queryset = Standing.objects.select_related('competition').all()
    serializer_class = StandingSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ['competition']
    ordering_fields = ['position', 'points']
