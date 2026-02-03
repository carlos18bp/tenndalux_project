from django.db import models

from django_attachments.fields import GalleryField, SingleImageField

from .base import SingletonModel, TimestampedModel
from .portfolio import Project


class SiteSettings(SingletonModel, TimestampedModel):
    company_name = models.CharField(max_length=200, blank=True)
    tagline = models.CharField(max_length=255, blank=True)

    phone = models.CharField(max_length=50, blank=True)
    whatsapp_number = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)

    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=120, blank=True)

    social_instagram = models.URLField(blank=True)
    social_facebook = models.URLField(blank=True)
    social_youtube = models.URLField(blank=True)
    social_tiktok = models.URLField(blank=True)

    logo = SingleImageField(null=True, blank=True, on_delete=models.SET_NULL, related_name='site_logos')
    favicon = SingleImageField(null=True, blank=True, on_delete=models.SET_NULL, related_name='site_favicons')

    footer_text = models.TextField(blank=True)


class HomePage(SingletonModel, TimestampedModel):
    hero_title = models.CharField(max_length=200, blank=True)
    hero_subtitle = models.TextField(blank=True)
    hero_cta_text = models.CharField(max_length=120, blank=True)

    hero_media = GalleryField(null=True, blank=True, on_delete=models.SET_NULL, related_name='home_hero_media')

    value_proposition_title = models.CharField(max_length=200, blank=True)
    value_proposition_items = models.JSONField(default=list, blank=True)

    featured_projects = models.ManyToManyField(Project, blank=True, related_name='featured_on_home')

    testimonials_section = GalleryField(null=True, blank=True, on_delete=models.SET_NULL, related_name='home_testimonials')

    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)


class AboutPage(SingletonModel, TimestampedModel):
    title = models.CharField(max_length=200, blank=True)
    content = models.TextField(blank=True)

    team_section = models.JSONField(default=list, blank=True)

    gallery = GalleryField(null=True, blank=True, on_delete=models.SET_NULL, related_name='about_gallery')

    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)
