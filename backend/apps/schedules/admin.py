from django.contrib import admin
from .models import Schedule, Court


@admin.register(Court)
class CourtAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'is_available']
    list_filter = ['is_available']


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'category', 'day_of_week', 'start_time',
        'end_time', 'court', 'coach', 'session_type', 'is_active',
    ]
    list_filter = ['day_of_week', 'session_type', 'court', 'is_active']
    search_fields = ['title', 'description']
