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
    
    path('users/id/<int:pk>/', UserByIDDetailView.as_view(), name='user-detail-by-id'),
    path('users/<str:username>/', UserByUsernameDetailView.as_view(), name='user-detail-by-username'),
    path("user/", UserDetailView.as_view(), name="log_user_detail"),  # Get specific user info
    #Auth

]

