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

    def validate(self, data):
        """Validar que no haya choques de horario."""
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        day = data.get('day_of_week')
        court = data.get('court')
        coach = data.get('coach')

        if start_time and end_time and start_time >= end_time:
            raise serializers.ValidationError("La hora de inicio debe ser anterior a la de fin.")

        # Obtener sesiones el mismo día
        existing_sessions = Schedule.objects.filter(day_of_week=day, is_active=True)
        
        # Excluir el objeto actual si es una actualización
        if self.instance:
            existing_sessions = existing_sessions.exclude(pk=self.instance.pk)

        for session in existing_sessions:
            # Lógica de traslape: (Start1 < End2) AND (End1 > Start2)
            if (start_time < session.end_time) and (end_time > session.start_time):
                if session.court == court:
                    raise serializers.ValidationError(
                        f"Choque de Cancha: La cancha '{court.name}' ya está ocupada por '{session.title}' ({session.start_time.strftime('%H:%M')} - {session.end_time.strftime('%H:%M')})"
                    )
                if coach and session.coach == coach:
                    raise serializers.ValidationError(
                        f"Choque de Entrenador: El coach '{coach.get_full_name()}' ya tiene asignada la sesión '{session.title}' en este horario."
                    )

        return data
