from rest_framework.routers import DefaultRouter

from core_app.views.services_views import ServiceViewSet, ProcessStepViewSet


router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'process-steps', ProcessStepViewSet, basename='process-step')

urlpatterns = router.urls
