from django.core.exceptions import ValidationError
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from django_attachments.fields import GalleryField

from .base import TimestampedModel
from core_app.utils.slug import generate_unique_slug
from core_app.utils.content_blocks import CONTENT_BLOCKS_HELP, validate_content_blocks


class Category(TimestampedModel):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(Category, self.name, instance_pk=self.pk)
        return super().save(*args, **kwargs)


class Style(TimestampedModel):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(Style, self.name, instance_pk=self.pk)
        return super().save(*args, **kwargs)


class Space(TimestampedModel):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(Space, self.name, instance_pk=self.pk)
        return super().save(*args, **kwargs)


class Project(TimestampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField(blank=True)
    content_blocks = models.JSONField(
        default=list,
        blank=True,
        help_text=CONTENT_BLOCKS_HELP,
    )
    location = models.CharField(max_length=200, blank=True)
    year = models.PositiveIntegerField(
        validators=[MinValueValidator(1900), MaxValueValidator(2100)],
        null=True,
        blank=True,
    )
    area_sqm = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)

    gallery = GalleryField(null=True, blank=True, on_delete=models.SET_NULL, related_name='project_galleries')

    categories = models.ManyToManyField(Category, related_name='projects', blank=True)
    styles = models.ManyToManyField(Style, related_name='projects', blank=True)
    spaces = models.ManyToManyField(Space, related_name='projects', blank=True)

    class Meta:
        ordering = ['-year', '-created_at']

    def clean(self):
        super().clean()
        # El admin llama a clean() a través del ModelForm; las escrituras por
        # API las valida el serializer con la misma función.
        try:
            validate_content_blocks(self.content_blocks)
        except ValidationError as exc:
            raise ValidationError({'content_blocks': exc.messages})

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(Project, self.title, instance_pk=self.pk)
        return super().save(*args, **kwargs)
