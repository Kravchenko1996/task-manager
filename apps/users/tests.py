from django.test import TestCase
from rest_framework.test import APIClient


def user_data():
    return {
        'username': 'test_username',
        'email': 'test@mail.com',
        'password': 'test'
    }


class UserApiTestCase(TestCase):
    def setUp(self) -> None:
        self.api_client = APIClient()

    def test_success_create_user(self):
        user = user_data()
        response = self.api_client.post('/api/v2beta/users/', user, format='json')

        self.assertEqual(201, response.status_code)
        _ = [self.assertEqual(user[key], response.data[key]) for key in user if key != "password"]
