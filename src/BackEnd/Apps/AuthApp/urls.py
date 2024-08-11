# urls.py
from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [

    #Auth
    path("register/", CreateUserView.as_view(), name="register"),
    path("token/get/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("authenticator/", include("rest_framework.urls")),#login / logout
    path("user/<int:pk>/", UserDetailView.as_view(), name="user_detail_by_id"),  # Get specific user info

    #Auth

]
