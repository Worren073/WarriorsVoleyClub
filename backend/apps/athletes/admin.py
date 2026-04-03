from django.contrib import admin
from .models import Athlete, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'description']
    list_filter = ['level']


@admin.register(Athlete)
class AthleteAdmin(admin.ModelAdmin):
    list_display = [
        'athlete_id', 'first_name', 'last_name', 'category',
        'status', 'performance', 'date_joined',
    ]
    list_filter = ['category', 'status', 'date_joined']
    search_fields = ['first_name', 'last_name', 'athlete_id']
    readonly_fields = ['created_at', 'updated_at']
