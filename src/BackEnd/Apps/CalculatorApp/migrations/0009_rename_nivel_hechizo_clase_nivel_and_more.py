# Generated by Django 5.0.6 on 2024-08-09 00:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CalculatorApp', '0008_hechizo_clases_alter_hechizo_nivel'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hechizo',
            old_name='nivel',
            new_name='clase_nivel',
        ),
        migrations.RemoveField(
            model_name='hechizo',
            name='clases',
        ),
    ]