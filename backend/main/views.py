from rest_framework import permissions
from rest_framework import generics
from django.http import JsonResponse , HttpResponse
from django.views.decorators.csrf import csrf_exempt
from . import models
from django.db.models import Q
from .serializer import MyCommentSerializer,RatingCountSerializer,StudentDashboardSerializer,StudentFavoriteCourseSerializer, TeacherSerializer,CategorySerializer,CourseSerializer,ChapterSerializer,StudentSerializer,StudentCourseEnrollmentSerializer,CourseRatingReviewSerializer,TeacherDashboardSerializer,StudentAssignmentSerializer
from .helper import send_forget_password_link


# Create your views here.




class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [permissions.IsAuthenticated]

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
        

@csrf_exempt
def teacher_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(email=email,password=password)
    except models.Teacher.DoesNotExist:
        teacherData = None;   
    if teacherData:
        return JsonResponse({'bool':True,'teacher_id':teacherData.id,'teacher_name':teacherData.full_name})
    else:
        return JsonResponse({'bool':False})
    
@csrf_exempt
def user_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        userData = models.Student.objects.get(email=email,password=password)
    except models.Student.DoesNotExist:
        userData = None;   
    if userData:
        return JsonResponse({'bool':True,'user_id':userData.id,'user_name':userData.full_name})
    else:
        return JsonResponse({'bool':False})
    

class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            qs = models.Course.objects.all().order_by('-id')[:4]
        
        if 'categorys' in self.request.GET:
            categorys = self.request.GET['categorys']
            qs = models.Course.objects.filter(techs__icontains=categorys)
            
            
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id=teacher).first()
            qs = models.Course.objects.filter(techs__iexact=skill_name,teacher=teacher)
        
        elif 'studentId' in self.kwargs:
            student_id = self.kwargs["studentId"];
            student = models.Student.objects.get(pk=student_id)
            queries = [Q(techs__iendswith=value) for value in student.interested_categories]
            query = queries.pop();
            for item in queries:
                query |= item
            qs = models.Course.objects.filter(query)
           
                 
        
        return qs;
    

class CourseDetailList(generics.RetrieveAPIView):
    queryset = models.Course.objects.all();
    serializer_class = CourseSerializer

    
class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    
    
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)
    
    
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    
   

class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer

class StudentCourseEnrollmentList(generics.ListCreateAPIView):
    queryset = models.StudnetCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollmentSerializer
    

def fetch_enroll_status(request,student_id,course_id):
   
    student = models.Student.objects.filter(id=student_id).first();
    course = models.Course.objects.filter(id=course_id).first();
    enrollStatus = models.StudnetCourseEnrollment.objects.filter(course=course,student=student).count();   
    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    

     
class EnrolledStudensList(generics.ListAPIView):
    queryset = models.StudnetCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollmentSerializer
    
    def get_queryset(self):
        if 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id'];
            teacher = models.Teacher.objects.get(pk=teacher_id);
            return models.StudnetCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
        elif 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id'];
            course = models.Course.objects.get(pk=course_id);
            return models.StudnetCourseEnrollment.objects.filter(course=course)
        
        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id'];
            student = models.Student.objects.get(pk=student_id);
            return models.StudnetCourseEnrollment.objects.filter(student=student)
        
            
            

    
class CourseRatingReviewList(generics.ListCreateAPIView):
    queryset = models.CourseRatingReview.objects.all()
    serializer_class = CourseRatingReviewSerializer
    
    def get_queryset(self):
        course_id = self.kwargs['course_id'];
        course = models.Course.objects.get(pk=course_id);
        return models.CourseRatingReview.objects.filter(course=course)


def fetch_rating_status(request,student_id,course_id):
   
    student = models.Student.objects.filter(id=student_id).first();
    course = models.Course.objects.filter(id=course_id).first();
    ratingStatus = models.CourseRatingReview.objects.filter(course=course,student=student).count();   
    if ratingStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class TeacherDashboard(generics.RetrieveAPIView):
    queryset = models.Teacher.objects.all();
    serializer_class = TeacherDashboardSerializer
    
class MyCommentList(generics.ListCreateAPIView):
    queryset = models.MyComment.objects.all();
    serializer_class = MyCommentSerializer
    
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.MyComment.objects.filter(course=course).order_by('-add_time')
    
    
class StudentDashboard(generics.RetrieveAPIView):
    queryset = models.Student.objects.all();
    serializer_class = StudentDashboardSerializer
    
class RatingCountList(generics.RetrieveAPIView):
    queryset = models.Course.objects.all();
    serializer_class = RatingCountSerializer

class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset = models.StudentFavoriteCourse.objects.all();
    serializer_class = StudentFavoriteCourseSerializer
    
    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id'];
            student = models.Student.objects.get(pk=student_id);
            return models.StudentFavoriteCourse.objects.filter(student=student).distinct()
      
    

def fetch_favorite_status(request,student_id,course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    fs = models.StudentFavoriteCourse.objects.filter(course=course,student=student).first()
    if fs and fs.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    

def remove_favorite_course(request,course_id,student_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    fs = models.StudentFavoriteCourse.objects.filter(course=course,student=student).delete()
    if fs:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class StudentAssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    def get_queryset(self):
        if 'teacher_id' in self.kwargs and 'student_id' in self.kwargs and 'course_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            course_id = self.kwargs['course_id']
            teacher_id = self.kwargs['teacher_id']
            student = models.Student.objects.get(pk=student_id)
            course = models.Course.objects.get(pk=course_id)
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentAssignment.objects.filter(course=course,student=student,teacher=teacher)
        elif 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentAssignment.objects.filter(student=student)

class DataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    
    
  
@csrf_exempt
def DataModify(request,myid):
    fs = models.StudentAssignment.objects.filter(pk=myid).update(status=False,answer="")
    if fs:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

@csrf_exempt
def DeleteCommentList(request,myid):
    fs = models.MyComment.objects.filter(pk=myid).delete()
    if fs:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

@csrf_exempt
def forgetPassword(request):
    if request.method == 'POST':
      email= request.POST["email"]
      teacher_id = request.POST["teacher_id"]
      teacher = models.Teacher.objects.filter(pk=teacher_id,email=email)
      if teacher:
          send_forget_password_link(email)
          return HttpResponse({True})
      else:
          return HttpResponse({False})
    
    

    
    
    

  
    


    
   