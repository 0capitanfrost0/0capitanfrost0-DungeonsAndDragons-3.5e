from rest_framework import serializers
from .models import *

#---------------------Character---------------------
class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = '__all__'


#---------------------Description---------------------
class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = '__all__'


#---------------------Race---------------------
class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Race
        fields = '__all__'

#---------------------Deity---------------------
class DeitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Deity
        fields = '__all__'


#---------------------Size---------------------
class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'

#---------------------Statistics---------------------
class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        fields = '__all__'

#---------------------CharacterAbilities---------------------
class CharacterAbilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterAbilities
        fields = '__all__'

#---------------------Abilities---------------------
class AbilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abilities
        fields = '__all__'

# --------------------- Weapon ---------------------
class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = '__all__'

# --------------------- Equip ---------------------
class EquipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equip
        fields = '__all__'

# --------------------- Inventory ---------------------
class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

# --------------------- Feats ---------------------
class FeatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feats
        fields = '__all__'

# --------------------- Capability ---------------------
class CapabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Capability
        fields = '__all__'

# --------------------- SpellResistance ---------------------
class SpellResistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpellResistance
        fields = '__all__'

# --------------------- Game ---------------------
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'