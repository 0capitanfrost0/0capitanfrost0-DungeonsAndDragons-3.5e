# Generated by Django 5.0.6 on 2024-08-11 14:25

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CalculatorApp', '0017_alter_hechizo_componentes_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ListaDeFavoritos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=200)),
                ('hechizos', models.ManyToManyField(blank=True, related_name='listas_de_favoritos', to='CalculatorApp.hechizo')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listas_de_favoritos', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Lista de Favoritos',
                'verbose_name_plural': 'Listas de Favoritos',
            },
        ),
    ]
