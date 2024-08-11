from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('spells/', views.HechizoListCreateAPIView.as_view(), name='spell-list-create'),
    path('spells/<str:nombre>/', views.HechizoDetailAPIView.as_view(), name='spell-detail'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
