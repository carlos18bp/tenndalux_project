from django.apps import AppConfig


class CoreAppConfig(AppConfig):
    name = 'core_app'

    def ready(self):
        import core_project.tasks  # noqa: F401 — Huey periodic task discovery
