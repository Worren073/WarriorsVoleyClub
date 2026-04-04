from django.db import models


class Competition(models.Model):
    """Competiciones y torneos."""

    class CompType(models.TextChoices):
        ESTADAL = 'estadal', 'Estadal'
        LIGA = 'liga', 'Liga'
        COPA = 'copa', 'Copa'
        VIAJE = 'viaje', 'Viaje'
        ZONAL = 'zonal', 'Zonal'
        NACIONAL = 'nacional', 'Nacional'
        INTERNACIONAL = 'internacional', 'Internacional'

    class Phase(models.TextChoices):
        FASE_GRUPOS = 'fase_grupos', 'Fase de Grupos'
        OCTAVOS = 'octavos', 'Octavos de Final'
        CUARTOS = 'cuartos', 'Cuartos de Final'
        SEMIFINAL = 'semifinal', 'Semifinal'
        FINAL = 'final', 'Final'
        REGULAR = 'regular', 'Temporada Regular'

    name = models.CharField(max_length=200, verbose_name='Nombre')
    category = models.ForeignKey(
        'athletes.Category',
        on_delete=models.SET_NULL,
        null=True,
        related_name='competitions',
        verbose_name='Categoría',
    )
    competition_type = models.CharField(
        max_length=20,
        choices=CompType.choices,
        default=CompType.LIGA,
        verbose_name='Tipo',
    )
    phase = models.CharField(
        max_length=20,
        choices=Phase.choices,
        default=Phase.REGULAR,
        verbose_name='Fase',
    )
    coach_in_charge = models.ForeignKey(
        'users.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        related_name='led_competitions',
        verbose_name='Entrenador Encargado',
    )
    assistant = models.ForeignKey(
        'users.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assisted_competitions',
        verbose_name='Asistente',
    )
    start_date = models.DateField(verbose_name='Fecha de Inicio')
    end_date = models.DateField(null=True, blank=True, verbose_name='Fecha de Fin')
    location = models.CharField(max_length=200, blank=True, verbose_name='Sede/Ubicación')
    description = models.TextField(blank=True, verbose_name='Descripción')
    is_featured = models.BooleanField(default=False, verbose_name='Evento Destacado')

    # Roster management
    roster = models.ManyToManyField(
        'athletes.Athlete',
        related_name='competitions',
        blank=True,
        verbose_name='Roster',
    )
    captain = models.ForeignKey(
        'athletes.Athlete',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='captained_competitions',
        verbose_name='Capitán',
    )

    # Audit
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Competición'
        verbose_name_plural = 'Competiciones'
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.name} ({self.get_competition_type_display()})"


class Match(models.Model):
    """Partidos individuales dentro de una competición."""

    class MatchStatus(models.TextChoices):
        PROGRAMADO = 'programado', 'Programado'
        EN_CURSO = 'en_curso', 'En Curso'
        FINALIZADO = 'finalizado', 'Finalizado'
        SUSPENDIDO = 'suspendido', 'Suspendido'
        CANCELADO = 'cancelado', 'Cancelado'

    class Result(models.TextChoices):
        GANADO = 'ganado', 'Ganado'
        PERDIDO = 'perdido', 'Perdido'
        EMPATE = 'empate', 'Empate'
        PENDIENTE = 'pendiente', 'Pendiente'

    competition = models.ForeignKey(
        Competition,
        on_delete=models.CASCADE,
        related_name='matches',
        verbose_name='Competición',
    )
    home_team = models.CharField(max_length=100, verbose_name='Equipo Local')
    away_team = models.CharField(max_length=100, verbose_name='Equipo Visitante')
    match_date = models.DateTimeField(verbose_name='Fecha y Hora')
    venue = models.CharField(max_length=200, blank=True, verbose_name='Sede')

    # Score
    home_score = models.IntegerField(default=0, verbose_name='Sets Local')
    away_score = models.IntegerField(default=0, verbose_name='Sets Visitante')

    status = models.CharField(
        max_length=20,
        choices=MatchStatus.choices,
        default=MatchStatus.PROGRAMADO,
        verbose_name='Estado',
    )
    result = models.CharField(
        max_length=20,
        choices=Result.choices,
        default=Result.PENDIENTE,
        verbose_name='Resultado',
    )

    phase = models.CharField(
        max_length=20,
        choices=Competition.Phase.choices,
        blank=True,
        verbose_name='Fase',
    )
    set_points = models.JSONField(default=list, blank=True, verbose_name='Puntos por Set')
    mvp = models.ForeignKey(
        'athletes.Athlete',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='match_mvps',
        verbose_name='Atleta Relevante',
    )
    notes = models.TextField(blank=True, verbose_name='Notas')

    # Audit
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Partido'
        verbose_name_plural = 'Partidos'
        ordering = ['match_date']

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} - {self.match_date.strftime('%d/%m/%Y')}"


class Standing(models.Model):
    """Tabla de posiciones de una competición."""
    competition = models.ForeignKey(
        Competition,
        on_delete=models.CASCADE,
        related_name='standings',
        verbose_name='Competición',
    )
    team_name = models.CharField(max_length=100, verbose_name='Equipo')
    position = models.IntegerField(verbose_name='Posición')
    points = models.IntegerField(default=0, verbose_name='Puntos')
    matches_played = models.IntegerField(default=0, verbose_name='PJ')
    wins = models.IntegerField(default=0, verbose_name='PG')
    losses = models.IntegerField(default=0, verbose_name='PP')
    sets_won = models.IntegerField(default=0, verbose_name='SG')
    sets_lost = models.IntegerField(default=0, verbose_name='SP')

    class Meta:
        verbose_name = 'Posición'
        verbose_name_plural = 'Tabla de Posiciones'
        ordering = ['competition', 'position']
        unique_together = ['competition', 'team_name']

    def __str__(self):
        return f"{self.position}. {self.team_name} - {self.points} pts"
