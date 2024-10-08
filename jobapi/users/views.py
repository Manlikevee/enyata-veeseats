import json
import re
from urllib.request import urlretrieve

import jwt
import pusher
import requests
from django.conf import settings
from django.core import mail
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.db.models import Q
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import os
from groq import Groq
from dashboard.serializer import Imagetest, CoursesSerializer
# from dashboard.serializer import Imagetest
from dashboard.models import *
# Create your views here.
from .models import Profile
from .serializer import *


def home(request):
    return render(request, 'index.html')


# login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['is_corporate'] = user.is_staff

        try:
            profile = Profile.objects.get(user=user)
            token['is_updated'] = profile.profile_verified
            if not profile.is_verified:
                # Include accountnumber if the profile is not verified
                token['accountnumber'] = profile.accountnumber
        except Profile.DoesNotExist:
            pass  # Handle the case when the profile does not exist

        return token


class MyTokenObtainPairViews(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            print(password)
            # Check if the username or email already exists
            if User.objects.filter(username=username).filter(email=email).exists():
                return Response({'message': 'User with Username and Email already exists'},
                                status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(username=username).exists():
                return Response({'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=email).exists():
                return Response({'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

            # Create the user
            user = serializer.save()
            user.save()
            j = get_object_or_404(Profile, user=user)
            auth_token = j.auth_token
            username = j.user.username
            useremail = j.user.email
            send_mail_after_registration(auth_token, username, useremail)
            return Response({'message': 'User registered successfully', 'accountnumber': user.profile.accountnumber},
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_user(request):
    data = request.data

    # Check if username already exists
    if User.objects.filter(username=data.get('username')).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if email already exists
    if User.objects.filter(email=data.get('email')).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user_serializer = UserSerializer(data=data)

    if user_serializer.is_valid():
        user = User.objects.create_user(
            username=data.get('username'),
            email=data.get('email'),
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            password=data.get('password')
        )

        # Create the profile
        Individualprofile.objects.create(
            user=user,
            phonenumber=data.get('phoneNumber', 234),
            linkdeinUrl=data.get('linkedInURL', ''),
            jobminimumexperience=data.get('workExperience', 2),
            managerial_experience=data.get('managerialExperience', 2),
            board_experience=data.get('boardExperience', 2),
            city=data.get('city', ''),
            country=data.get('country', 'Nigeria')
        )

        return Response({"message": "User and profile created successfully"}, status=status.HTTP_201_CREATED)

    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_user_and_company(request):
    data = request.data

    # Check if username already exists
    if User.objects.filter(username=data.get('username')).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if email already exists
    if User.objects.filter(email=data.get('email')).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user = User.objects.create_user(
        username=data.get('username'),
        email=data.get('email'),
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        password=data.get('password')
    )

    # Create the company
    company_instance = company.objects.create(
        user=user,
        phonenumber=data.get('phoneNumber', 234),
        organization_name=data.get('companyName', ''),
        organization_type=data.get('companyType', ''),
        organization_regno=data.get('companyRegNo', ''),
        website=data.get('companyWebsite', ''),
        organization_contactmethod=data.get('preferredContact', ''),
    )

    return Response({"message": "User and company created successfully"}, status=status.HTTP_201_CREATED)


class Useremailaccountverification(APIView):
    def post(self, request):
        ref = request.data.get('reference')
        if ref is None:
            return Response({'message': 'Unable To Process Your Request'}, status=status.HTTP_400_BAD_REQUEST)

        j = get_object_or_404(Profile, accountnumber=ref)

        if j.is_verified:
            return Response({'message': 'Profile Already Verified'}, status=status.HTTP_400_BAD_REQUEST)

        if not j.is_verified:
            auth_token = j.auth_token
            username = j.user.username
            useremail = j.user.email
            print(f'email is {useremail}')
            myj = 'sjsj'
            # Attempt to send the email
            send_mail_after_registration(auth_token, username, useremail)

            payload = {'response': 'successfully sent confirmation email'}
            return Response(payload, status=status.HTTP_200_OK)

        return Response({'message': 'Unable To Process Your Request'}, status=status.HTTP_400_BAD_REQUEST)


def send_mail_after_registration(auth_token, username, useremail):
    print(useremail)
    subject = 'Your accounts need to be verified'
    lnk2 = 'https://veejobportal.netlify.app/'
    html_message = render_to_string('email-confirmation.html',
                                    {'token': auth_token, 'lnk2': lnk2, 'username': username})
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER
    to = [useremail]
    try:
        mail.send_mail(subject, plain_message, from_email, to, html_message=html_message)
        print('sending')
    except Exception as e:
        print(e)


class VerifyAccount(APIView):
    def get(self, request, auth_token):
        try:
            profile_obj = Profile.objects.filter(auth_token=auth_token).first()

            if profile_obj:
                if profile_obj.is_verified:
                    return Response({'error': 'Your account is already verified.'}, status=status.HTTP_200_OK)
                profile_obj.is_verified = True
                profile_obj.save()
                return Response({'message': 'Your account has been verified.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid auth token.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': 'An error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VerifymyAccount(APIView):
    def get(self, request, auth_token, reference):
        try:
            profile_obj = Profile.objects.filter(auth_token=reference).filter(accountnumber=auth_token).first()

            if profile_obj:
                if profile_obj.is_verified:
                    return Response({'message': 'Your account is already verified.'}, status=status.HTTP_200_OK)
                profile_obj.is_verified = True
                profile_obj.save()
                return Response({'message': 'Your account has been verified.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid auth token.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': 'An error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST':
        myimage = request.data.get('myimg')  # Assuming you're sending the image as 'myimg'
        print(myimage)
        serializer = UploadedImage.objects.create(image=myimage)
        if myimage:
            serializer.save()
            serializeddata = Imagetest(serializer)
            return Response(serializeddata.data,
                            status=status.HTTP_201_CREATED)  # Use 201 Created status for successful resource creation
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)  # Return errors if the serializer is not valid
    else:
        return Response("Method not allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)


from rest_framework import status
from rest_framework.response import Response


class EmployeesAPIView(APIView):
    def get(self, request):
        # Retrieve all employees from the database
        employees_list = employees.objects.all()
        # Serialize the data
        serializer = EmployeesSerializer(employees_list, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Deserialize the incoming data
        serializer = EmployeesSerializer(data=request.data)
        if serializer.is_valid():
            # Extract email and phone number from the request data
            email = serializer.validated_data.get('email')
            phone_number = serializer.validated_data.get('phone_number')

            # Check if an employee with the provided email or phone number already exists
            if employees.objects.filter(email=email).exists() or employees.objects.filter(
                    phone_number=phone_number).exists():
                return Response({"error": "Employee with provided email or phone number already exists."},
                                status=status.HTTP_400_BAD_REQUEST)

            # Save the data to the database
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VisitorRequestAPIView(APIView):
    def get(self, request):
        request_user = request.user
        request_company = company.objects.filter(user=request_user).first()
        # visitor_requests = visitorslog.objects.filter()
        if request_company:
            visitor_requests = visitorslog.objects.select_related('event__organization').filter(
                event__organization=request_company)
        else:
            visitor_requests = visitorslog.objects.none()  # No matching company
        # Serialize the data
        serializer = VisitorRequestSerializer(visitor_requests, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Extract staff_id from the incoming data
        staff_id = request.data.get('event_id')

        # Fetch the corresponding employee object
        try:
            event = Course.objects.get(reference=staff_id)
        except event.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get individual fields from the request data
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        phonenumber = request.data.get('phonenumber')
        joblocation = request.data.get('joblocation')
        selected_lga = request.data.get('selected_lga')
        paymentref = request.data.get('paymentref')
        # Create the visitor request
        visitor_request = visitorslog.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phonenumber=phonenumber,
            event=event,
            joblocation=joblocation,
            selected_lga=selected_lga,
            paymentref=paymentref
        )
        qrcards = qrcodes.objects.create(organization=event.organization, event=event )
        # Serialize the created visitor request
        serializer = VisitorRequestSerializer(visitor_request)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mycourses(request):
    request_user = request.user
    request_company = company.objects.filter(user=request_user).first()
    Course.objects.filter(organization=request_company).first()
    serializer = CoursesSerializer(courses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def acceptvisitor(request):
    if request.method == 'POST':
        # Get the post ID from the POST data
        visitor_id = request.data.get('post_id')

        # Retrieve the post object from the database
        try:
            post = visitorslog.objects.get(ref=visitor_id)
        except visitorslog.DoesNotExist:
            return JsonResponse({'message': 'Visitor not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the post is already saved by the current user
        if post.status == 'awaiting_confirmation':
            post.status = 'pending_approval'
            post.stage_2 = True
            post.accepted_time = timezone.now()
            post.save()
            message = 'Approval Successful'
        else:
            message = 'Already Confirmed'

        # Serialize the post object and visitor requests
        serializer = VisitorRequestSerializer(post)
        visitorserializer = ''
        request_user = request.user
        request_company = company.objects.filter(user=request_user).first()

        if request_company:
            visitor_requests = visitorslog.objects.select_related('event__organization').filter(
                event__organization=request_company)
            visitorserializer = VisitorRequestSerializer(visitor_requests, many=True)

        return Response(
            {'visitorserializer': visitorserializer.data if visitorserializer else None,
             'message': message,
             'visitorsdata': serializer.data},
            status=status.HTTP_200_OK
        )

    # Return an error response for unsupported methods
    return JsonResponse({'message': 'Invalid request method'},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def verifyvisitor(request):
    if request.method == 'POST':
        # Get the post ID from the POST data
        visitor_id = request.data.get('post_id')
        tag_id = request.data.get('tag_id')

        try:
            post = visitorslog.objects.get(ref=visitor_id)
        except visitorslog.DoesNotExist:
            return JsonResponse({'message': 'Visitor not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the post is already saved by the current user
        if post.status == 'awaiting_confirmation':
            post.status = 'pending_approval'
            post.save()
            message = 'Approval Successful'
        elif post.status == 'pending_approval':
            message = 'Unable To Complete Request'
            qrcodeobj = qrcodes.objects.filter(code_tag=tag_id).first()
            if not qrcodeobj:
                message = 'Tag Does Not Exist'
            elif qrcodeobj.availability == False:
                message = f'Tag Is Currently In Use and has not been logged out yet'
            elif qrcodeobj:
                post.tag_id = qrcodeobj.code_tag
                post.status = 'inprogress'
                post.save()
                qrcodeobj.availability = False
                qrcodeobj.used_by = post
                qrcodeobj.save()
                message = 'Proceed to visitation'
            else:
                message = 'Unable To Process Your Request'

        elif post.status == 'inprogress':
            message = 'Visitation Already In Progress, Kindly Proceed With Your Visitation'

        else:
            message = 'Invalid status'

        visitor_requests = visitorslog.objects.all()
        # Serialize the data
        serializer = VisitorRequestSerializer(visitor_requests, many=True)

        return Response({'message': message, 'visitorsdata': serializer.data}, status=status.HTTP_200_OK)

    # Return an error response for unsupported methods
    return JsonResponse({'message': 'Invalid request method'},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def getvisitordetails(request):
    if request.method == 'POST':
        visitor_id = request.data.get('post_id')
        # Retrieve the post object from the database
        try:
            post = visitorslog.objects.get(ref=visitor_id)
        except visitorslog.DoesNotExist:
            return JsonResponse({'message': 'Visitor not found'}, status=status.HTTP_404_NOT_FOUND)
        # Check if the post is already saved by the current user
        if post.status == 'awaiting_confirmation':
            message = 'Visitation Awaiting Confirmation'
        else:
            message = 'Visitation In Progress'
        # Serialize the data
        serializer = VisitorRequestSerializer(post)
        return Response({'message': message, 'visitorsdata': serializer.data}, status=status.HTTP_200_OK)
    # Return an error response for unsupported methods
    return JsonResponse({'message': 'Invalid request method'},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def logoutvisitor(request):
    if request.method == 'POST':
        # Get the post ID from the POST data
        visitor_id = request.data.get('post_id')
        tag_id = request.data.get('tag_id')

        if visitor_id:
            try:
                post = visitorslog.objects.get(ref=visitor_id)
                if post.status == 'Approval Successful':
                    post.status = 'visitation_complete'
                    post.save()
                    message = 'Visitation Complete'
                    tag = qrcodes.objects.filter(used_by=post).first()
                    tag.availability = True
                    tag.save()
                else:
                    message = 'Invalid request'

                visitor_requests = visitorslog.objects.all()
                # Serialize the data
                serializer = VisitorRequestSerializer(visitor_requests, many=True)

                return Response({'message': message, 'visitorsdata': serializer.data}, status=status.HTTP_200_OK)
            except visitorslog.DoesNotExist:
                return JsonResponse({'message': 'Visitor not found'}, status=status.HTTP_404_NOT_FOUND)

        elif tag_id:
            print('yoo')
        else:
            print('unable to process your request')

        try:
            post = visitorslog.objects.get(ref=visitor_id)
        except visitorslog.DoesNotExist:
            return JsonResponse({'message': 'Visitor not found'}, status=status.HTTP_404_NOT_FOUND)

    return JsonResponse({'message': 'Invalid request method'},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)


import json
import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from groq import Groq  # Ensure you have the correct import for your Groq client


@api_view(['POST'])
def groq_chat_completion_view(request):
    try:
        # Get a random company
        company_instance = company.objects.order_by("?").first()

        if not company_instance:
            return Response({"error": "No company found"}, status=status.HTTP_404_NOT_FOUND)

        client = Groq(
            api_key='',
        )

        # Define the chat message
        chat_message = {
            "role": "user",
            "content": f"in json format write a job opening at board level for the company {company_instance.organization_name}, write a very detailed description of the role, the salary range, the job title, the job service, and the job category also in json format, and also an array of job responsibilities and skill requirements make sure the job description is long and detailed also make sure the company name shows up in the role description and don't make the job title long",
        }

        # Get the chat completion
        chat_completion = client.chat.completions.create(
            messages=[chat_message],
            model="llama3-8b-8192",
        )

        response_content = chat_completion.choices[0].message.content

        # Attempt to extract the JSON part from the response content
        try:
            json_str = response_content[response_content.index('{'):response_content.rindex('}') + 1]
            job_data = json.loads(json_str)
        except (ValueError, json.JSONDecodeError) as e:
            return Response({
                "error": "JSON format not found or is invalid in the response content",
                "details": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(job_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from requests.structures import CaseInsensitiveDict


@api_view(['POST'])
def gemini_chat_completion_view(request):
    api_key = ""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}"

    headers = CaseInsensitiveDict()
    headers["Content-Type"] = "application/json"

    jobs_created = 0
    max_jobs = 20

    while jobs_created < max_jobs:
        try:
            print('hello')
            # Get a random company
            company_instance = company.objects.order_by("?").first()

            if not company_instance:
                continue

            data = json.dumps({
                "contents": [
                    {
                        "parts": [
                            {
                                "text": f"in json format write a job opening at board level for the company {company_instance.organization_name}, write a very detailed description of the role, the salary range, the job title, the job service, and the job category also in json format, and also an array of job responsibilities and skill requirements make sure the job description is long and detailed also make sure the company name shows up in the role description and don't make the job title long"
                            }
                        ]
                    }
                ]
            })

            response = requests.post(url, headers=headers, data=data)
            response_data = response.json()

            if response.status_code != 200:
                continue

            response_content = response_data['candidates'][0]['content']['parts'][0]['text']
            print(response_content)
            # Attempt to extract the JSON part from the response content
            try:
                json_str = response_content[response_content.index('{'):response_content.rindex('}') + 1]
                job_data = json.loads(json_str)
            except (ValueError, json.JSONDecodeError):
                continue

            # Create the job in the database
            # Replace with the actual user or logic to get the user
            Jobs.objects.create(
                user=company_instance.user,
                organization=company_instance,
                jobtitle=job_data.get("job_title"),
                jobservice=job_data.get("job_service"),
                jobcategory=job_data.get("job_category"),
                jobsalaryrange=job_data.get("salary_range"),
                jobdescription=job_data.get("job_description"),
                responsibilities=job_data.get("responsibilities"),
                requirements=job_data.get("skills_requirements")
            )

            jobs_created += 1

        except Exception as e:
            continue

    return Response({"message": f"{jobs_created} job(s) created successfully."}, status=status.HTTP_200_OK)


def save_logos_for_instances(request):
    instances = exceltest.objects.filter(Q(schoollogo='') | Q(schoollogo=None)
                                         )
    print(instances)
    for instance in instances:
        try:
            # Fetch the image from the logourl
            result = urlretrieve(instance.logourl)
            instance.schoollogo.save(
                instance.logourl.split('/')[-1],  # Get the file name from the URL
                File(open(result[0], 'rb'))
            )
            instance.save()
            print(f"Saved logo for {instance.institution}")
        except Exception as e:
            print(f"Failed to fetch logo for {instance.institution}: {e}")

    return HttpResponse("Logos have been processed.")


def make_all_users_staff(request):
    users = User.objects.all()
    updated_count = 0
    for user in users:
        if not user.is_staff:
            user.is_staff = True
            user.save()
            updated_count += 1

    return JsonResponse({'message': f'Successfully updated {updated_count} users to staff members.'})


from google.auth.transport import requests as google_requests


class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            # Verify the token with Google's tokeninfo endpoint
            token_info_response = requests.get('https://oauth2.googleapis.com/tokeninfo',
                                               params={'access_token': token})
            token_info = token_info_response.json()
            if 'error' in token_info:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
            # Extract the user email from the token info
            email = token_info.get('email')
            # Fetch the user profile information using the access token
            user_info_response = requests.get(
                'https://www.googleapis.com/oauth2/v2/userinfo',
                headers={'Authorization': f'Bearer {token}'}
            )
            user_info = user_info_response.json()
            # Extract user information
            first_name = user_info.get('given_name')
            last_name = user_info.get('family_name')
            picture = user_info.get('picture')
            # Check if the user already exists
            user, created = User.objects.get_or_create(username=email, defaults={
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'password': User.objects.make_random_password()  # Set a random password
            })
            # Generate JWT tokens
            refresh = MyTokenObtainPairSerializer.get_token(user)
            access = refresh.access_token
            individual_profile, created = Individualprofile.objects.get_or_create(user=user)
            return Response({
                'refresh': str(refresh),
                'access': str(access),
                'user': {
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'picture': picture
                }
            })
        except requests.RequestException as e:
            return Response({'error': 'Failed to validate token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def mytoken(request):
    mytoken = request.data.get('token')
    if not mytoken:
        return Response({'error': 'Token is missing'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        decoded_token = jwt.decode(mytoken, options={"verify_signature": False})
        if decoded_token:
            if decoded_token['azp'] == settings.G_C_I:
                first_name = decoded_token['given_name']
                last_name = decoded_token['family_name']
                picture = decoded_token['picture']
                email = decoded_token['email']

                # Check if the user already exists
                user, created = User.objects.get_or_create(username=email, defaults={
                    'email': email,
                    'first_name': first_name,
                    'last_name': last_name,
                    'password': User.objects.make_random_password()  # Set a random password
                })

                individual_profile, created = Individualprofile.objects.get_or_create(user=user)
                refresh = MyTokenObtainPairSerializer.get_token(user)
                access = refresh.access_token

                return Response({
                    'refresh': str(refresh),
                    'access': str(access),
                    'user': {
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'picture': picture
                    }
                }, status=status.HTTP_200_OK)

            else:
                return Response({'error': 'Failed to validate token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:

            return Response({'error': 'Failed to validate token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except requests.RequestException as e:
        return Response({'error': 'Failed to validate token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


pusher_client = pusher.Pusher(
    app_id=settings.PUSHER_APP_ID,
    key=settings.PUSHER_KEY,
    secret=settings.PUSHER_SECRET,
    cluster=settings.PUSHER_CLUSTER,
    ssl=True
)


@api_view(['GET', 'POST'])
def send_message(request, uniqueref):
    # Get or create the message channel based on the unique_ref
    message_instance, created = PusherMessage.objects.get_or_create(unique_ref=uniqueref)

    if request.method == 'POST':
        # Get new message content from the request
        new_message = request.data.get('message')

        # Append new message to existing content (which is a list)
        message_instance.content.append({
            'message': new_message,
            'timestamp': str(message_instance.timestamp)
        })

        # Save the updated content
        message_instance.save()

        # Trigger a Pusher event for real-time updates
        pusher_client.trigger(uniqueref, 'new-message', {
            'message': new_message,
            'all_messages': message_instance.content
        })

    # Return all messages in the channel
    return Response({"all_messages": message_instance.content})
