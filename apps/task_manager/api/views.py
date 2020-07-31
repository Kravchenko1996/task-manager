from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, DestroyAPIView

from apps.task_manager.api.serializers import ProjectSerializer
from apps.task_manager.models import Project


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
