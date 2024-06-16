from django.contrib import admin
from .models import *
from import_export import resources # type: ignore
from import_export.admin import ImportExportModelAdmin # type: ignore

class PrendaResource(resources.ModelResource):
    class Meta:
       model=Prenda

class PrendaAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    
    search_fields = [
        'id','marca',
    'material', 'tipo_prenda', 
    'color', 'genero'
    ] #Barra de busqueda por titulo

    list_display = (
        'id', 'marca', 'descripcion', 'talla', 'cantidad_stock',
    'material', 'precio_original', 'precio_rebajado', 'fecha_publicacion',
    'tipo_prenda', 'color', 'genero'
    ) #Importante la "," nombra las columnas

    list_filter=('marca',
    'material', 'tipo_prenda', 
    'color', 'genero')
    
    resource_class= PrendaResource


class MarcaResource(resources.ModelResource):
    class Meta:
       model=Marca

class MarcaAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    
    search_fields = [
        'id','nombre',
    ] #Barra de busqueda por titulo

    list_display = (
        'id','nombre','imagen_url',
    ) #Importante la "," nombra las columnas

    
    resource_class= MarcaResource


class NoticiaResource(resources.ModelResource):
    class Meta:
       model=Noticia

class NoticiaAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    
    search_fields = [
        'id','titulo',
        'autor','fecha',
    ] #Barra de busqueda por titulo

    list_display = (
        'id','titulo','autor'
        ,'fecha','imagen_url',
    ) #Importante la "," nombra las columnas

    date_hierarchy="fecha"
    resource_class= NoticiaResource


admin.site.register(Prenda, PrendaAdmin)
admin.site.register(Marca, MarcaAdmin)
admin.site.register(Noticia, NoticiaAdmin)