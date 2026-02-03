from rest_framework import serializers

from core_app.models import Service, ProcessStep


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id',
            'title',
            'slug',
            'short_description',
            'full_description',
            'includes',
            'excludes',
            'icon',
            'image',
            'order',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = [
            'id',
            'title',
            'description',
            'duration',
            'deliverables',
            'order',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
