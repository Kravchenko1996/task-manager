from django.contrib import admin
from django.shortcuts import render, redirect
from django.urls import path, include, reverse

urlpatterns = [
    path('', lambda x: render(x, 'index.html'), name='home'),
    path('admin/', admin.site.urls),
    path('api/v1beta/', include('apps.task_manager.api.urls')),
    path('api/v2beta/', include('apps.users.api.urls')),
    path('<path:resource>', lambda request, resource: redirect(reverse('home')))
]
