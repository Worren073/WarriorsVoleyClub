from django.db import models
from django.conf import settings


class Category(models.Model):
    """Categoría de atletas (U12, U14, U16, U18, U20, Adultos)."""

    class Level(models.TextChoices):
        ACADEMIA = 'academia', 'Academia'
        NOVATO = 'novato', 'Novato'
        COMPETICION = 'competicion', 'Competición'
        ELITE = 'elite', 'Élite'

    name = models.CharField(max_length=50, verbose_name='Nombre')
    level = models.CharField(
        max_length=20,
        choices=Level.choices,
        default=Level.ACADEMIA,
        verbose_name='Nivel',
    )
    description = models.TextField(blank=True, verbose_name='Descripción')

    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} {self.get_level_display()}"


class Athlete(models.Model):
    """Modelo principal de atleta/jugador."""

    class Status(models.TextChoices):
        INSCRITO = 'inscrito', 'Inscrito'
        PERIODO_PRUEBA = 'periodo_prueba', 'Período de Prueba'
        SUSPENDIDO = 'suspendido', 'Suspendido'
        RETIRADO = 'retirado', 'Retirado'

    # Identification
    athlete_id = models.CharField(
        max_length=20,
        unique=True,
        verbose_name='ID de Atleta',
        help_text='Formato: GVC-XXXX',
    )
    first_name = models.CharField(max_length=100, verbose_name='Nombre')
    last_name = models.CharField(max_length=100, verbose_name='Apellido')
    photo = models.ImageField(
        upload_to='athletes/',
        blank=True,
        null=True,
        verbose_name='Foto',
    )

    # Details
    date_of_birth = models.DateField(verbose_name='Fecha de Nacimiento')
    phone = models.CharField(max_length=20, blank=True, verbose_name='Teléfono')
    email = models.EmailField(blank=True, verbose_name='Correo')
    emergency_contact = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Contacto de Emergencia',
    )
    emergency_phone = models.CharField(
        max_length=20,
        blank=True,
        verbose_name='Teléfono de Emergencia',
    )

    # Club info
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='athletes',
        verbose_name='Categoría',
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.INSCRITO,
        verbose_name='Estado',
    )
    date_joined = models.DateField(verbose_name='Fecha de Ingreso')
    performance = models.IntegerField(
        default=0,
        verbose_name='Rendimiento',
        help_text='Porcentaje de rendimiento (0-100)',
    )
    notes = models.TextField(blank=True, verbose_name='Notas')

    # Audit
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_athletes',
        verbose_name='Creado por',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Atleta'
        verbose_name_plural = 'Atletas'
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.athlete_id})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
