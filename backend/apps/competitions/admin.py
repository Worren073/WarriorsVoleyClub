from django.contrib import admin
from .models import Competition, Match, Standing


@admin.register(Competition)
class CompetitionAdmin(admin.ModelAdmin):
    list_display = ['name', 'competition_type', 'phase', 'start_date', 'location', 'is_featured']
    list_filter = ['competition_type', 'phase', 'is_featured']
    search_fields = ['name', 'location']


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = [
        'home_team', 'away_team', 'competition', 'match_date',
        'home_score', 'away_score', 'status', 'result',
    ]
    list_filter = ['status', 'result', 'competition']
    search_fields = ['home_team', 'away_team']


@admin.register(Standing)
class StandingAdmin(admin.ModelAdmin):
    list_display = ['position', 'team_name', 'competition', 'points', 'wins', 'losses']
    list_filter = ['competition']
    ordering = ['competition', 'position']
