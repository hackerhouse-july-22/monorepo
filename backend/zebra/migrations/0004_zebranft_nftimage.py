# Generated by Django 3.2.13 on 2022-07-09 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zebra', '0003_auto_20220709_0052'),
    ]

    operations = [
        migrations.AddField(
            model_name='zebranft',
            name='nftImage',
            field=models.CharField(default='https://ipfs.io/ipfs/QmRsKuTeb6bBLJLvsCgBXDjxiYBwGGb25vNzvP4Ke8jzPN', max_length=42),
            preserve_default=False,
        ),
    ]