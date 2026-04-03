from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.PaymentViewSet, basename='payment')

urlpatterns = [
    path('summary/', views.PaymentSummaryView.as_view(), name='payment-summary'),
    path('plans/', views.PaymentPlanViewSet.as_view({'get': 'list', 'post': 'create'}), name='payment-plan-list'),
    path('plans/<int:pk>/', views.PaymentPlanViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='payment-plan-detail'),
    path('', include(router.urls)),
]
