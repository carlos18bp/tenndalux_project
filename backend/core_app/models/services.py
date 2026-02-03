from django.db import models

from django_attachments.fields import SingleImageField

from .base import TimestampedModel
from core_app.utils.slug import generate_unique_slug


class Service(TimestampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    short_description = models.TextField(blank=True)
    full_description = models.TextField(blank=True)

    includes = models.JSONField(default=list, blank=True)
    excludes = models.JSONField(default=list, blank=True)

    icon = SingleImageField(null=True, blank=True, on_delete=models.SET_NULL, related_name='service_icons')
    image = SingleImageField(null=True, blank=True, on_delete=models.SET_NULL, related_name='service_images')

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'title']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(Service, self.title, instance_pk=self.pk)
        return super().save(*args, **kwargs)


class ProcessStep(TimestampedModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    duration = models.CharField(max_length=120, blank=True)
    deliverables = models.JSONField(default=list, blank=True)

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'title']
