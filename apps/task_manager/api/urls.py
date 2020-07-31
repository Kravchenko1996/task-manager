from django.urls import path

from apps.task_manager.api.views import home_page, CreateToDoListAPIView, ToDoListsListAPIView, EditToDoListAPIVIew, \
    DeleteToDoListAPIView

urlpatterns = [
    path('', home_page, name='home'),
    path('todo-lists', ToDoListsListAPIView.as_view()),
    path('todo-list', CreateToDoListAPIView.as_view()),
    path('edit-todo-list/<str:pk>', EditToDoListAPIVIew.as_view()),
    path('delete-todo-list/<str:pk>', DeleteToDoListAPIView.as_view()),
]
