from django.urls import path

from apps.task_manager.api.views import \
    TaskCreateAPIView, TasksListAPIView, EditTaskAPIVIew, DeleteTaskAPIView, \
    DeleteProjectAPIView, EditProjectAPIVIew, CreateProjectAPIView, ProjectsListAPIView

urlpatterns = [
    path('projects', ProjectsListAPIView.as_view()),
    path('create-project', CreateProjectAPIView.as_view()),
    path('edit-project/<str:pk>', EditProjectAPIVIew.as_view()),
    path('delete-project/<str:pk>', DeleteProjectAPIView.as_view()),
    path('tasks/<str:pk>', TasksListAPIView.as_view()),
    path('create-task', TaskCreateAPIView.as_view()),
    path('edit-task/<str:pk>', EditTaskAPIVIew.as_view()),
    path('delete-task/<str:pk>', DeleteTaskAPIView.as_view())
]
