from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    """
    Custom user model for Guerreros de Maporal VC.
    Extends AbstractUser with role-based access and profile fields.
    """

    class Role(models.TextChoices):
        ADMINISTRADOR = 'administrador', 'Administrador'
        ENTRENADOR = 'entrenador', 'Entrenador'
        STAFF = 'staff', 'Staff'

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.STAFF,
        verbose_name='Rol',
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
        verbose_name='Teléfono',
    )
    avatar = models.ImageField(
        upload_to='avatars/',
        blank=True,
        null=True,
        verbose_name='Avatar',
    )

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['-date_joined']

    def __str__(self):
        return f"{self.get_full_name()} ({self.role})"

    @property
    def is_administrador(self):
        return self.role == self.Role.ADMINISTRADOR

    @property
    def is_entrenador(self):
        return self.role == self.Role.ENTRENADOR

    @property
    def is_staff_role(self):
        return self.role == self.Role.STAFF
