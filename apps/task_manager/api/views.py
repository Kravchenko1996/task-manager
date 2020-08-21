from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from apps.task_manager.api.serializers import ProjectSerializer, TaskSerializer, TaskListSerializer
from apps.task_manager.models import Project, Task


def home_page(request):
    return HttpResponse("Hello, world!")


class ToDoListsListAPIView(ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class CreateToDoListAPIView(CreateAPIView):
    serializer_class = ProjectSerializer


class EditToDoListAPIVIew(UpdateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class DeleteToDoListAPIView(DestroyAPIView):
    queryset = Project.objects.all()


class TasksListAPIView(ListAPIView):
    serializer_class = TaskListSerializer
    queryset = Task.objects.order_by('order')

    # def get_queryset(self):
    #     lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
    #     return Task.objects.filter(project_id=self.kwargs[lookup_url_kwarg])


class TaskCreateAPIView(CreateAPIView):
    serializer_class = TaskSerializer


class EditTaskAPIVIew(UpdateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class DeleteTaskAPIView(DestroyAPIView):
    queryset = Task.objects.all()

