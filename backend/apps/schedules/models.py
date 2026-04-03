from django.db import models
from django.conf import settings
from apps.athletes.models import Category


class Court(models.Model):
    """Canchas/instalaciones disponibles."""
    name = models.CharField(max_length=100, verbose_name='Nombre')
    location = models.CharField(max_length=200, blank=True, verbose_name='Ubicación')
    is_available = models.BooleanField(default=True, verbose_name='Disponible')

    class Meta:
        verbose_name = 'Cancha'
        verbose_name_plural = 'Canchas'
        ordering = ['name']

    def __str__(self):
        return self.name


class Schedule(models.Model):
    """Horarios de clases y sesiones de entrenamiento."""

    class DayOfWeek(models.IntegerChoices):
        LUNES = 1, 'Lunes'
        MARTES = 2, 'Martes'
        MIERCOLES = 3, 'Miércoles'
        JUEVES = 4, 'Jueves'
        VIERNES = 5, 'Viernes'
        SABADO = 6, 'Sábado'
        DOMINGO = 7, 'Domingo'

    class SessionType(models.TextChoices):
        ENTRENAMIENTO = 'entrenamiento', 'Entrenamiento'
        CANCHA_ABIERTA = 'cancha_abierta', 'Cancha Abierta'
        COMPETICION = 'competicion', 'Competición'
        EVALUACION = 'evaluacion', 'Evaluación'

    title = models.CharField(max_length=200, verbose_name='Título')
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='schedules',
        verbose_name='Categoría',
    )
    day_of_week = models.IntegerField(
        choices=DayOfWeek.choices,
        verbose_name='Día de la Semana',
    )
    start_time = models.TimeField(verbose_name='Hora de Inicio')
    end_time = models.TimeField(verbose_name='Hora de Fin')
    court = models.ForeignKey(
        Court,
        on_delete=models.SET_NULL,
        null=True,
        related_name='schedules',
        verbose_name='Cancha',
    )
    coach = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='coached_schedules',
        verbose_name='Entrenador',
        limit_choices_to={'role': 'entrenador'},
    )
    session_type = models.CharField(
        max_length=20,
        choices=SessionType.choices,
        default=SessionType.ENTRENAMIENTO,
        verbose_name='Tipo de Sesión',
    )
    description = models.TextField(blank=True, verbose_name='Descripción')
    is_active = models.BooleanField(default=True, verbose_name='Activo')

    # Audit
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Horario'
        verbose_name_plural = 'Horarios'
        ordering = ['day_of_week', 'start_time']

    def __str__(self):
        return f"{self.title} - {self.get_day_of_week_display()} {self.start_time}"
