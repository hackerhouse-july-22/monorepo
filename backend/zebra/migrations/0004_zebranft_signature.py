# Generated by Django 3.2.13 on 2022-07-10 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zebra', '0003_remove_zebranft_renteraddress'),
    ]

    operations = [
        migrations.AddField(
            model_name='zebranft',
            name='signature',
            field=models.CharField(default=0, max_length=42),
            preserve_default=False,
        ),
    ]