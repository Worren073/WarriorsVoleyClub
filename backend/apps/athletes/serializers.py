from rest_framework import serializers
from .models import Athlete, Category


class CategorySerializer(serializers.ModelSerializer):
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'level', 'level_display', 'description']


class AthleteListSerializer(serializers.ModelSerializer):
    """Serializer ligero para listados."""
    category_name = serializers.CharField(source='category.__str__', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = Athlete
        fields = [
            'id', 'athlete_id', 'first_name', 'last_name', 'full_name',
            'photo', 'category', 'category_name', 'status', 'status_display',
            'performance', 'date_joined',
        ]


class AthleteSerializer(serializers.ModelSerializer):
    """Serializer completo para detalle/creación/edición."""
    category_name = serializers.CharField(source='category.__str__', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = Athlete
        fields = [
            'id', 'athlete_id', 'first_name', 'last_name', 'full_name',
            'photo', 'date_of_birth', 'phone', 'email',
            'emergency_contact', 'emergency_phone',
            'category', 'category_name', 'status', 'status_display',
            'date_joined', 'performance', 'notes',
            'created_by', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)
