# Generated by Django 3.1.7 on 2021-03-01 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bidItems', '0005_auto_20210301_2344'),
    ]

    operations = [
        migrations.AlterField(
            model_name='biditem',
            name='finalPrice',
            field=models.FloatField(blank=True, null=True),
        ),
    ]