# Generated by Django 3.2.13 on 2022-07-09 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zebra', '0004_zebranft_nftimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='zebranft',
            name='nftImage',
            field=models.CharField(max_length=200),
        ),
    ]