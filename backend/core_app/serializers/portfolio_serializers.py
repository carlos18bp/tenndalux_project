from rest_framework import serializers

from core_app.models import Category, Style, Space, Project


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ['id', 'name', 'slug', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = ['id', 'name', 'slug', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class ProjectSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        source='categories',
        many=True,
        queryset=Category.objects.all(),
        write_only=True,
        required=False,
    )

    styles = StyleSerializer(many=True, read_only=True)
    style_ids = serializers.PrimaryKeyRelatedField(
        source='styles',
        many=True,
        queryset=Style.objects.all(),
        write_only=True,
        required=False,
    )

    spaces = SpaceSerializer(many=True, read_only=True)
    space_ids = serializers.PrimaryKeyRelatedField(
        source='spaces',
        many=True,
        queryset=Space.objects.all(),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'slug',
            'description',
            'location',
            'year',
            'area_sqm',
            'featured',
            'is_published',
            'gallery',
            'categories',
            'category_ids',
            'styles',
            'style_ids',
            'spaces',
            'space_ids',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']
