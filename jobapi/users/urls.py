from django.urls import path, include

from dashboard.views import alljobcards, generaterandomref, jobdetail, get_or_create_profile, TestEmailView, \
    TextExtractionView, generate_profuuid_for_profiles, anonuserprofile
from .views import *
from django.contrib.auth import views as auth_view
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()




urlpatterns = [
    path('', home, name='home'),
    path('generate_profuuid_for_profiles', generate_profuuid_for_profiles, name='generate_profuuid_for_profiles'),
    path('token/', MyTokenObtainPairViews.as_view(), name='token_obtain_pair'),

    path('api/token/refresh/', TokenRefreshView.as_view(), name='custom_token_refresh'),
    path('jobapprregister/', UserRegistrationView.as_view(), name='user-registration'),
    path('emailverification/', Useremailaccountverification.as_view(), name='user-Useremailaccountverification'),
    path('emailverification/verify/<str:auth_token>/', VerifyAccount.as_view(), name='verify-account'),
    path('newemailverification/verify/<str:auth_token>/<str:reference>/', VerifymyAccount.as_view(),
         name='newverify-account'),
    path('gac',  gemini_chat_completion_view,
         name='GroqChatCompletionView'),
    path('vvs', generaterandomref,
         name='save_logos_for_instances'),
    path('alljobcards', alljobcards,
         name='alljobcards'),
    path('roledetail/<int:id>/', jobdetail,
         name='jobdetail'),
    path('anonuserprofile/<str:id>', anonuserprofile,
         name='anonuserprofile'),
    path('su/', make_all_users_staff, name='generate_random_ref'),



    path('register_user/', register_user, name='register_user'),
    path('register_company/', register_user_and_company, name='register_user_and_company'),
    path('bs-profile/', get_or_create_profile, name='get_or_create_profile'),
    path('test-email/', TestEmailView.as_view(), name='test-email'),
    path('api/auth/google/', GoogleLoginView.as_view(), name='google-login'),
    path('api/auth/googletoken/', mytoken, name='mytoken'),
    path('scrape-url/', TextExtractionView.as_view(), name='scrape_url'),
    path('send-message/<str:uniqueref>/', send_message, name='send_message'),
]


