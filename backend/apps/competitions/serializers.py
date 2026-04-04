from rest_framework import serializers
from .models import Competition, Match, Standing
from apps.athletes.serializers import AthleteListSerializer


class CompetitionSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_competition_type_display', read_only=True)
    phase_display = serializers.CharField(source='get_phase_display', read_only=True)
    matches_count = serializers.IntegerField(source='matches.count', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    coach_name = serializers.SerializerMethodField()
    assistant_name = serializers.SerializerMethodField()
    stats = serializers.SerializerMethodField()
    
    # Roster fields
    roster_data = AthleteListSerializer(source='roster', many=True, read_only=True)
    captain_data = AthleteListSerializer(source='captain', read_only=True)
    captain_name = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = [
            'id', 'name', 'competition_type', 'type_display',
            'category', 'category_name', 'coach_in_charge', 'coach_name',
            'assistant', 'assistant_name',
            'phase', 'phase_display', 'start_date', 'end_date',
            'location', 'description', 'is_featured', 'matches_count',
            'stats', 'roster', 'roster_data', 'captain', 'captain_data', 'captain_name',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_captain_name(self, obj):
        return obj.captain.full_name if obj.captain else "No asignado"

    def get_coach_name(self, obj):
        return obj.coach_in_charge.get_full_name() if obj.coach_in_charge else "No asignado"

    def get_assistant_name(self, obj):
        return obj.assistant.get_full_name() if obj.assistant else "No asignado"

    def get_stats(self, obj):
        matches = obj.matches.filter(status='finalizado')
        wins = matches.filter(result='ganado').count()
        losses = matches.filter(result='perdido').count()
        
        total_sets_won = 0
        total_sets_lost = 0
        mvp_counts = {}
        
        for m in matches:
            # Stats calculation
            if m.result == 'ganado':
                total_sets_won += max(m.home_score, m.away_score)
                total_sets_lost += min(m.home_score, m.away_score)
            elif m.result == 'perdido':
                total_sets_won += min(m.home_score, m.away_score)
                total_sets_lost += max(m.home_score, m.away_score)
            
            # Tournament MVP calculation
            if m.mvp:
                mvp_counts[m.mvp.id] = mvp_counts.get(m.mvp.id, 0) + 1

        # Get top MVP
        tournament_mvp = None
        if mvp_counts:
            top_mvp_id = max(mvp_counts, key=mvp_counts.get)
            from apps.athletes.models import Athlete
            from apps.athletes.serializers import AthleteListSerializer
            top_mvp = Athlete.objects.get(id=top_mvp_id)
            tournament_mvp = AthleteListSerializer(top_mvp).data

        return {
            'wins': wins,
            'losses': losses,
            'total_sets_won': total_sets_won,
            'total_sets_lost': total_sets_lost,
            'win_rate': f"{(wins / matches.count() * 100):.1f}%" if matches.count() > 0 else "0%",
            'tournament_mvp': tournament_mvp
        }


class MatchSerializer(serializers.ModelSerializer):
    competition_name = serializers.CharField(source='competition.name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    result_display = serializers.CharField(source='get_result_display', read_only=True)
    phase_display = serializers.CharField(source='get_phase_display', read_only=True)
    score = serializers.SerializerMethodField()
    mvp_name = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = [
            'id', 'competition', 'competition_name',
            'home_team', 'away_team', 'match_date', 'venue',
            'home_score', 'away_score', 'score', 'set_points',
            'status', 'status_display', 'result', 'result_display',
            'phase', 'phase_display', 'mvp', 'mvp_name', 'notes',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_score(self, obj):
        return f"{obj.home_score} - {obj.away_score}"

    def get_mvp_name(self, obj):
        return obj.mvp.full_name if obj.mvp else "No designado"


class StandingSerializer(serializers.ModelSerializer):
    competition_name = serializers.CharField(source='competition.name', read_only=True)

    class Meta:
        model = Standing
        fields = [
            'id', 'competition', 'competition_name', 'team_name',
            'position', 'points', 'matches_played', 'wins', 'losses',
            'sets_won', 'sets_lost',
        ]
