from django.contrib.auth.models import User
from django.db import models
from django.db.models import Model


class Project(models.Model):
    name = models.CharField(max_length=200, unique=True)
    # TODO delete unique True and test for it
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=200)
    status = models.BooleanField(default=False)
    deadline = models.DateField(null=True, blank=True)
    order = models.IntegerField(default=0)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name

