# Generated by Django 5.0.6 on 2024-08-10 20:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CalculatorApp', '0013_spellimage_hechizo_imagenes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hechizo',
            name='imagenes',
        ),
        migrations.DeleteModel(
            name='SpellImage',
        ),
    ]