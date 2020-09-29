from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include

urlpatterns = [
    path('', lambda x: render(x, 'index.html')),
    path('admin/', admin.site.urls),
    path('api/v1beta/', include('apps.task_manager.api.urls')),
    path('api/v2beta/', include('apps.users.api.urls'))
]
