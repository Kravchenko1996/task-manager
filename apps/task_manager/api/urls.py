from django.urls import path

from apps.task_manager.api.views import home_page, \
    CreateToDoListAPIView, ToDoListsListAPIView, EditToDoListAPIVIew, DeleteToDoListAPIView, \
    TaskCreateAPIView, TasksListAPIView, EditTaskAPIVIew, DeleteTaskAPIView

urlpatterns = [
    path('', home_page, name='home'),
    path('todo-lists', ToDoListsListAPIView.as_view()),
    path('create-todo-list', CreateToDoListAPIView.as_view()),
    path('edit-todo-list/<str:pk>', EditToDoListAPIVIew.as_view()),
    path('delete-todo-list/<str:pk>', DeleteToDoListAPIView.as_view()),
    path('tasks/<str:pk>', TasksListAPIView.as_view()),
    path('create-tasks', TaskCreateAPIView.as_view()),
    path('edit-task/<str:pk>', EditTaskAPIVIew.as_view()),
    path('delete-tasks/<str:pk>', DeleteTaskAPIView.as_view())
]
