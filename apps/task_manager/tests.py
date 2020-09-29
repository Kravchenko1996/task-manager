from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from apps.task_manager.models import Project, Task


def user_data():
    return {
        'username': 'test',
        'password': 'test',
        'email': 'test@email.com'
    }


class BaseTaskManagerTestCase(TestCase):
    def setUp(self) -> None:
        super(BaseTaskManagerTestCase, self).setUp()

        user = user_data()
        user.update({'password': make_password(user['password'])})

        self.test_user = User.objects.create(**user)
        self.test_project = Project.objects.create(name='test', user=self.test_user)
        self.api_client = APIClient()
        self.api_client.force_authenticate(self.test_user)


class TodoListTestCase(BaseTaskManagerTestCase):

    def test_success_retrieve_projects_list(self):
        response = self.api_client.get('/api/v1beta/projects')

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.data), 1)

    def test_success_create_project(self):
        response = self.api_client.post(
            '/api/v1beta/create-project',
            {'name': 'test_2'},
            format='json'
        )

        self.assertEqual(201, response.status_code)
        self.assertIn('id', response.data)
        self.assertIn('user', response.data)

    def test_failure_create_project_name_exists(self):
        response = self.api_client.post(
            '/api/v1beta/create-project',
            {'name': 'test'},
            format='json'
        )

        self.assertEqual(400, response.status_code)

    def test_success_edit_project_name(self):
        response = self.api_client.put(
            f'/api/v1beta/edit-project/{self.test_project.id}',
            {'name': 'test_changed'},
            format='json'
        )

        self.assertEqual(200, response.status_code)
        self.assertEqual('test_changed', response.data['name'])

    def test_success_delete_project(self):
        response = self.api_client.delete(
            f'/api/v1beta/delete-project/{self.test_project.id}'
        )

        self.assertEqual(204, response.status_code)


class TaskTestCase(BaseTaskManagerTestCase):
    def setUp(self) -> None:
        super(TaskTestCase, self).setUp()

        self.task = Task.objects.create(
            name='test_task',
            status=True,
            deadline='2020-01-01',
            order=0,
            project=self.test_project
        )

    def test_success_retrieve_tasks_list(self):
        response = self.api_client.get(f'/api/v1beta/tasks/{self.test_project.id}')

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.data), 1)

    def test_success_create_task(self):
        response = self.api_client.post(
            '/api/v1beta/create-task',
            {'name': 'test_task',
             'status': True,
             'deadline': '2020-01-01',
             'order': 0,
             'project': self.test_project.id},
            format='json'
        )

        self.assertEqual(201, response.status_code)
        self.assertIn('project', response.data)

    def test_success_edit_task(self):
        response = self.api_client.put(
            f'/api/v1beta/edit-task/{self.task.id}',
            {'name': 'test_task_changed',
             'status': False,
             'deadline': '2019-02-02',
             'order': 1,
             'project': self.test_project.id},
            format='json'
        )

        self.assertEqual(200, response.status_code)
        self.assertEqual('test_task_changed', response.data['name'])
        self.assertEqual(False, response.data['status'])
        self.assertEqual('2019-02-02', response.data['deadline'])
        self.assertEqual(1, response.data['order'])

    def test_success_delete_task(self):
        response = self.api_client.delete(
            f'/api/v1beta/delete-task/{self.task.id}',
        )

        self.assertEqual(204, response.status_code)
