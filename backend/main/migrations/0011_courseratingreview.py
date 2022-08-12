# Generated by Django 4.0.5 on 2022-06-22 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_studnetcourseenrollment'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseRatingReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.PositiveIntegerField(default=0)),
                ('reviews', models.TextField(null=True)),
                ('review_time', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.student')),
            ],
        ),
    ]