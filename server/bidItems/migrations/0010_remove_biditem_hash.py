# Generated by Django 3.1.7 on 2021-03-03 15:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bidItems', '0009_auto_20210303_1633'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='biditem',
            name='hash',
        ),
    ]
