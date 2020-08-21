from django.urls import path
from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token

from apps.users.api.views import CreateUserAPIView

urlpatterns = [
    path('users/', CreateUserAPIView.as_view()),
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
]
