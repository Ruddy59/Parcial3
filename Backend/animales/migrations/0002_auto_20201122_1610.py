# Generated by Django 3.1.3 on 2020-11-22 22:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('animales', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='animal',
            options={'ordering': ('nombre',)},
        ),
        migrations.AlterModelOptions(
            name='tipo',
            options={'ordering': ('nombre',)},
        ),
    ]
