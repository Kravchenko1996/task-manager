from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, DestroyAPIView

from apps.task_manager.api.serializers import ProjectSerializer, TaskSerializer, TaskListSerializer, \
    EditProjectSerializer
from apps.task_manager.models import Project, Task


class ProjectsListAPIView(ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)


class CreateProjectAPIView(CreateAPIView):
    serializer_class = ProjectSerializer

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return self.create(request, *args, **kwargs)


class EditProjectAPIVIew(UpdateAPIView):
    serializer_class = EditProjectSerializer
    queryset = Project.objects.all()


class DeleteProjectAPIView(DestroyAPIView):
    queryset = Project.objects.all()


class TasksListAPIView(ListAPIView):
    serializer_class = TaskListSerializer

    def get_queryset(self):
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        return Task.objects.filter(project_id=self.kwargs[lookup_url_kwarg]).order_by('order')


class TaskCreateAPIView(CreateAPIView):
    serializer_class = TaskSerializer


class EditTaskAPIVIew(UpdateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class DeleteTaskAPIView(DestroyAPIView):
    queryset = Task.objects.all()
