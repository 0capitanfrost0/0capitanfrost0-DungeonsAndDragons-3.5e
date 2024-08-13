from rest_framework import generics
from .models import *
from .serializers import *

class HechizoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Hechizo.objects.all()
    serializer_class = HechizoSerializer

class HechizoDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hechizo.objects.all()
    serializer_class = HechizoSerializer
    lookup_field = 'nombre'

# Cambiar a RetrieveAPIView para obtener hechizo por ID
class HechizoByIDDetailAPIView(generics.RetrieveAPIView):
    queryset = Hechizo.objects.all()
    serializer_class = HechizoSerializer
    lookup_field = 'pk'  # Se utiliza 'pk' que es el campo por defecto para búsquedas por ID

class ListaFavoritosListCreateAPIView(generics.ListCreateAPIView):
    queryset = ListaFavoritos.objects.all()
    serializer_class = ListaFavoritosSerializer

class ListaFavoritosDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListaFavoritos.objects.all()
    serializer_class = ListaFavoritosSerializer
