from rest_framework import serializers
from .models import *

class HechizoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hechizo
        fields = '__all__'


class ListaFavoritosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListaFavoritos
        fields = '__all__'