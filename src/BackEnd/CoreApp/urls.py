from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from Auth.views import *
from ClothApp.views import *
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api/create-admin/', create_admin_user, name='create-admin'),
    path('docs/', include_docs_urls(title="API")),

    #Auth
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    #Auth
    
    path('api/clothes/', PrendaCreateView.as_view(), name='prenda-create-list'),
    path('api/clothes-details/<int:id>/', PrendaRetrieveView.as_view(), name='prenda-detail'),
    path('api/clothes/sales/', PrendasConDescuentoView.as_view(), name='prendas-rebajas'),
    path('api/clothes/news/', NovedadesListView.as_view(), name='prendas-novedades'),
    path('api/clothes/<str:tipo_prenda>/', PrendaTipoListView.as_view(), name='prenda-tipo-list'),

    path('api/brands/', MarcaCreateView.as_view(), name='marca-create-list'),
    path('api/brands/<str:marca>/', PrendasPorMarcaListView.as_view(), name='prenda-marca-list'),

    path('api/news/', NoticiaCreateView.as_view(), name='noticia-create-list'),
    path('api/news/<int:id>/', NoticiaRetrieveView.as_view(), name='noticia-detail'),
    
    path('api/contact/', EmailAPIView.as_view(), name='contact-us'),

    # CKEDITOR
    path("ckeditor5/", include("django_ckeditor_5.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
