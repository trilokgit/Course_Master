from django.db import models
from django.core import serializers
# Create your models here.
class Teacher(models.Model):
    full_name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    profile_img = models.ImageField(upload_to='teacher_profile_imgs/',null=True)
    mobile_no = models.CharField(max_length=15)
    skills = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"
        
    def __str__(self):
        return self.full_name
    
    def teacher_skills(self):
        teacher_skills = self.skills.split(',')
        return teacher_skills;
    
    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count();
        return total_courses;
    
    def total_teacher_chapters(self):
        total_chapters = Chapter.objects.filter(course__teacher=self).count();
        return total_chapters;
    
    def total_teacher_students(self):
        total_students = StudnetCourseEnrollment.objects.filter(course__teacher=self).count();
        return total_students;
        
    
class CourseCategory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    
    class Meta:
        verbose_name_plural = "2. Course Categories"
    
    def __str__(self):
        return self.title;
    
    
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE,null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name="teacher_courses",null=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/',null=True)
    techs = models.TextField(null=True)
    
    class Meta:
        verbose_name_plural = "3. Courses"
        
    def __str__(self):
        return self.title
    
    def related_videos(self):
        related_videos = Course.objects.filter(techs__icontains=self.techs)
        return serializers.serialize('json', related_videos)
    
    def tech_list(self):
        tech_list = self.techs.split(',')
        return tech_list
    
    def total_enrolled_students(self):
        total_enrolled_students = StudnetCourseEnrollment.objects.filter(course=self).count();
        return total_enrolled_students
    
    def course_rating(self):
        course_rating = CourseRatingReview.objects.filter(course=self).aggregate(avg_rating = models.Avg('rating'))
        return course_rating['avg_rating']
    
    def total_reviews(self):
        total_reviews = CourseRatingReview.objects.filter(course=self).count();
        return total_reviews
    
    def one(self):
        one = CourseRatingReview.objects.filter(course=self,rating=1).count();
        return one
    def two(self):
        two = CourseRatingReview.objects.filter(course=self,rating=2).count();
        return two
    def three(self):
        three = CourseRatingReview.objects.filter(course=self,rating=3).count();
        return three
    def four(self):
        four = CourseRatingReview.objects.filter(course=self,rating=4).count();
        return four
    def five(self):
        five = CourseRatingReview.objects.filter(course=self,rating=5).count();
        return five
        
        
        
    
    
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE,related_name='course_chapters')
    title = models.CharField(max_length=100)
    description = models.TextField()
    video = models.FileField(upload_to='cahpter_videos/',null=True)
    remarks = models.TextField(null=True)
    
    # def chapter_duration(self):
    #     seconds = 0
    #     import cv2
    #     cap = cv2.VideoCapture(self.video.path)
    #     fps = cap.get(cv2.CAP.PROP_FPS)
    #     frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    #     if frame_count:
    #         duration = frame_count/fps
    #         minutes = int(duration/60)
    #         seconds = duration%60
    #     return seconds
            
    
    class Meta:
        verbose_name_plural = "4. Chapters"
        
    def __str__(self):
        return self.title;
    

class Student(models.Model):
    full_name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=15)
    address = models.TextField()
    interested_categories = models.TextField()
    
    class Meta:
        verbose_name_plural = "5. Students"
        
    def __str__(self):
        return self.full_name
    
    def total_courses(self):
        total_courses = StudnetCourseEnrollment.objects.filter(student=self).count();
        return total_courses
    
    def total_assignmetns(self):
        total_assignmetns = StudentAssignment.objects.filter(student=self).count();
        return total_assignmetns;
    
    def done_assignmetns(self):
        done_assignmetns = StudentAssignment.objects.filter(student=self,status=True).count();
        return done_assignmetns;
    
    def pending_assignmetns(self):
        pending_assignmetns = StudentAssignment.objects.filter(student=self,status=False).count();
        return pending_assignmetns;
    
    
    
        

class StudnetCourseEnrollment(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE,related_name='enrolled_courses')
    student = models.ForeignKey(Student,on_delete=models.CASCADE,related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "6. Enrolled Courses"
    
    def __str__(self):
        return f"{self.course}-{self.student}"
    

class CourseRatingReview(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    student = models.ForeignKey(Student,on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0)
    reviews = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "7. Rating and Reviews"
    
    def __str__(self):
        return f"{self.course}-{self.student}-{self.rating}"
    
    
class StudentFavoriteCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student ,on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = "8. Favorite Course"
        
    def __str__(self):
        return f"{self.course}-{self.student}"
    
class StudentAssignment(models.Model):
    student = models.ForeignKey(Student ,on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher ,on_delete=models.CASCADE)
    course = models.ForeignKey(Course ,on_delete=models.CASCADE,null=True)
    question = models.FileField(upload_to='document_course_pdf/',null=True)
    answer = models.FileField(upload_to='document_course_pdf/',null=True)
    status = models.BooleanField(default=False)
    title =  models.CharField(max_length=200)
    detail = models.CharField(max_length=200)
    add_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "9. Student Assignment"
        
    def __str__(self):
        return f"{self.title}"
    
class MyComment(models.Model):
    student = models.ForeignKey(Student ,on_delete=models.CASCADE,null=True)
    course = models.ForeignKey(Course ,on_delete=models.CASCADE,null=True)
    comment = models.CharField(max_length=200)
    add_time = models.DateTimeField(auto_now_add=True,null=True)
    
    class Meta:
        verbose_name_plural = "10. Student comments"
        
    def __str__(self):
        return f"{self.student}-{self.comment}"
    

    
        
    
   
    
    
    
    
    
     