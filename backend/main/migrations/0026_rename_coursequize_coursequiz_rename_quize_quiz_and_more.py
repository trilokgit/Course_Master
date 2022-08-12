# Generated by Django 4.0.5 on 2022-07-07 04:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0025_quize_quizequestions_coursequize'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CourseQuize',
            new_name='CourseQuiz',
        ),
        migrations.RenameModel(
            old_name='Quize',
            new_name='Quiz',
        ),
        migrations.RenameModel(
            old_name='QuizeQuestions',
            new_name='QuizQuestions',
        ),
        migrations.AlterModelOptions(
            name='coursequiz',
            options={'verbose_name_plural': '13.Course Quiz'},
        ),
        migrations.AlterModelOptions(
            name='quiz',
            options={'verbose_name_plural': '11. Quiz'},
        ),
        migrations.AlterModelOptions(
            name='quizquestions',
            options={'verbose_name_plural': '12.Quiz Questions'},
        ),
        migrations.RenameField(
            model_name='coursequiz',
            old_name='add_timr',
            new_name='add_time',
        ),
        migrations.RenameField(
            model_name='quizquestions',
            old_name='quize',
            new_name='quiz',
        ),
    ]
