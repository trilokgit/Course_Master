# Generated by Django 4.0.5 on 2022-06-21 08:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_alter_course_teacher'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='paddword',
            new_name='password',
        ),
    ]
