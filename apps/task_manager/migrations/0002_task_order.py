# Generated by Django 3.0.6 on 2020-08-21 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task_manager', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='order',
            field=models.IntegerField(default=0),
        ),
    ]