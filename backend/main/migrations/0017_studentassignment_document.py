# Generated by Django 4.0.5 on 2022-06-24 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_studentassignment_course'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentassignment',
            name='document',
            field=models.FileField(null=True, upload_to='document_course_pdf/'),
        ),
    ]
