from django.shortcuts import get_object_or_404, render
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from django.contrib.auth.models import User
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def get_object(self):
        # Option 1: Return the current user
        return self.request.user

        # Option 2: If you want to get user by ID, uncomment the following lines:
        #user_id = self.kwargs.get("pk")
        #return get_object_or_404(User, pk=user_id)

class UserByUsernameDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_object(self):
        username = self.kwargs.get("username")
        return get_object_or_404(User, username=username)

class UserByIDDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_object(self):
        pk = self.kwargs.get("pk")
        return get_object_or_404(User, pk=pk)
#
#@api_view(['POST'])
#def create_admin_user(request):
#    if request.method == 'POST':
#        username = request.data.get('username')
#        password = request.data.get('password')
#        if not username or not password:
#            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)
#        
#        if User.objects.filter(username=username).exists():
#            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
#        
#        user = User.objects.create_superuser(username=username, password=password)
#        return Response({"message": "Admin user created successfully."}, status=status.HTTP_201_CREATED)
