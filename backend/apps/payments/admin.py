from django.contrib import admin
from .models import Payment, PaymentPlan


@admin.register(PaymentPlan)
class PaymentPlanAdmin(admin.ModelAdmin):
    list_display = ['name', 'amount', 'is_active']
    list_filter = ['is_active']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = [
        'athlete', 'plan', 'amount', 'due_date',
        'payment_date', 'status', 'registered_by',
    ]
    list_filter = ['status', 'plan', 'due_date']
    search_fields = ['athlete__first_name', 'athlete__last_name', 'reference']
    readonly_fields = ['created_at', 'updated_at']
