from django.urls import path
from . import views

urlpatterns = [
    path('characters/', views.CharacterListCreateAPIView.as_view(), name='character-list-create'),
    path('characters/<int:pk>/', views.CharacterRetrieveUpdateDestroyAPIView.as_view(), name='character-detail'),

    path('descriptions/', views.DescriptionListCreateAPIView.as_view(), name='description-list-create'),
    path('descriptions/<int:pk>/', views.DescriptionRetrieveUpdateDestroyAPIView.as_view(), name='description-detail'),

    path('races/', views.RaceListCreateAPIView.as_view(), name='race-list-create'),
    path('races/<int:pk>/', views.RaceRetrieveUpdateDestroyAPIView.as_view(), name='race-detail'),

    path('deities/', views.DeityListCreateAPIView.as_view(), name='deity-list-create'),
    path('deities/<int:pk>/', views.DeityRetrieveUpdateDestroyAPIView.as_view(), name='deity-detail'),

    path('sizes/', views.SizeListCreateAPIView.as_view(), name='size-list-create'),
    path('sizes/<int:pk>/', views.SizeRetrieveUpdateDestroyAPIView.as_view(), name='size-detail'),

    path('statistics/', views.StatisticsListCreateAPIView.as_view(), name='statistics-list-create'),
    path('statistics/<int:pk>/', views.StatisticsRetrieveUpdateDestroyAPIView.as_view(), name='statistics-detail'),

    path('character-abilities/', views.CharacterAbilitiesListCreateAPIView.as_view(), name='character-abilities-list-create'),
    path('character-abilities/<int:pk>/', views.CharacterAbilitiesRetrieveUpdateDestroyAPIView.as_view(), name='character-abilities-detail'),
    
    path('abilities/', views.AbilitiesListCreateAPIView.as_view(), name='abilities-list-create'),
    path('abilities/<int:pk>/', views.AbilitiesRetrieveUpdateDestroyAPIView.as_view(), name='abilities-detail'),

    path('weapons/', views.WeaponListCreateAPIView.as_view(), name='weapons-list-create'),
    path('weapons/<int:pk>/', views.WeaponRetrieveUpdateDestroyAPIView.as_view(), name='weapons-detail'),

    path('equipped-objects/', views.EquipListCreateAPIView.as_view(), name='equipped-objects-list-create'),
    path('equipped-objects/<int:pk>/', views.EquipRetrieveUpdateDestroyAPIView.as_view(), name='equipped-objects-detail'),

    path('inventory/', views.InventoryListCreateAPIView.as_view(), name='inventory-list-create'),
    path('inventory/<int:pk>/', views.InventoryRetrieveUpdateDestroyAPIView.as_view(), name='inventory-detail'),

    path('feats/', views.FeatsListCreateAPIView.as_view(), name='feats-list-create'),
    path('feats/<int:pk>/', views.FeatsRetrieveUpdateDestroyAPIView.as_view(), name='feats-detail'),

    path('capability/', views.CapabilityListCreateAPIView.as_view(), name='capability-list-create'),
    path('capability/<int:pk>/', views.CapabilityRetrieveUpdateDestroyAPIView.as_view(), name='capability-detail'),

    path('spell-resistance/', views.SpellResistanceListCreateAPIView.as_view(), name='spell-resistance-list-create'),
    path('spell-resistance/<int:pk>/', views.SpellResistanceRetrieveUpdateDestroyAPIView.as_view(), name='spell-resistance-detail'),

    path('game/', views.GameListCreateAPIView.as_view(), name='game-list-create'),
    path('game/<int:pk>/', views.GameRetrieveUpdateDestroyAPIView.as_view(), name='game-detail'),

]
