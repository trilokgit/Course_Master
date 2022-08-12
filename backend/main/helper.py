from django.core.mail import send_mail
import uuid
from django.conf import settings


def send_forget_password_link(email):
    token = str(uuid.uuid4())
    # print(token)
    subject = "Your Forget Password Link"
    message = f'Hi , Click on the link to reset password http://localhost:3000/reset-password'
    email_from = settings.EMAIL_HOST_USER
    to = [email]
    send_mail(subject,message,email_from,to,fail_silently=False)
    return True
    
         