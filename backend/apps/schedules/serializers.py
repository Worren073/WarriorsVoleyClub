from rest_framework import serializers
from .models import Schedule, Court


class CourtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Court
        fields = ['id', 'name', 'location', 'is_available']


class ScheduleSerializer(serializers.ModelSerializer):
    day_display = serializers.CharField(source='get_day_of_week_display', read_only=True)
    type_display = serializers.CharField(source='get_session_type_display', read_only=True)
    court_name = serializers.CharField(source='court.name', read_only=True)
    coach_name = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.__str__', read_only=True)

    class Meta:
        model = Schedule
        fields = [
            'id', 'title', 'category', 'category_name',
            'day_of_week', 'day_display', 'start_time', 'end_time',
            'court', 'court_name', 'coach', 'coach_name',
            'session_type', 'type_display', 'description', 'is_active',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_coach_name(self, obj):
        if obj.coach:
            return obj.coach.get_full_name()
        return None
