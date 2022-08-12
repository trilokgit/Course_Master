from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Teacher)
admin.site.register(models.CourseCategory)
admin.site.register(models.Course)
admin.site.register(models.Chapter)
admin.site.register(models.Student)
admin.site.register(models.StudnetCourseEnrollment)
admin.site.register(models.CourseRatingReview)
admin.site.register(models.StudentFavoriteCourse)
admin.site.register(models.StudentAssignment)
admin.site.register(models.MyComment)

