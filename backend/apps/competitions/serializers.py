from rest_framework import serializers
from .models import Competition, Match, Standing


class CompetitionSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_competition_type_display', read_only=True)
    phase_display = serializers.CharField(source='get_phase_display', read_only=True)
    matches_count = serializers.IntegerField(source='matches.count', read_only=True)

    class Meta:
        model = Competition
        fields = [
            'id', 'name', 'competition_type', 'type_display',
            'phase', 'phase_display', 'start_date', 'end_date',
            'location', 'description', 'is_featured', 'matches_count',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class MatchSerializer(serializers.ModelSerializer):
    competition_name = serializers.CharField(source='competition.name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    result_display = serializers.CharField(source='get_result_display', read_only=True)
    phase_display = serializers.CharField(source='get_phase_display', read_only=True)
    score = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = [
            'id', 'competition', 'competition_name',
            'home_team', 'away_team', 'match_date', 'venue',
            'home_score', 'away_score', 'score',
            'status', 'status_display', 'result', 'result_display',
            'phase', 'phase_display', 'notes',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_score(self, obj):
        return f"{obj.home_score} - {obj.away_score}"


class StandingSerializer(serializers.ModelSerializer):
    competition_name = serializers.CharField(source='competition.name', read_only=True)

    class Meta:
        model = Standing
        fields = [
            'id', 'competition', 'competition_name', 'team_name',
            'position', 'points', 'matches_played', 'wins', 'losses',
            'sets_won', 'sets_lost',
        ]
