from rest_framework.serializers import ModelSerializer

from apps.task_manager.models import Project


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name']
