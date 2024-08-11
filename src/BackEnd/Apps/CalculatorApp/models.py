from django.db import models
from PIL import Image  # Asegúrate de tener Pillow instalado

class Hechizo(models.Model):
    nombre = models.CharField(max_length=200, blank=True, null=True)
    clase_nivel = models.JSONField(default=dict, blank=True, null=True)  # Diccionario para almacenar clases y niveles
    escuela = models.CharField(max_length=200, blank=True, null=True)
    subescuela = models.CharField(max_length=200, blank=True, null=True)
    descriptor = models.CharField(max_length=200, blank=True, null=True)
    componentes = models.CharField(max_length=200, blank=True, null=True)
    tiempo_de_lanzamiento = models.CharField(max_length=200, blank=True, null=True)
    rango = models.CharField(max_length=200, blank=True, null=True)
    objetivo = models.CharField(max_length=200, blank=True, null=True)
    efecto = models.CharField(max_length=200, blank=True, null=True)
    duracion = models.CharField(max_length=200, blank=True, null=True)
    tirada_de_salvacion = models.CharField(max_length=200, blank=True, null=True)
    resistencia_de_hechizos = models.CharField(max_length=200, blank=True, null=True)
    descripcion_corta = models.CharField(max_length=200, blank=True, null=True)
    descripcion_completa = models.TextField(blank=True, null=True)
    
    imagen_1 = models.ImageField(upload_to='images/spell_images/', blank=True, null=True)
    imagen_2 = models.ImageField(upload_to='images/spell_images/', blank=True, null=True)
    imagen_3 = models.ImageField(upload_to='images/spell_images/', blank=True, null=True)
    imagen_4 = models.ImageField(upload_to='images/spell_images/', blank=True, null=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Hechizo'
        verbose_name_plural = 'Hechizos'
