from datetime import timezone
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from django.conf import settings

error_img_url = "https://www.shutterstock.com/image-vector/error-500-page-empty-symbol-260nw-1711106146.jpg"

class Marca(models.Model):
    nombre = models.CharField(max_length=50)
    imagen_url = models.URLField(default=error_img_url)

    def __str__(self):
        return self.nombre

class Prenda(models.Model):
    id = models.AutoField(primary_key=True)
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    descripcion = models.TextField(max_length=100)
    imagen_url = models.URLField(default=error_img_url)
    talla_choices = [
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
    ]
    talla = models.CharField(max_length=3, choices=talla_choices)
    cantidad_stock = models.PositiveIntegerField(default=0)
    material_choices = [
        ('Algodón', 'Algodón'),
        ('Poliéster', 'Poliéster'),
        ('Lino', 'Lino'),
        ('Lana', 'Lana'),
        ('Seda', 'Seda'),
        ('Nylon', 'Nylon'),
        ('Lycra', 'Lycra'),
    ]
    material = models.CharField(max_length=50, choices=material_choices)
    precio_original = models.DecimalField(max_digits=10, decimal_places=2)
    precio_rebajado = models.DecimalField(max_digits=10, decimal_places=2, blank=True, default=0.0)
    fecha_publicacion = models.DateTimeField(auto_now_add=True, auto_now=False)
    tipo_prenda_choices = [
        ('Sudaderas', 'Sudaderas'),
        ('Camisas', 'Camisas'),
        ('Camisetas', 'Camisetas'),
        ('Polos', 'Polos'),
        ('Pantalón', 'Pantalón'),
        ('Top', 'Top'),
        ('Faldas', 'Faldas'),
        ('Vestidos', 'Vestidos'),
        ('Calcetines', 'Calcetines'),
        ('Calzado', 'Calzado'),
        ('Baño', 'Baño'),
        ('Accesorios', 'Accesorios'),
    ]
    tipo_prenda = models.CharField(max_length=50, choices=tipo_prenda_choices, default='Camisetas')
    color_choices = [
        ('Amarillo', 'Amarillo'),
        ('Azul', 'Azul'),
        ('Azul Celeste', 'Azul Celeste'),
        ('Azul Eléctrico', 'Azul Eléctrico'),
        ('Azul Marino', 'Azul Marino'),
        ('Azul Oscuro', 'Azul Oscuro'),
        ('Azul Turquesa', 'Azul Turquesa'),
        ('Beige', 'Beige'),
        ('Blanco', 'Blanco'),
        ('Blanco Roto', 'Blanco Roto'),
        ('Blanco y Negro', 'Blanco y Negro'),
        ('Caqui', 'Caqui'),
        ('Coral', 'Coral'),
        ('Granate', 'Granate'),
        ('Gris', 'Gris'),
        ('Gris Oscuro', 'Gris Oscuro'),
        ('Lila', 'Lila'),
        ('Marrón', 'Marrón'),
        ('Multicolor', 'Multicolor'),
        ('Naranja', 'Naranja'),
        ('Negro', 'Negro'),
        ('Oro', 'Oro'),
        ('Plata', 'Plata'),
        ('Rojo', 'Rojo'),
        ('Rosa', 'Rosa'),
        ('Verde', 'Verde'),
        ('Verde Oscuro', 'Verde Oscuro'),
    ]
    color = models.CharField(max_length=20, choices=color_choices, default='Blanco')
    genero_choices = [
        ('Hombre', 'Hombre'),
        ('Mujer', 'Mujer'),
        ('Niño', 'Niño'),
        ('Niña', 'Niña'),
    ]
    genero = models.CharField(max_length=6, choices=genero_choices, default='Hombre')

    def __str__(self):
        return f'{self.tipo_prenda} - {self.marca}'

    class Meta:
        verbose_name = 'Prenda'
        verbose_name_plural = 'Prendas'


class Noticia(models.Model):
    titulo = models.CharField(max_length=50)
    descripcion_corta = models.CharField(max_length=50)
    autor = models.CharField(max_length=50)
    fecha = models.DateField('Fecha de Creacion', auto_now=False, auto_now_add=True)
    imagen_url = models.URLField(default=error_img_url)
    contenido = CKEditor5Field(null=True, blank=True, config_name='extends')

    def __str__(self):
        return self.titulo


