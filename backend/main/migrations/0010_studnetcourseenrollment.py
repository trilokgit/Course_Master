# Generated by Django 4.0.5 on 2022-06-21 17:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_rename_paddword_student_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudnetCourseEnrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enrolled_time', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrolled_courses', to='main.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrolled_student', to='main.student')),
            ],
            options={
                'verbose_name_plural': '6. Enrolled Courses',
            },
        ),
    ]
