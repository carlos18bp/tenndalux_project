from rest_framework.routers import DefaultRouter

from core_app.views.blog_views import TagViewSet, PostViewSet


router = DefaultRouter()
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = router.urls
