from rest_framework.serializers import ModelSerializer

from apps.task_manager.models import Project, Task


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name']


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'status', 'deadline', 'project']


class TaskListSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'status', 'deadline', 'project']

    def get_project(self, instance: Task):
        return ProjectSerializer(instance.project).data
