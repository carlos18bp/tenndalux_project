from django.urls import path

from core_app.views.admin_tools_views import (
    content_blocks_instructions,
    upload_content_image,
    validate_blocks,
)


urlpatterns = [
    path('content-blocks/instructions/', content_blocks_instructions, name='content-blocks-instructions'),
    path('content-blocks/images/', upload_content_image, name='content-blocks-upload-image'),
    path('content-blocks/validate/', validate_blocks, name='content-blocks-validate'),
]
