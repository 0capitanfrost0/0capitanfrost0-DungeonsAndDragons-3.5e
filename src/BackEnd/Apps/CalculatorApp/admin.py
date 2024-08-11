from django.contrib import admin
from .models import *
from import_export import resources
from import_export.admin import ImportExportModelAdmin

class HechizoResource(resources.ModelResource):
    class Meta:
       model = Hechizo

class HechizoAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('nombre','escuela','descriptor','clase_nivel','componentes','tiempo_de_lanzamiento','rango','objetivo','efecto','duracion','tirada_de_salvacion','resistencia_de_hechizos')
    list_filter = ('nombre','escuela','descriptor','clase_nivel','componentes','tiempo_de_lanzamiento','rango','objetivo','efecto','duracion','tirada_de_salvacion','resistencia_de_hechizos')
    search_fields = ('nombre','escuela','descriptor','clase_nivel','clase','componentes','tiempo_de_lanzamiento','rango','objetivo','efecto','duracion','tirada_de_salvacion','resistencia_de_hechizos')
    resource_class = HechizoResource


class ListaFavoritosAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'usuario')
    filter_horizontal = ('hechizos',)

admin.site.register(ListaFavoritos, ListaFavoritosAdmin)
admin.site.register(Hechizo, HechizoAdmin)
