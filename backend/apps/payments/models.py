from django.db import models
from django.conf import settings
from apps.athletes.models import Athlete


class PaymentPlan(models.Model):
    """Planes de pago disponibles."""
    name = models.CharField(max_length=100, verbose_name='Nombre')
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Monto',
    )
    description = models.TextField(blank=True, verbose_name='Descripción')
    is_active = models.BooleanField(default=True, verbose_name='Activo')

    class Meta:
        verbose_name = 'Plan de Pago'
        verbose_name_plural = 'Planes de Pago'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - ${self.amount}"


class Payment(models.Model):
    """Registro de pagos de atletas."""

    class Status(models.TextChoices):
        PAGADO = 'pagado', 'Pagado'
        PENDIENTE = 'pendiente', 'Pendiente'
        ATRASADO = 'atrasado', 'Atrasado'
        CANCELADO = 'cancelado', 'Cancelado'

    athlete = models.ForeignKey(
        Athlete,
        on_delete=models.CASCADE,
        related_name='payments',
        verbose_name='Atleta',
    )
    plan = models.ForeignKey(
        PaymentPlan,
        on_delete=models.PROTECT,
        related_name='payments',
        verbose_name='Plan de Pago',
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Monto',
    )
    due_date = models.DateField(verbose_name='Fecha de Vencimiento')
    payment_date = models.DateField(
        null=True,
        blank=True,
        verbose_name='Fecha de Pago',
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDIENTE,
        verbose_name='Estado',
    )
    reference = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Referencia',
    )
    notes = models.TextField(blank=True, verbose_name='Notas')

    # Audit
    registered_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='registered_payments',
        verbose_name='Registrado por',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'
        ordering = ['-due_date']

    def __str__(self):
        return f"{self.athlete.full_name} - {self.plan.name} - {self.status}"
