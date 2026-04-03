from rest_framework import viewsets, generics
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from apps.users.permissions import IsAdminOrReadOnly
from .models import Athlete, Category
from .serializers import AthleteSerializer, AthleteListSerializer, CategorySerializer


class AthleteViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para atletas.
    - Administradores: lectura + escritura
    - Entrenadores/Staff: solo lectura
    """
    queryset = Athlete.objects.select_related('category', 'created_by').all()
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'status']
    search_fields = ['first_name', 'last_name', 'athlete_id']
    ordering_fields = ['last_name', 'date_joined', 'performance']
    ordering = ['last_name']

    def get_serializer_class(self):
        if self.action == 'list':
            return AthleteListSerializer
        return AthleteSerializer


class CategoryListView(generics.ListCreateAPIView):
    """List and create categories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
