# Generated by Django 4.0.5 on 2022-06-23 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_courseratingreview'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='courseratingreview',
            options={'verbose_name_plural': '7. Rating and Reviews'},
        ),
        migrations.AddField(
            model_name='teacher',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='teacher/profile_imgs/'),
        ),
    ]