from rest_framework.routers import DefaultRouter

from core_app.views.leads_views import LeadStatusViewSet, LeadViewSet


router = DefaultRouter()
router.register(r'statuses', LeadStatusViewSet, basename='lead-status')
router.register(r'leads', LeadViewSet, basename='lead')

urlpatterns = router.urls
