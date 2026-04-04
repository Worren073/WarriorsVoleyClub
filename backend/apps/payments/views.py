from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, Count, Q
from django.utils import timezone
from apps.users.permissions import IsAdminOrReadOnly
from .models import Payment, PaymentPlan
from .serializers import PaymentSerializer, PaymentPlanSerializer, PaymentSummarySerializer


class PaymentViewSet(viewsets.ModelViewSet):
    """CRUD completo para pagos."""
    queryset = Payment.objects.select_related('athlete', 'plan', 'registered_by').all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = {
        'status': ['exact'],
        'plan': ['exact'],
        'athlete': ['exact'],
        'created_at': ['month', 'year', 'exact'],
    }
    search_fields = ['athlete__first_name', 'athlete__last_name', 'reference']
    ordering_fields = ['due_date', 'amount', 'status']
    ordering = ['-due_date']


class PaymentPlanViewSet(viewsets.ModelViewSet):
    """CRUD para planes de pago."""
    queryset = PaymentPlan.objects.all()
    serializer_class = PaymentPlanSerializer
    permission_classes = [IsAdminOrReadOnly]


class PaymentSummaryView(APIView):
    """Dashboard summary: total income, on-track %, overdue count."""

    def get(self, request):
        now = timezone.now().date()
        current_month = now.month
        current_year = now.year

        # Total income this month
        total_income = Payment.objects.filter(
            status='pagado',
            payment_date__month=current_month,
            payment_date__year=current_year,
        ).aggregate(total=Sum('amount'))['total'] or 0

        # Previous month income for comparison
        prev_month = current_month - 1 if current_month > 1 else 12
        prev_year = current_year if current_month > 1 else current_year - 1
        prev_income = Payment.objects.filter(
            status='pagado',
            payment_date__month=prev_month,
            payment_date__year=prev_year,
        ).aggregate(total=Sum('amount'))['total'] or 0

        income_change = (
            ((float(total_income) - float(prev_income)) / float(prev_income) * 100)
            if prev_income > 0 else 0
        )

        # Athletes on track (paid / total with payments due)
        total_due = Payment.objects.filter(
            due_date__month=current_month,
            due_date__year=current_year,
        ).count()
        paid = Payment.objects.filter(
            due_date__month=current_month,
            due_date__year=current_year,
            status='pagado',
        ).count()
        on_track = (paid / total_due * 100) if total_due > 0 else 0

        # Overdue count
        overdue = Payment.objects.filter(
            status='atrasado',
        ).count()

        data = {
            'total_income': total_income,
            'athletes_on_track': round(on_track, 1),
            'overdue_count': overdue,
            'income_change_percent': round(income_change, 1),
        }
        serializer = PaymentSummarySerializer(data)
        return Response(serializer.data)
