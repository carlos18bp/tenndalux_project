# Django Attachments - Guía de Uso

Esta librería proporciona campos de galería de imágenes para modelos de Django con una interfaz drag & drop en el admin.

## 🎯 Características

- ✅ Galería de imágenes con drag & drop
- ✅ Reordenamiento de imágenes
- ✅ Thumbnails automáticos (easy-thumbnails)
- ✅ Limpieza automática de archivos (django-cleanup)
- ✅ Interfaz admin personalizada
- ✅ Soporte para múltiples galerías en un modelo

---

## 📦 Instalación

Ya está configurado en este proyecto. Las dependencias necesarias son:

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'easy_thumbnails',
    'django_cleanup.apps.CleanupConfig',
    'django_attachments',
    # ...
]

THUMBNAIL_ALIASES = {
    '': {
        'small':  {'size': (50, 50),   'crop': True},
        'medium': {'size': (200, 200), 'crop': True},
        'large':  {'size': (500, 500), 'crop': False},
        'admin':  {'size': (100, 100), 'crop': True},
    },
}
```

---

## 🔧 Uso Básico

### 1. Agregar campo de galería al modelo

```python
# models/product.py
from django.db import models
from django_attachments.fields import GalleryField
from django_attachments.models import Library


class Product(models.Model):
    """Product with image gallery."""
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Gallery field
    gallery = GalleryField(
        related_name='products_with_gallery',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    def delete(self, *args, **kwargs):
        """
        Override delete to clean up associated gallery.
        
        IMPORTANT: This prevents orphan files.
        """
        try:
            if self.gallery:
                self.gallery.delete()
        except Library.DoesNotExist:
            pass
        super().delete(*args, **kwargs)
```

### 2. Crear ModelForm

```python
# forms.py
from django import forms
from django_attachments.models import Library
from .models import Product


class ProductForm(forms.ModelForm):
    """Form for Product with automatic Library initialization."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['gallery'].required = False
    
    def save(self, commit=True):
        obj = super().save(commit=False)
        
        # Create Library if it doesn't exist
        if not obj.gallery_id:
            library = Library()
            library.save()
            obj.gallery = library
        
        if commit:
            obj.save()
        return obj
    
    class Meta:
        model = Product
        fields = '__all__'
```

### 3. Configurar Admin

```python
# admin.py
from django.contrib import admin
from django_attachments.admin import AttachmentsAdminMixin
from .models import Product
from .forms import ProductForm


@admin.register(Product)
class ProductAdmin(AttachmentsAdminMixin, admin.ModelAdmin):
    """
    Admin for Product with gallery support.
    
    AttachmentsAdminMixin provides:
    - Custom widgets for GalleryField (drag & drop, ordering)
    - AJAX upload functionality
    - Thumbnail previews
    """
    form = ProductForm
    
    list_display = ('name', 'price')
    
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'price')
        }),
        ('Gallery', {
            'fields': ('gallery',),
            'description': 'Drag and drop images to reorder. Click to edit.'
        }),
    )
    
    def delete_queryset(self, request, queryset):
        """
        Override bulk delete to use model's delete() method.
        
        IMPORTANT: Default queryset.delete() bypasses model's
        delete() method, leaving orphan gallery files.
        """
        for obj in queryset:
            obj.delete()
```

---

## 🎨 Ejemplo con Múltiples Galerías

```python
# models/home.py
from django.db import models
from django_attachments.fields import GalleryField
from django_attachments.models import Library


class Home(models.Model):
    """Home page with multiple gallery sections."""
    
    title = models.CharField(max_length=255)
    
    # Multiple galleries
    carousel_gallery = GalleryField(
        related_name='home_carousel',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    featured_gallery = GalleryField(
        related_name='home_featured',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    testimonials_gallery = GalleryField(
        related_name='home_testimonials',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    def delete(self, *args, **kwargs):
        """Clean up ALL associated galleries."""
        galleries = [
            self.carousel_gallery,
            self.featured_gallery,
            self.testimonials_gallery
        ]
        for gallery in galleries:
            try:
                if gallery:
                    gallery.delete()
            except Library.DoesNotExist:
                pass
        super().delete(*args, **kwargs)
```

---

## 📡 Serializers para API

Para exponer las imágenes de galería en tu API REST:

```python
# serializers/product_serializers.py
from rest_framework import serializers
from ..models import Product


class ProductDetailSerializer(serializers.ModelSerializer):
    """Full serializer with all gallery images."""
    gallery_images = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = '__all__'
    
    def get_gallery_images(self, obj):
        """
        Get all images from the gallery with metadata.
        
        Returns:
            list: Array of image objects with URLs and metadata.
        """
        request = self.context.get('request')
        if not request or not obj.gallery:
            return []
        
        images = []
        for attachment in obj.gallery.attachment_set.order_by('rank'):
            if attachment.file:
                images.append({
                    'id': attachment.id,
                    'url': request.build_absolute_uri(attachment.file.url),
                    'thumbnail_url': request.build_absolute_uri(
                        attachment.file['medium'].url
                    ) if attachment.is_image else None,
                    'original_name': attachment.original_name,
                    'title': attachment.title or '',
                    'caption': attachment.caption or '',
                    'width': attachment.image_width,
                    'height': attachment.image_height,
                    'filesize': attachment.filesize,
                    'rank': attachment.rank,
                    'is_image': attachment.is_image,
                })
        return images
```

---

## 🚨 Puntos Importantes

### ⚠️ SIEMPRE implementar delete()

```python
def delete(self, *args, **kwargs):
    """Clean up gallery to avoid orphan files."""
    try:
        if self.gallery:
            self.gallery.delete()
    except Library.DoesNotExist:
        pass
    super().delete(*args, **kwargs)
```

### ⚠️ SIEMPRE usar AttachmentsAdminMixin

```python
class MyModelAdmin(AttachmentsAdminMixin, admin.ModelAdmin):
    # ...
```

### ⚠️ SIEMPRE override delete_queryset en admin

```python
def delete_queryset(self, request, queryset):
    """Use model's delete() for cleanup."""
    for obj in queryset:
        obj.delete()
```

---

## 📝 Campos Disponibles

| Campo | Uso | Descripción |
|-------|-----|-------------|
| `GalleryField` | Múltiples imágenes | Galería completa con reordenamiento |
| `LibraryField` | Adjuntos generales | Archivos de cualquier tipo |
| `SingleImageField` | Una imagen | Galería limitada a 1 imagen |

---

## 🎬 Flujo de Trabajo

1. **Crear modelo** con `GalleryField`
2. **Implementar `delete()`** para limpieza
3. **Crear ModelForm** que inicialice Library
4. **Configurar Admin** con `AttachmentsAdminMixin`
5. **Override `delete_queryset`** en admin
6. **Crear serializer** con `get_gallery_images()`

---

## 📚 Referencia de Modelos

### Library
Contenedor de attachments (galería).

**Campos:**
- `title`: Nombre opcional de la galería
- `primary_attachment`: Imagen principal (auto-actualizada)

### Attachment
Archivo individual dentro de una galería.

**Campos:**
- `library`: Galería a la que pertenece
- `rank`: Orden dentro de la galería
- `file`: Archivo (ThumbnailerField)
- `original_name`: Nombre original del archivo
- `title`: Título opcional
- `caption`: Descripción opcional
- `image_width` / `image_height`: Dimensiones (si es imagen)
- `mimetype`: Tipo MIME del archivo

**Métodos:**
- `is_image`: Property que indica si es una imagen
- `move_to(position)`: Mover a una posición específica

---

## 🔗 URLs

No requiere configuración manual de URLs - el admin las registra automáticamente.

---

## 🧪 Testing

Ejemplo de test para verificar limpieza de galerías:

```python
from django.test import TestCase
from .models import Product
from django_attachments.models import Library


class ProductGalleryTest(TestCase):
    def test_gallery_cleanup_on_delete(self):
        """Test that gallery is deleted when product is deleted."""
        product = Product.objects.create(name='Test')
        library = Library.objects.create()
        product.gallery = library
        product.save()
        
        library_id = library.id
        product.delete()
        
        # Library should be deleted
        self.assertFalse(Library.objects.filter(id=library_id).exists())
```

---

## 🎯 Ejemplo Completo

Ver ejemplo completo en: `/backend/docs/DJANGO_ATTACHMENTS_EXAMPLE.md`

---

## 📞 Soporte

Para issues o dudas sobre django_attachments:
- Repositorio original: https://github.com/carlos18bp/django-attachments
- Fork base: mireq/django-attachments

---

**Versión:** 1.0  
**Última actualización:** Febrero 2026
