# Generated by Django 5.0.6 on 2024-08-06 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CalculatorApp', '0006_hechizo_subescuela'),
    ]

    operations = [
        migrations.AddField(
            model_name='hechizo',
            name='descripcion_corta',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
