"""
URL configuration for Gestor Guerreros de Maporal VC.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # API endpoints
    path('api/auth/', include('apps.users.urls')),
    path('api/athletes/', include('apps.athletes.urls')),
    path('api/payments/', include('apps.payments.urls')),
    path('api/schedules/', include('apps.schedules.urls')),
    path('api/competitions/', include('apps.competitions.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
