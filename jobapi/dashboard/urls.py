from django.urls import path, include

from users.views import upload_image, EmployeesAPIView, VisitorRequestAPIView, acceptvisitor, verifyvisitor, \
    getvisitordetails, mycourses
from .views import *
from django.contrib.auth import views as auth_view
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()

urlpatterns = [

    path('update-aosskill/', update_aosskill, name='update-aosskill'),
    path('chatdashboard', chatdashboard, name='chatdashboard'),
    path('userdashboarddata', jobseekerdashboard, name='jobseekerdashboard'),
    path('userprofile', userprofile, name='userprofile'),
    path('usersaves/', usersaves, name='usersaves'),
    path('like_post/', like_post, name='like_post'),
    path('savedlike_post/', savedlike_post, name='savedlike_post'),
    path('savedtimelinepost/', savedtimelinepost, name='savedtimelinepost'),
    path('unlike_post/', unlike_post, name='unlike_post'),
    path('userjobsdetail/', userjobsdetail, name='userjobsdetail'),
    path('seodetail/<int:id>/', seodetail, name='seodetail'),
    path('keyword/', keyword, name='keyword'),
    path('newcomment/<int:id>/', newcomment, name='newcomment'),
    path('messageportal/<int:id>/', themessageportals, name='messageportal'),
    path('usermessagecreate/<int:id>', usermessagecreate, name='usermessagecreate'),
    path('userjobs', userjobs, name='userjobs'),
    path('mupload_image/', upload_image, name='upload_image'),
    path('testcases/', testcases, name='testcases'),
    path('jobprint/', jobprint, name='jobprint'),
    path('userjobssinglepage/<int:id>/', userjobssinglepage, name='userjobssinglepage'),
    path('timetest', timetest, name='timetest'),
    path('userjobapplicationpage/<int:id>', user_job_application_page, name="userjobapplicationpage"),
    path('newtimelinepost', extract_hashtags, name="ExtractHashtagsView"),
    path('Timeline', Timeline, name="Timeline"),
    path('CommonTagAPIView', CommonTagAPIView.as_view(), name="CommonTagAPIView"),
    path('postingsinglepage/<int:id>', postingsinglepage, name="postingsinglepage"),
    path('applications/<int:pk>/', applications, name='applications'),
    path('tag/<slug:slug>/', tagged, name="tagged"),
    path('employee', EmployeesAPIView.as_view(), name='EmployeesAPIView'),
    path('visitor', VisitorRequestAPIView.as_view(), name='VisitorRequestAPIView'),
    path('phonesearch', SearchEmployeeByPhoneNumberAPIView.as_view(),
         name='search_employee_by_phone'),
    path('messagedashboard', messagedashboard, name='messagedashboard'),
    path('userqrcards', userqrcards, name='userqrcards'),
    path('acceptvisitor', acceptvisitor, name='acceptvisitor'),
    path('verifyvisitor', verifyvisitor, name='verifyvisitor'),
    path('getvisitordetails', getvisitordetails, name='getvisitordetails'),
    path('upload/', upload_image, name='upload_image'),
    path('deletemessageportals/<int:id>', deletemessageportals, name='deletemessageportals'),
    path('api/create-company/', create_company, name='create-company'),
    path('universities/', UniversityListCreateView.as_view(), name='university-list-create'),
    path('createjobpost/', createjobpost, name='createjobpost'),
    path('organizationsposts/', organizationsposts, name='organizationsposts'),
    path('payforpost/', payforpost, name='payforpost'),
    path('create_work_experience/', create_work_experience, name='create_work_experience'),
    path('university_view/', university_view, name='university_view'),
    path('UserProfileView/', UserProfileView.as_view(), name='UserProfileView'),
    path('upload-pdf/', UploadPDFView.as_view(), name='upload-pdf'),
    path('check-status/<str:ref_id>/', PDFStatusView.as_view(), name='pdf-status'),
    path('userapplications', userapplications, name='userapplications'),
    path('corporatedashboard', corporatedashboard, name='corporatedashboard'),
    path('applicationpreview/<int:id>/', applicationpreview, name='applicationpreview'),
    path('rolematch', rolematch, name='rolematch'),
    path('contact/', ContactView.as_view()),
    path('blogposts/', get_blog_posts, name='get_blog_posts'),
    path('blogposts/create/', create_blog_post, name='create_blog_post'),
    path('blogposts/<int:id>/', get_blog_post, name='get_blog_post'),
    path('AiPdf', AiPdf.as_view(), name='AiPdf'),
    path('get-ai-model/<str:ref_id>/', AIFetchView.as_view(), name='ai-model-fetch'),
    path('ai-model/create/', AICreateView.as_view(), name='ai-model-create'),
    path('generate-quiz/<str:ref_id>/', GenerateQuizQuestionsAPIView.as_view(), name='generate-quiz'),
    path('verify-chat/<str:ref_id>/', GeneratedChatsDetailAPIView.as_view(), name='generated-chats-detail'),
    path('all-chat/<str:ref_id>/', GetAllChats.as_view(), name='GetAllChats'),
    path('linkedin/auth/', linkedin_auth, name='linkedin_auth'),
    path('linkedin/callback/', linkedin_callback, name='linkedin_callback'),
    path('linkedin/linkedinauth_callback/', linkedinauth_callback, name='linkedinauth_callback'),
    path('BulkUniversityCreateView', BulkUniversityCreateView.as_view(), name='BulkUniversityCreateView'),
    path('BulkJobExperienceCreateView', WorkExperienceCreateView.as_view(), name='WorkExperienceCreateView'),
    path('subscription/', subscription, name='subscription'),
    path('delete-work-experience/<int:experience_id>/', DeleteWorkExperience.as_view(), name='delete_work_experience'),
    path('delete-university-record/<int:university_id>/', DeleteUniversityRecord.as_view(), name='delete_university_record'),
    path('send_mail_whastapp_message/', send_mail_whastapp_message, name='send_mail_whastapp_message'),
    path('update_users_without_firstname/', update_users_without_firstname, name='update_users_without_firstname'),
    path('create_training_post/', create_training_post, name='create_training_post'),
    path('get_training_posts/<str:id>/', get_training_post, name='get_training_post'),
    path('create_jobalert_post/', create_jobalert_post, name='create_jobalert_post'),
    # path('tgsend-message/', SendMessageView.as_view(), name='send-message'),
    path('embedjobs/<str:id>/', fetchwithkey, name='fetchwithkey'),
    path('mycourses/', mycourses, name='mycourses'),
    path('get_training_detail_post/<str:id>/', get_training_detail_post, name='get_training_detail_post'),

]
