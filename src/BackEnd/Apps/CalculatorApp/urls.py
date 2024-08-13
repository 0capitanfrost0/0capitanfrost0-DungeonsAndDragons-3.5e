from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('spells/', views.HechizoListCreateAPIView.as_view(), name='spell-list-create'),
    path('spells/<str:nombre>/', views.HechizoDetailAPIView.as_view(), name='spell-detail'),
    path('spells/id/<int:pk>/', views.HechizoByIDDetailAPIView.as_view(), name='spell-detail-by-id'),

    path('listas-favoritos/', views.ListaFavoritosListCreateAPIView.as_view(), name='lista-favoritos-list-create'),
    path('listas-favoritos/<int:pk>/', views.ListaFavoritosDetailAPIView.as_view(), name='lista-favoritos-detail'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
