# Generated by Django 4.2.13 on 2024-07-30 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gradingrubric',
            name='level',
            field=models.CharField(blank=True, max_length=40),
        ),
    ]
