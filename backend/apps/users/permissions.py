from rest_framework import permissions


class IsAdministrador(permissions.BasePermission):
    """Only allows access to users with administrador role."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == 'administrador'
        )


class IsEntrenador(permissions.BasePermission):
    """Only allows access to users with entrenador role."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == 'entrenador'
        )


class IsStaffRole(permissions.BasePermission):
    """Only allows access to users with staff role."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == 'staff'
        )


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Administradores can do anything.
    Other authenticated users can only read.
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.role == 'administrador'


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Object-level permission: only the owner or an admin can modify.
    """

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'administrador':
            return True
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return obj == request.user


class IsStaffOrReadOnly(permissions.BasePermission):
    """
    Allows read-only access to anyone.
    Restricts write/edit access to staff roles (admin, coach, staff).
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return (
            request.user 
            and request.user.is_authenticated 
            and request.user.role in ['administrador', 'entrenador', 'staff']
        )

