from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include


def index(request):
    return render(request, 'index.html')


urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('api/v1beta/', include('apps.task_manager.api.urls')),
    path('api/v2beta/', include('apps.users.api.urls'))
]

