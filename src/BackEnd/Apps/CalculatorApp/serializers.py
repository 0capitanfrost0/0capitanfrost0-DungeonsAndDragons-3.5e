from rest_framework import serializers
from .models import Hechizo

class HechizoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hechizo
        fields = '__all__'
