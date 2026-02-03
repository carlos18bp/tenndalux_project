from django.utils.text import slugify


def generate_unique_slug(model_cls, base_value, *, instance_pk=None, slug_field_name='slug'):
    base_slug = slugify(base_value)[:200] or 'item'
    slug = base_slug
    i = 2

    lookup = {slug_field_name: slug}
    qs = model_cls.objects.all()
    if instance_pk is not None:
        qs = qs.exclude(pk=instance_pk)

    while qs.filter(**lookup).exists():
        suffix = f"-{i}"
        slug = f"{base_slug[: (200 - len(suffix))]}{suffix}"
        lookup[slug_field_name] = slug
        i += 1

    return slug
