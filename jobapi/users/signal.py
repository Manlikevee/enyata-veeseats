import shortuuid
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from html import unescape
import threading

from django.utils.html import strip_tags

from dashboard.views import send_whatsapp_message
from .models import Jobs, user_Bs_Jobsalert
from users.models import Profile

s = shortuuid.ShortUUID(alphabet="0123456789")
otp = s.random(length=5)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.update_or_create(user=instance,
                                         defaults={'user': instance, "auth_token": otp})


# @receiver(post_save, sender=Jobs)
# def job_posted(sender, instance, created, **kwargs):
#     if created:
#         jobdescription_plain = strip_tags(unescape(instance.jobdescription))
#
#         # Get all job alerts
#         job_alerts = user_Bs_Jobsalert.objects.all()
#
#         # Start a thread to send messages
#         threading.Thread(target=notify_users, args=(job_alerts, instance)).start()
#
#
# def notify_users(job_alerts, job_instance):
#     jobtitle = job_instance.jobtitle
#     companyname = job_instance.organization.organization_name if job_instance.organization else "Unknown"
#     jobref = job_instance.ref
#     jobdescription_plain = strip_tags(unescape(job_instance.jobdescription))
#     for alert in job_alerts:
#         print('hello world')
#         if alert.keyword in jobdescription_plain:
#             number = alert.contact_method_detail  # Assuming this holds the number
#             try:
#                 send_whatsapp_message(number, jobtitle, companyname, jobref, alert.keyword)
#             except Exception as e:
#                 print(f"Failed to send message to {number}: {e}")
