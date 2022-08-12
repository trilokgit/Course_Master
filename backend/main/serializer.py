from rest_framework import serializers
from . import models

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id','full_name','email','password','qualification','mobile_no','address','interested_categories']
        
    def __init__(self,*args,**kwargs):
        super(StudentSerializer,self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method=='GET':
            self.Meta.depth = 1

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id','full_name','email','password','qualification','mobile_no','skills','profile_img','teacher_courses','teacher_skills']
    def __init__(self,*args,**kwargs):
        super(TeacherSerializer,self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method=='GET':
            self.Meta.depth = 1
        
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id','title','description']
        
        
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['id','course','title','description','video','remarks']
        

class RatingCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['total_reviews','one','two','three','four','five']    
        
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = [
            'id','category',
            'teacher','title',
            'description','featured_img',
            'techs','course_chapters',
            'related_videos','tech_list',
            'total_enrolled_students',
            'course_rating'
            
        ]
    def __init__(self,*args,**kwargs):
        super(CourseSerializer,self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method=='GET':
            self.Meta.depth = 2

class StudentCourseEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudnetCourseEnrollment
        fields = ['id','course','student','enrolled_time']
    def __init__(self,*args,**kwargs):
        super(StudentCourseEnrollmentSerializer,self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method=='GET':
            self.Meta.depth = 2
        
        
class CourseRatingReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRatingReview
        fields = ['id','course','student','rating','reviews','review_time']
        
    def __init__(self,*args,**kwargs):
        super(CourseRatingReviewSerializer,self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method=='GET':
            self.Meta.depth = 1
            
class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['total_teacher_courses','total_teacher_students','total_teacher_chapters']
        
class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['total_courses','total_assignmetns','done_assignmetns','pending_assignmetns']

class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavoriteCourse
        fields = ["id","course","student",'status']
    def __init__(self,*args,**kwargs):
        super(StudentFavoriteCourseSerializer,self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method=='GET':
            self.Meta.depth = 2

class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentAssignment
        fields = ['id','student','teacher','course','title','detail','add_time','question','answer','status']
    def __init__(self,*args,**kwargs):
        super(StudentAssignmentSerializer,self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method=='GET':
            self.Meta.depth = 2
            
class MyCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MyComment
        fields = ['id','course','student','comment','add_time']
    def __init__(self,*args,**kwargs):
        super(MyCommentSerializer,self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method=='GET':
            self.Meta.depth = 2


    