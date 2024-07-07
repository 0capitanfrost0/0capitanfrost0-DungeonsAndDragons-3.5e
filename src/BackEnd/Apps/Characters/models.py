from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.core.exceptions import ValidationError

error_img_url = "https://www.shutterstock.com/image-vector/error-500-page-empty-symbol-260nw-1711106146.jpg"

class SpellResistance(models.Model):
    level = models.CharField(max_length=100, blank=True, null=True)
    saving_throw_CD = models.CharField(max_length=100, blank=True, null=True)
    daily_spells = models.CharField(max_length=100, blank=True, null=True)
    extra_spells = models.CharField(max_length=100, blank=True, null=True)
    known_spells = models.CharField(max_length=100, blank=True, null=True)

class Game(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)

class Capability(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=100, blank=True, null=True)

class Feats(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    requirements = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=100, blank=True, null=True)

class Spell(models.Model):

    name = models.CharField(max_length=100, blank=True, null=True)
    school =  models.CharField(max_length=100, blank=True, null=True)
    subschool= models.CharField(max_length=100, blank=True, null=True)
    descriptor = models.CharField(max_length=100, blank=True, null=True)
    level = models.IntegerField(blank=True, null=True)
    class_list = models.CharField(max_length=100, blank=True, null=True)
    components = models.CharField(max_length=100, blank=True, null=True)
    casting_time = models.CharField(max_length=50, blank=True, null=True)
    range = models.CharField(max_length=100, blank=True, null=True)
    tarjet = models.CharField(max_length=100, blank=True, null=True)
    efect = models.CharField(max_length=100, blank=True, null=True)
    duration = models.CharField(max_length=50, blank=True, null=True)
    saving_throw = models.CharField(max_length=100, blank=True, null=True)
    spell_resistance = models.CharField(max_length=100, blank=True, null=True)
    short_descriptive_text = models.TextField(blank=True, null=True)
    complete_descriptive_text = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Spell'
        verbose_name_plural = 'Spells'

class Class(models.Model):

    name = models.CharField(max_length=100, blank=True, null=True)
    class_spell_list = models.ForeignKey(Spell, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Class'
        verbose_name_plural = 'Classes'

class Inventory(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.CharField(max_length=100, blank=True, null=True)
    weight = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"
    
class Equip(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    armor_bonus = models.CharField(max_length=100, blank=True, null=True)
    dex_cap = models.CharField(max_length=100, blank=True, null=True)
    weight = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)
    speed_cap = models.CharField(max_length=100, blank=True, null=True)
    penalizer = models.CharField(max_length=100, blank=True, null=True)
    spell_cap = models.CharField(max_length=100, blank=True, null=True)
    note = models.CharField(max_length=100, blank=True, null=True)
    special_properties = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"
    
class Weapon(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    attack_bonus = models.CharField(max_length=100, blank=True, null=True)
    damage = models.CharField(max_length=100, blank=True, null=True)
    critic = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)
    range = models.CharField(max_length=100, blank=True, null=True)
    note = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"

class Statistics(models.Model):
    #---------------------------Modifiers---------------------------#
    strength = models.IntegerField(blank=True, null=True)
    strength_mod = models.IntegerField(blank=True, null=True,editable=False)
    strength_temporal = models.IntegerField(blank=True, null=True)
    strength_mod_temporal = models.IntegerField(blank=True, null=True,editable=False)
    
    dexterity = models.IntegerField(blank=True, null=True)
    dexterity_mod = models.IntegerField(blank=True, null=True,editable=False)
    dexterity_temporal = models.IntegerField(blank=True, null=True)
    dexterity_mod_temporal = models.IntegerField(blank=True, null=True,editable=False)

    constitution = models.IntegerField(blank=True, null=True)
    constitution_mod = models.IntegerField(blank=True, null=True,editable=False)
    constitution_temporal = models.IntegerField(blank=True, null=True)
    constitution_mod_temporal = models.IntegerField(blank=True, null=True,editable=False)

    intelligence = models.IntegerField(blank=True, null=True)
    intelligence_mod = models.IntegerField(blank=True, null=True,editable=False)
    intelligence_temporal = models.IntegerField(blank=True, null=True)
    intelligence_mod_temporal = models.IntegerField(blank=True, null=True,editable=False)

    wisdom = models.IntegerField(blank=True, null=True)
    wisdom_mod = models.IntegerField(blank=True, null=True,editable=False)
    wisdom_temporal = models.IntegerField(blank=True, null=True)
    wisdom_mod_temporal = models.IntegerField(blank=True, null=True,editable=False)

    charisma = models.IntegerField(blank=True, null=True)
    charisma_mod = models.IntegerField(blank=True, null=True,editable=False)
    charisma_temporal = models.IntegerField(blank=True, null=True)
    charisma_mod_temporal = models.IntegerField(blank=True, null=True,editable=False)
    #---------------------------End-Modifiers---------------------------#



    hit_points = models.IntegerField(blank=True, null=True) 
    
    #---------------------------End-CA---------------------------#
    armour_class = models.IntegerField(blank=True, null=True,editable=False) 
    armour_class_armor = models.IntegerField(blank=True, null=True) 
    armour_class_shield = models.IntegerField(blank=True, null=True) 
    armour_class_natural_armor = models.IntegerField(blank=True, null=True) 
    armour_class_deflex = models.IntegerField(blank=True, null=True) 
    armour_class_other = models.IntegerField(blank=True, null=True) 
    #---------------------------End-CA---------------------------#

    speed = models.IntegerField(blank=True, null=True) 
    touch_armour_class = models.IntegerField(blank=True, null=True) 
    unaware_armour_class= models.IntegerField(blank=True, null=True)

    initiative = models.IntegerField(blank=True, null=True,editable=False) 
    initiative_other = models.IntegerField(blank=True, null=True) 
    
    base_attack = models.IntegerField(blank=True, null=True) 
    size_mod  = models.IntegerField(blank=True, null=True)  

    grapple = models.IntegerField(blank=True, null=True,editable=False)
    grapple_other = models.IntegerField(blank=True, null=True) 
    
    spell_resistance = models.IntegerField(blank=True, null=True) 
    

    #---------------------------SavingThrows---------------------------#
    strength = models.IntegerField(blank=True, null=True,editable=False)
    reflex = models.IntegerField(blank=True, null=True,editable=False) 
    will = models.IntegerField(blank=True, null=True,editable=False)

    strength_base = models.IntegerField(blank=True, null=True)
    reflex_base = models.IntegerField(blank=True, null=True) 
    will_base = models.IntegerField(blank=True, null=True)
    
    strength_magic = models.IntegerField(blank=True, null=True)
    reflex_magic = models.IntegerField(blank=True, null=True) 
    will_magic = models.IntegerField(blank=True, null=True)

    strength_other = models.IntegerField(blank=True, null=True)
    reflex_other = models.IntegerField(blank=True, null=True) 
    will_other = models.IntegerField(blank=True, null=True)

    strength_temporal = models.IntegerField(blank=True, null=True)
    reflex_temporal = models.IntegerField(blank=True, null=True) 
    will_temporal = models.IntegerField(blank=True, null=True)
    #---------------------------End-SavingThrows---------------------------#



    MODIFIER_DICT = {
        1: -5, 2: -4, 3: -4, 4: -3, 5: -3, 6: -2, 7: -2, 8: -1, 9: -1, 
        10: 0, 11: 0, 12: 1, 13: 1, 14: 2, 15: 2, 16: 3, 17: 3, 18: 4, 
        19: 4, 20: 5, 21: 5, 22: 6, 23: 6, 24: 7, 25: 7, 26: 8, 27: 8, 
        28: 9, 29: 9, 30: 10
    }

    def calculate_mod(self, score):
        return self.MODIFIER_DICT.get(score, "Invalid score")

    def generateModifiers(self):
        # Calculate modifier
        if self.strength is not None:
            self.strength_mod = self.calculate_mod(self.strength)
        if self.dexterity is not None:
            self.dexterity_mod = self.calculate_mod(self.dexterity)
        if self.constitution is not None:
            self.constitution_mod = self.calculate_mod(self.constitution)
        if self.intelligence is not None:
            self.intelligence_mod = self.calculate_mod(self.intelligence)
        if self.wisdom is not None:
            self.wisdom_mod = self.calculate_mod(self.wisdom)
        if self.charisma is not None:
            self.charisma_mod = self.calculate_mod(self.charisma)

        # Calculate temporal modifier 
        if self.strength_temporal is not None:
            self.strength_mod_temporal = self.calculate_mod(self.strength_temporal)
        if self.dexterity_temporal is not None:
            self.dexterity_mod_temporal = self.calculate_mod(self.dexterity_temporal)
        if self.constitution_temporal is not None:
            self.constitution_mod_temporal = self.calculate_mod(self.constitution_temporal)
        if self.intelligence_temporal is not None:
            self.intelligence_mod_temporal = self.calculate_mod(self.intelligence_temporal)
        if self.wisdom_temporal is not None:
            self.wisdom_mod_temporal = self.calculate_mod(self.wisdom_temporal)
        if self.charisma_temporal is not None:
            self.charisma_mod_temporal = self.calculate_mod(self.charisma_temporal)

        # Calculate armour_class
        armour_class_armor_value=self.armour_class_armor or 0 
        armour_class_shield_value=self.armour_class_shield or 0 
        armour_class_natural_armor_value=self.armour_class_natural_armor or 0 
        armour_class_deflex_value=self.armour_class_deflex or 0 
        armour_class_other_value=self.armour_class_other or 0
        self.armour_class = 10 + armour_class_armor_value + armour_class_shield_value + armour_class_natural_armor_value + armour_class_deflex_value + armour_class_other_value
        
        # Calculate grapple
        base_attack_value = self.base_attack or 0
        size_mod_value = self.size_mod or 0
        grapple_other_value = self.grapple_other or 0
        strength_mod_value=self.strength_mod or 0
        strength_mod_temporal_value=self.strength_mod_temporal or 0
        strength_mod_max = max(strength_mod_value,strength_mod_temporal_value )

        self.grapple = base_attack_value + size_mod_value + grapple_other_value + strength_mod_max

        # Calculate initiative
        dexterity_mod_max = max(self.dexterity_mod or 0, self.dexterity_mod_temporal or 0)
        initiative_other_value = self.initiative_other or 0

        # Calculate saving throws
        self.strength = (self.constitution or 0) +(self.strength_base or 0) + (self.strength_magic or 0) + (self.strength_other or 0) + (self.strength_temporal or 0)
        self.reflex = (self.dexterity or 0) +(self.reflex_base or 0) + (self.reflex_magic or 0) + (self.reflex_other or 0) + (self.reflex_temporal or 0)
        self.will = (self.wisdom or 0) +(self.will_base or 0) + (self.will_magic or 0) + (self.will_other or 0) + (self.will_temporal or 0) 
       
    def clean(self):
        # Asegurarse de que los valores no sean menores de 1
        if self.strength is not None and self.strength < 1:
            raise ValidationError({'strength': 'Strength cannot be less than 1 in 3.5, means it is already dead'})
        if self.dexterity is not None and self.dexterity < 1:
            raise ValidationError({'dexterity': 'Dexterity cannot be less than 1 in 3.5, means it is already dead'})
        if self.constitution is not None and self.constitution < 1:
            raise ValidationError({'constitution': 'Constitution cannot be less than 1 in 3.5, means it is already dead'})
        if self.intelligence is not None and self.intelligence < 1:
            raise ValidationError({'intelligence': 'Intelligence cannot be less than 1 in 3.5, means it is already dead'})
        if self.wisdom is not None and self.wisdom < 1:
            raise ValidationError({'wisdom': 'Wisdom cannot be less than 1 in 3.5, means it is already dead'})
        if self.charisma is not None and self.charisma < 1:
            raise ValidationError({'charisma': 'Charisma cannot be less than 1 in 3.5, means it is already dead'})
        if self.strength_temporal is not None and self.strength_temporal < 1:
            raise ValidationError({'strength_temporal': 'Strength (Temporal) cannot be less than 1 in 3.5, means it is already dead'})
        if self.dexterity_temporal is not None and self.dexterity_temporal < 1:
            raise ValidationError({'dexterity_temporal': 'Dexterity (Temporal) cannot be less than 1 in 3.5, means it is already dead'})
        if self.constitution_temporal is not None and self.constitution_temporal < 1:
            raise ValidationError({'constitution_temporal': 'Constitution (Temporal) cannot be less than 1 in 3.5, means it is already dead'})
        if self.intelligence_temporal is not None and self.intelligence_temporal < 1:
            raise ValidationError({'intelligence_temporal': 'Intelligence (Temporal) cannot be less than 1 in 3.5, means it is already dead'})
        if self.wisdom_temporal is not None and self.wisdom_temporal < 1:
            raise ValidationError({'wisdom_temporal': 'Wisdom (Temporal) cannot be less than 1 in 3.5, means it is already dead'})
        if self.charisma_temporal is not None and self.charisma_temporal < 1:
            raise ValidationError({'charisma_temporal': 'Charisma (Temporal) cannot be less than 1 in 3.5, means it is already dead'})

        if self.hit_points is not None and self.hit_points < -10:
            raise ValidationError({'hit_points': 'Hit Points cannot be less than -10 in 3.5, means it is already dead'})
        
        # Asegurarse de que la velocidad no sea negativa
        if self.speed is not None and self.speed < 0:
            raise ValidationError({'speed': 'Speed cannot be negative'})

    def save(self, *args, **kwargs):
        self.full_clean()  # Validar antes de guardar
        self.generateModifiers()
        super().save(*args, **kwargs)

SIZE_SCORES = {
    "Multa": "+8",
    "Diminutivo": "+4",
    "Enano": "+2",   
    "Pequeño": "+1",
    "Medio": "0",
    "Grande": "-1",
    "Enorme": "-2",
    "Gargantúa": "-4",
    "Colosal": "-8"
}
class Size(models.Model):
    SIZE_CHOICES = [
        ("Multa", "Multa"),
        ("Diminutivo", "Diminutivo"),
        ("Enano", "Enano"),
        ("Pequeño", "Pequeño"),
        ("Medio", "Medio"),
        ("Grande", "Grande"),
        ("Enorme", "Enorme"),
        ("Gargantúa", "Gargantúa"),
        ("Colosal", "Colosal"),
    ]

 
    size = models.CharField(max_length=15, choices=SIZE_CHOICES)
    modifier = models.CharField(max_length=15,editable=False)

    def save(self, *args, **kwargs):
        self.modifier = SIZE_SCORES.get(self.size, "error")  # Obtiene la puntuación basada en el tamaño
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.size}"

class Deity(models.Model):
    name = models.CharField(max_length=30,blank=True, null=True) 
    info = models.TextField(blank=True, null=True) 
    ALIGNMENT_CHOICES = [
        ('Legal Bueno', 'Legal Bueno'),
        ('Legal Neutral', 'Legal Neutral'),
        ('Legal Maligno', 'Legal Maligno'),
        ('Neutral Bueno', 'Neutral Bueno'),
        ('Neutral Neutral', 'Neutral Neutral'),
        ('Neutral Maligno', 'Neutral Maligno'),
        ('Caótico Bueno', 'Caótico Bueno'),
        ('Caótico Neutral', 'Caótico Neutral'),
        ('Caótico Maligno', 'Caótico Maligno'),
    ]
    alignment = models.CharField(max_length=100,choices=ALIGNMENT_CHOICES, blank=True, null=True) 
    
    def __str__(self):
        return self.name

class Race(models.Model):
    intro = models.TextField(blank=True, null=True) 
    race = models.CharField(max_length=30,blank=True, null=True)
    adjustment = models.TextField(blank=True, null=True) 
    traits = models.TextField(blank=True, null=True) 
    
    def __str__(self):
        return self.race
    
class Description(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True) #Nombre
    level = models.IntegerField(blank=True, null=True)             #Nivel
    race = models.ForeignKey(Race, on_delete=models.CASCADE, blank=True, null=True)    
    ALIGNMENT_CHOICES = [
        ('Legal Bueno', 'Legal Bueno'),
        ('Legal Neutral', 'Legal Neutral'),
        ('Legal Maligno', 'Legal Maligno'),
        ('Neutral Bueno', 'Neutral Bueno'),
        ('Neutral Neutral', 'Neutral Neutral'),
        ('Neutral Maligno', 'Neutral Maligno'),
        ('Caótico Bueno', 'Caótico Bueno'),
        ('Caótico Neutral', 'Caótico Neutral'),
        ('Caótico Maligno', 'Caótico Maligno'),
    ]
    alignment = models.CharField(max_length=100,choices=ALIGNMENT_CHOICES, blank=True, null=True) 
    deity = models.ForeignKey(Deity, on_delete=models.CASCADE, blank=True, null=True)    
    size = models.ForeignKey(Size, on_delete=models.CASCADE, blank=True, null=True)    
    age = models.CharField(max_length=100, blank=True, null=True) 
    genre = models.CharField(max_length=100, blank=True, null=True) 
    hight = models.CharField(max_length=100, blank=True, null=True) 
    weight = models.CharField(max_length=100, blank=True, null=True) 
    eyes = models.CharField(max_length=100, blank=True, null=True) 
    hair = models.CharField(max_length=100, blank=True, null=True)
    skin = models.CharField(max_length=100, blank=True, null=True) 
    lenguages = models.CharField(max_length=100, blank=True, null=True)                     #Idiomas

    def __str__(self):
        return self.name

class Abilities(models.Model):
    name = models.CharField(max_length=40)
    basic = models.BooleanField(default=False)
    modifier = models.CharField(max_length=40)

    def __str__(self):
        return f"{self.name}"

class CharacterAbilities(models.Model):
    abilities = models.ForeignKey(Abilities, on_delete=models.CASCADE, blank=True, null=True)    
    class_bonus = models.BooleanField(default=False)
    
    sum = models.IntegerField(blank=True, null=True, editable=False)
    modifier_rank = models.IntegerField(blank=True, null=True)
    rank = models.IntegerField(blank=True, null=True)
    other_modifier = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.abilities.name}"

class Character(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)     #Usuario Asociado
    description = models.ForeignKey(Description, on_delete=models.CASCADE, blank=True, null=True) #Cabecera de ficha, tamaño, edad...
    statistics = models.ForeignKey(Statistics, on_delete=models.CASCADE, blank=True, null=True) #HabCaracteristicas, CA, iniciativa, Vida...
    abilities = models.ForeignKey(CharacterAbilities, on_delete=models.CASCADE, blank=True, null=True)      #Habilidades
    class_info = models.ForeignKey(Class, on_delete=models.CASCADE, blank=True, null=True) #Clase y sus hechizos asociados
    weapons = models.ForeignKey(Weapon, on_delete=models.CASCADE, blank=True, null=True)  #Armas
    equiped_objects = models.ForeignKey(Equip, on_delete=models.CASCADE, blank=True, null=True)    #Armadura
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE, blank=True, null=True)    #Inventario
    feats = models.ForeignKey(Feats, on_delete=models.CASCADE, blank=True, null=True)        #Dotes
    capability = models.ForeignKey(Capability, on_delete=models.CASCADE, blank=True, null=True)   #Aptitudes Especiales
    spell_resistance = models.ForeignKey(SpellResistance, on_delete=models.CASCADE, blank=True, null=True) #Resistencia de hechizos
    
    game = models.ForeignKey(Game, on_delete=models.CASCADE, blank=True, null=True)     #Partida Asociado
    CHARACTER_TYPE = (
        ('Personaje Jugable', 'Personaje Jugable'),
        ('Personaje No Jugable', 'Personaje No Jugable'),
    )
    
    type = models.CharField(max_length=20, choices=CHARACTER_TYPE,blank=True, null=True)  #Si es NPC o Jugable

    imagen = models.URLField(max_length=200,blank=True, null=True, default=error_img_url) #Imagenes

    def __str__(self):
        return self.description.name
    
    class Meta:
        verbose_name = 'Character'
        verbose_name_plural = 'Characters'
