from django.db import models
from django.db.models import Model


class Project(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self) -> str:
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=200)
    status = models.BooleanField(default=False)
    deadline = models.DateField(null=True, blank=True)
    # completed = models.BooleanField
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name
