from rest_framework import serializers
from .models import *

class HechizoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hechizo
        fields = '__all__'


class ListaFavoritosSerializer(serializers.ModelSerializer):
    hechizos = HechizoSerializer(many=True, read_only=True)

    class Meta:
        model = ListaFavoritos
        fields = ['id', 'nombre', 'usuario', 'hechizos']