# Generated by Django 3.1.1 on 2020-09-11 09:35

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_user_followers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='followers',
            field=models.ManyToManyField(blank=True, related_name='following', to=settings.AUTH_USER_MODEL),
        ),
    ]
