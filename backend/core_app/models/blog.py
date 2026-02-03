from django.conf import settings
from django.db import models
from django.utils import timezone

from django_attachments.fields import SingleImageField

from .base import TimestampedModel
from core_app.utils.slug import generate_unique_slug


class Tag(TimestampedModel):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(Tag, self.name, instance_pk=self.pk)
        return super().save(*args, **kwargs)


class Post(TimestampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True)

    cover_image = SingleImageField(null=True, blank=True, on_delete=models.SET_NULL, related_name='post_cover_images')

    author = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='posts')
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)

    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)

    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(Post, self.title, instance_pk=self.pk)
        if self.is_published and self.published_at is None:
            self.published_at = timezone.now()
        return super().save(*args, **kwargs)
