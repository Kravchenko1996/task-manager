# Generated by Django 3.0.6 on 2020-08-06 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task_manager', '0004_task_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasks',
            name='deadline',
            field=models.DateField(blank=True, null=True),
        ),
    ]
