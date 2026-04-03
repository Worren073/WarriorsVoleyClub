from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from apps.users.permissions import IsAdminOrReadOnly, IsStaffOrReadOnly
from .models import Schedule, Court
from .serializers import ScheduleSerializer, CourtSerializer


class ScheduleViewSet(viewsets.ModelViewSet):
    """CRUD completo para horarios."""
    queryset = Schedule.objects.select_related('category', 'court', 'coach').all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ['day_of_week', 'session_type', 'court', 'coach', 'is_active']
    search_fields = ['title', 'description']
    ordering_fields = ['day_of_week', 'start_time']


class CourtViewSet(viewsets.ModelViewSet):
    """CRUD para canchas."""
    queryset = Court.objects.all()
    serializer_class = CourtSerializer
    permission_classes = [IsStaffOrReadOnly]


class WeeklyCalendarView(APIView):
    """Returns schedules grouped by day for calendar view."""
    permission_classes = [AllowAny]


    def get(self, request):
        schedules = Schedule.objects.filter(
            is_active=True,
        ).select_related('category', 'court', 'coach').order_by('day_of_week', 'start_time')

        weekly = {}
        day_names = dict(Schedule.DayOfWeek.choices)
        for day_num, day_name in day_names.items():
            day_schedules = schedules.filter(day_of_week=day_num)
            weekly[day_name] = ScheduleSerializer(day_schedules, many=True).data

        return Response(weekly)
