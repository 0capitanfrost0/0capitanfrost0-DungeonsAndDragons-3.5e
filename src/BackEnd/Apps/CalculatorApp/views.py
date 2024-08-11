from rest_framework import generics
from .models import *
from .serializers import *

class HechizoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Hechizo.objects.all()
    serializer_class = HechizoSerializer


class HechizoDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hechizo.objects.all()
    serializer_class = HechizoSerializer
    lookup_field = 'nombre'  # Esto define el campo utilizado para buscar el hechizo (por defecto es 'pk')


class ListaFavoritosListCreateAPIView(generics.ListCreateAPIView):
    queryset = ListaFavoritos.objects.all()
    serializer_class = ListaFavoritosSerializer

class ListaFavoritosDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListaFavoritos.objects.all()
    serializer_class = ListaFavoritosSerializer