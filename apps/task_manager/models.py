from django.db import models
from django.db.models import Model


class Project(Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self) -> str:
        return self.name


class Task(Model):
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=50)
    deadline = models.CharField(max_length=100)
    completed = models.BooleanField
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name
