from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
#---------------------Character---------------------

class CharacterListCreateAPIView(generics.ListCreateAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class CharacterRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

#---------------------Description---------------------

class DescriptionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Description.objects.all()
    serializer_class = DescriptionSerializer

class DescriptionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Description.objects.all()
    serializer_class = DescriptionSerializer

#---------------------Race---------------------

class RaceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Race.objects.all()
    serializer_class = RaceSerializer

class RaceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Race.objects.all()
    serializer_class = RaceSerializer


#---------------------Deity---------------------

class DeityListCreateAPIView(generics.ListCreateAPIView):
    queryset = Deity.objects.all()
    serializer_class = DeitySerializer

class DeityRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Deity.objects.all()
    serializer_class = DeitySerializer


#---------------------Size---------------------

class SizeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer

class SizeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer

#---------------------Statistics---------------------

class StatisticsListCreateAPIView(generics.ListCreateAPIView):
    queryset = Statistics.objects.all()
    serializer_class = StatisticsSerializer

class StatisticsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Statistics.objects.all()
    serializer_class = StatisticsSerializer

#---------------------CharacterAbilities---------------------

class CharacterAbilitiesListCreateAPIView(generics.ListCreateAPIView):
    queryset = CharacterAbilities.objects.all()
    serializer_class = CharacterAbilitiesSerializer

class CharacterAbilitiesRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CharacterAbilities.objects.all()
    serializer_class = CharacterAbilitiesSerializer

#---------------------Abilities---------------------

class AbilitiesListCreateAPIView(generics.ListCreateAPIView):
    queryset = Abilities.objects.all()
    serializer_class = AbilitiesSerializer

class AbilitiesRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Abilities.objects.all()
    serializer_class = AbilitiesSerializer


# --------------------- Weapons ---------------------
class WeaponListCreateAPIView(generics.ListCreateAPIView):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer

class WeaponRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer

# --------------------- Equip ---------------------
class EquipListCreateAPIView(generics.ListCreateAPIView):
    queryset = Equip.objects.all()
    serializer_class = EquipSerializer

class EquipRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Equip.objects.all()
    serializer_class = EquipSerializer

# --------------------- Inventory ---------------------
class InventoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class InventoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

# --------------------- Feats ---------------------
class FeatsListCreateAPIView(generics.ListCreateAPIView):
    queryset = Feats.objects.all()
    serializer_class = FeatsSerializer

class FeatsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feats.objects.all()
    serializer_class = FeatsSerializer

# --------------------- Capability ---------------------
class CapabilityListCreateAPIView(generics.ListCreateAPIView):
    queryset = Capability.objects.all()
    serializer_class = CapabilitySerializer

class CapabilityRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Capability.objects.all()
    serializer_class = CapabilitySerializer

# --------------------- SpellResistance ---------------------
class SpellResistanceListCreateAPIView(generics.ListCreateAPIView):
    queryset = SpellResistance.objects.all()
    serializer_class = SpellResistanceSerializer

class SpellResistanceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SpellResistance.objects.all()
    serializer_class = SpellResistanceSerializer

# --------------------- Game ---------------------
class GameListCreateAPIView(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer