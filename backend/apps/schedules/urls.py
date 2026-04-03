from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'courts', views.CourtViewSet, basename='court')
router.register(r'', views.ScheduleViewSet, basename='schedule')

urlpatterns = [
    path('weekly/', views.WeeklyCalendarView.as_view(), name='weekly-calendar'),
    path('', include(router.urls)),
]
