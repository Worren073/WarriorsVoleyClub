from rest_framework import serializers
from .models import Payment, PaymentPlan


class PaymentPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentPlan
        fields = ['id', 'name', 'amount', 'description', 'is_active']


class PaymentSerializer(serializers.ModelSerializer):
    athlete_name = serializers.CharField(source='athlete.full_name', read_only=True)
    athlete_id_code = serializers.CharField(source='athlete.athlete_id', read_only=True)
    plan_name = serializers.CharField(source='plan.name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'athlete', 'athlete_name', 'athlete_id_code',
            'plan', 'plan_name', 'amount', 'due_date', 'payment_date',
            'status', 'status_display', 'reference', 'notes',
            'payment_method', 'currency', 'bank', 
            'phone_number', 'id_number', 'id_type',
            'registered_by', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'registered_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['registered_by'] = self.context['request'].user
        return super().create(validated_data)


class PaymentSummarySerializer(serializers.Serializer):
    """Serializer para el resumen financiero del dashboard."""
    total_income = serializers.DecimalField(max_digits=12, decimal_places=2)
    athletes_on_track = serializers.FloatField()
    overdue_count = serializers.IntegerField()
    income_change_percent = serializers.FloatField()
