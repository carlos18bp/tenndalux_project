from rest_framework.routers import DefaultRouter

from core_app.views.portfolio_views import CategoryViewSet, StyleViewSet, SpaceViewSet, ProjectViewSet


router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'styles', StyleViewSet, basename='style')
router.register(r'spaces', SpaceViewSet, basename='space')
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = router.urls
