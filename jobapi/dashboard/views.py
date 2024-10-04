import re
import threading
from datetime import datetime, timedelta
from html import unescape

import PyPDF2
import requests
from PyPDF2 import PdfReader
from bs4 import BeautifulSoup
from dateutil.relativedelta import relativedelta
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.db.models import Q, Count
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden
from django.shortcuts import render
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.dateparse import parse_date
from django.utils.html import strip_tags
from rest_framework import status, generics
from rest_framework.decorators import permission_classes, api_view, parser_classes
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from retrying import retry
from taggit.models import Tag

from users.views import MyTokenObtainPairSerializer, pusher_client
from .serializer import *
from users.models import *
from users.serializer import *

from faker import Faker

fake = Faker()


def generate_unique_token():
    return str(uuid.uuid4()).replace('-', '')[:20]


@api_view(['GET'])
def generate_profuuid_for_profiles(request):
    profiles_without_uuid = Individualprofile.objects.all() # Profiles without a profuuid
    updated_count = 0

    for profile in profiles_without_uuid:
        profile.profuuid = generate_unique_token()  # Generate and assign a unique token
        profile.save()  # Save the profile to update the database
        updated_count += 1

    return Response({'message': f"{updated_count} profiles updated with profuuid."})
@api_view(['GET'])
def testcases(request):
    current_user = User.objects.filter(id=23).first()

    # Query messages where the current user is either the sender or receiver
    messages = messagestarter.objects.filter(
        Q(sender=current_user) | Q(reciever=current_user)
    )

    # Query messagefolder model for all message IDs in the selected messages
    all_messages_folders = messagefolder.objects.filter(messageid__in=messages).all()

    all_messages_folders_serializer = messageserializer(all_messages_folders, many=True)

    context = {
        'all_messages_folders': all_messages_folders_serializer.data,
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def jobseekerdashboard(request):
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    # Query messages where the current user is either the sender or receiver
    messages = messagestarter.objects.filter(
        Q(sender=user) | Q(reciever=user)
    )

    # Query messagefolder model for all message IDs in the selected messages
    all_messages_folders = messagefolder.objects.filter(messageid__in=messages).all().order_by('-lastupdated')
    all_messages_folders_serializer = messageserializer(all_messages_folders, many=True)
    alluser = User.objects.exclude(id=10)
    allusers = Userserializer(alluser, many=True)
    usecases = messagestarter.objects.filter(Q(sender=user) | Q(reciever=user)).all()
    usecase = messagestarterserializer(usecases, many=True)
    jobcard = Jobs.objects.all().order_by('-id')[:7]
    jobserialized = Jobserializer(jobcard, many=True)
    jobcardcount = Jobs.objects.filter(likes__in=[user]).all().order_by('-id').count()
    submitcount = Applications.objects.filter(user=request.user).count()

    context = {
        'usecase': usecase.data,
        'allmessages': all_messages_folders_serializer.data,
        'jobserialized': jobserialized.data,
        'submitcount': submitcount,
        'jobcardcount': jobcardcount,
        'allusers': allusers.data
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chatdashboard(request):
    current_time = timezone.now()

    # Update the last seen timestamp for the user's profile
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )

    user = request.user

    # Optimized query using select_related for sender and receiver relationships
    usecases = messagestarter.objects.filter(
        Q(sender=user) | Q(reciever=user)
    ).select_related('sender', 'reciever')

    # Serialize the message starter instances
    usecase_serializer = chatmessagestarterserializer(usecases, many=True)

    # Fetch all profiles except the current user and serialize them
    all_profiles = Profile.objects.exclude(user=user).select_related('user')
    all_profiles_serializer = ChatProfileSerializer(all_profiles, many=True)

    # Prepare the response context
    context = {
        'usecase': usecase_serializer.data,
        'allprofile': all_profiles_serializer.data
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def messagedashboard(request):
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    # Query messages where the current user is either the sender or receiver
    messages = messagestarter.objects.filter(
        Q(sender=user) | Q(reciever=user)
    )

    all_messages_folders = messagefolder.objects.filter(messageid__in=messages).all().order_by('-lastupdated')
    all_messages_folders_serializer = chatmessageserializer(all_messages_folders, many=True)
    context = {
        'allmessages': all_messages_folders_serializer.data,
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userprofile(request, id):
    user = request.user
    current_time = timezone.now()
    user_profile = Profile.objects.filter(user=user).first()
    user_profile.last_seen = current_time
    user_profile.save()
    userprofile = Completeprofile(user_profile)
    workexpdata = workexperience.objects.filter(user=user).all()
    workexp = Workexperienceserialaizer(workexpdata, many=True)
    edudata = University.objects.filter(user=user).all()
    edu = Universityserialaizer(edudata, many=True)

    context = {
        'workexp': workexp.data,
        'edu': edu.data,
        'userprofile': userprofile.data
    }
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
def anonuserprofile(request, id):
    # Try to get the user's profile by profuuid
    try:
        myuserprofile = get_object_or_404(Individualprofile, profuuid=id)
    except Individualprofile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user associated with the profile exists
    if not hasattr(myuserprofile, 'user'):
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the user profile
    userprofile = Individualreview(myuserprofile)

    # Serialize the user's work experience
    workexpdata = workexperience.objects.filter(user=myuserprofile.user)
    workexp = Workexperienceserialaizer(workexpdata, many=True)

    # Serialize the user's education data
    edudata = University.objects.filter(user=myuserprofile.user)
    edu = Universityserialaizer(edudata, many=True)

    # Prepare the response context
    context = {
        'workexp': workexp.data,
        'edu': edu.data,
        'userprofile': userprofile.data
    }

    return Response(context, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usersaves(request):
    user = request.user
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    jobcards = Jobs.objects.filter(likes__in=[user]).all().order_by('-id').filter(is_paidfor=True) \
        .select_related('organization') \
        .only(
        'status', 'is_paidfor', 'joblocation', 'selected_lga', 'applicationenddate',
        'applicationpublish', 'jobpostdate', 'jobtitle', 'ref', 'jobservice', 'joblocation',
        'jobcategory', 'jobsalaryrange', 'workinglevel', 'jobdescription', 'responsibilities',
        'requirements', 'organization__organization_name', 'organization__logo'
    ) \
        .prefetch_related('likes') \
        .order_by('-id')
    jobcard = Jobserializer(jobcards, many=True)

    context = {
        'jobcards': jobcard.data,
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userapplications(request):
    application = Applications.objects.filter(user=request.user).select_related('jobapplied').select_related(
        'author').all()
    appdata = Appliucationserializer(application, many=True)
    return Response(appdata.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def savedlike_post(request):
    if request.method == 'POST':
        # Get the post ID from the POST data
        post_id = request.data.get('post_id')

        # Retrieve the post object from the database
        try:
            post = Jobs.objects.get(id=post_id)
        except Jobs.DoesNotExist:
            return JsonResponse({'saved': False, 'message': 'Post not found'})

        # Check if the post is already saved by the current user
        if post.likes.filter(id=request.user.id).exists():
            # If yes, remove the current user from the post's saved_by ManyToMany field
            post.likes.remove(request.user)
            saved = False
            message = 'Post unsaved successfully'
            user = request.user
            jobcards = Jobs.objects.filter(likes__in=[user]).all().order_by('-id')
            jobcard = Jobserializer(jobcards, many=True)

            context = {
                'jobcards': jobcard.data,
                'saved': saved,
                'message': message
            }

            return Response(context, status=status.HTTP_200_OK)
        else:
            # If no, add the current user to the post's saved_by ManyToMany field
            post.likes.add(request.user)
            saved = True
            message = 'Post saved successfully'
            user = request.user
            jobcards = Jobs.objects.filter(likes__in=[user]).all().order_by('-id')
            jobcard = Jobserializer(jobcards, many=True)

            context = {
                'jobcards': jobcard.data,
                'saved': saved,
                'message': message
            }

            return Response(context, status=status.HTTP_200_OK)

    # Return an error response for unsupported methods
    return JsonResponse({'saved': False, 'message': 'Invalid request method'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request):
    post_id = request.data.get('post_id')

    # Check if post ID is provided
    if not post_id:
        return JsonResponse({'saved': False, 'message': 'Post ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Retrieve the post object
    try:
        post = Jobs.objects.get(ref=post_id)
    except Jobs.DoesNotExist:
        return JsonResponse({'saved': False, 'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    # Toggle the like status for the post
    if post.likes.filter(id=request.user.id).exists():
        post.likes.remove(request.user)
        saved = False
        message = 'Post unsaved successfully'
    else:
        post.likes.add(request.user)
        saved = True
        message = 'Post saved successfully'

    # Serialize the updated list of job cards
    job_cards = Jobs.objects.filter(is_paidfor=True) \
        .select_related('organization') \
        .only(
        'status', 'is_paidfor', 'joblocation', 'selected_lga', 'applicationenddate',
        'applicationpublish', 'jobpostdate', 'jobtitle', 'ref', 'jobservice', 'joblocation',
        'jobcategory', 'jobsalaryrange', 'workinglevel', 'jobdescription', 'responsibilities',
        'requirements', 'organization__organization_name', 'organization__logo'
    ) \
        .prefetch_related('likes') \
        .order_by('-id')
    serialized_jobs = Jobserializer(job_cards, many=True)

    context = {
        'jobcards': serialized_jobs.data,
        'saved': saved,
        'message': message
    }

    return Response(context, status=status.HTTP_200_OK)


def like_blog(request):
    if request.method == 'POST':
        # Get the post ID from the POST data
        post_id = request.POST.get('post_id')

        # Retrieve the post object from the database
        try:
            post = postings.objects.get(id=post_id)
        except postings.DoesNotExist:
            return JsonResponse({'saved': False, 'message': 'Post not found'})

        # Check if the post is already saved by the current user
        if post.likes.filter(id=request.user.id).exists():
            # If yes, remove the current user from the post's saved_by ManyToMany field
            post.likes.remove(request.user)
            saved = False
            message = 'Post liked successfully'
            like_count = post.likes.count()
        else:
            # If no, add the current user to the post's saved_by ManyToMany field
            post.likes.add(request.user)
            saved = True
            message = 'Post unliked successfully'
            like_count = post.likes.count()

        return JsonResponse({'saved': saved, 'message': message, 'like_count': like_count})

    # Return an error response for unsupported methods
    return JsonResponse({'saved': False, 'message': 'Invalid request method'})


def unlike_post(request, id):
    post = get_object_or_404(Jobs, id=id)
    post.likes.remove(request.user)
    likes_count = post.likes.count()
    print('clicked')
    return JsonResponse({'likes': likes_count})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userjobsdetail(request, id):
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    jobdetails = get_object_or_404(Jobs, id=id)
    jobdetail = Jobserializer(jobdetails)
    jobcard = Jobs.objects.all().exclude(id=jobdetails.id)[:4]
    jobcards = Jobserializer(jobcard, many=True)
    # user_publication_set = set(request.user.blogpost_like.values_list('id', flat=True))
    jds = jobfeatures.objects.filter(user=id)
    jd = Featuresserializer(jds)
    context = {
        # 'user_publication_set': user_publication_set,
        'jobdetail': jobdetail.data,
        'jobcards': jobcards.data,
        'jd': jd.data
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def keyword(request):
    userfirstname = request.user.first_name
    userlastname = request.user.first_name
    myuserprofile = 5
    if request.method == "POST":
        keyword = request.POST.get('keyword')
        keywordcount = Jobsalert.objects.filter(user=request.user).count()
        print(keywordcount)
        print(Jobsalert.objects.filter(user=request.user))
        account_users = Jobsalert.objects.filter(keyword=keyword).exists()
        if account_users:
            return Response({'message': 'This keyword already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if keyword.is_valid:
                if keywordcount >= myuserprofile:
                    return Response({'message': 'You Have Exceeded Your Keyword Limit which is 5'},
                                    status=status.HTTP_400_BAD_REQUEST)
                else:
                    vee = Jobsalert.objects.create(user=request.user, keyword=keyword)
                    vee.save()
                    return Response({'message': 'Key Word Added Successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'We Are Unable To Process Your Request'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usermessagecreate(request, id):
    current_time = timezone.now()

    # Update or create the profile's last_seen for the current user
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )

    # Fetch the recipient user
    myuser = get_object_or_404(User, id=id)

    # Generate a random message ID
    otp = shortuuid.ShortUUID(alphabet="0123456789").random(length=15)

    # Check if there are existing conversations involving the current user
    message_starter_qs = messagestarter.objects.filter(
        Q(sender=request.user, reciever=myuser) | Q(sender=myuser, reciever=request.user)
    )

    if message_starter_qs.exists():
        # Fetch the first matched conversation
        allvee = message_starter_qs.first()
        message_id = allvee.messageid
        usecase = messagestarterserializer(allvee)

        # Return the existing conversation
        return Response({
            'usecase': usecase.data,
            'id': message_id,
            'message': 'Successfully fetched'
        }, status=status.HTTP_200_OK)

    # Create a new message starter if no conversation exists
    messageobj = messagestarter.objects.create(
        sender=request.user,
        reciever=myuser,
        messagetime=datetime.today(),
        messageid=otp
    )

    # Create or update the message folder
    messagefolder.objects.update_or_create(
        messageid=messageobj.messageid,
        defaults={'messageid': messageobj}
    )

    usecase = messagestarterserializer(messageobj)

    # Return the new conversation details
    return Response({
        'usecase': usecase.data,
        'id': messageobj.messageid,
        'message': 'Message Object Created'
    }, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def messageportal(request, id):
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    # Query messages where the current user is either the sender or receiver
    messages = messagestarter.objects.filter(
        Q(sender=user) | Q(reciever=user)
    )

    all_messages_folders = messagefolder.objects.filter(messageid__in=messages).all().order_by('-lastupdated')
    all_messages_folders_serializer = messageserializer(all_messages_folders, many=True)
    messagetone = get_object_or_404(messagestarter, messageid=id)
    messagetonedata = messagestarterserializer(messagetone)
    vee = timezone.now()
    if request.method == 'POST':
        myimage = request.data.get('myimg')
        keyword = request.data.get('keyword')
        print(keyword)
        if messagetone.sender == request.user:
            if myimage:
                serializer = UploadedImage.objects.create(image=myimage)
                serializer.save()
                serializeddata = Imagetest(serializer)
                dest12 = {"sender": f"{request.user}", "reciever": f"{messagetone.reciever}", "messageid": f"{id}",
                          "messagetime": f"{vee}", "message": f"{keyword}", "image": True,
                          "imageurl": serializeddata.data}
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                jsondata.testj.append(dest12)
                jsondata.save()
                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }
                return Response(apidata, status=status.HTTP_200_OK)
            else:
                dest12 = {"sender": f"{request.user}", "reciever": f"{messagetone.reciever}", "messageid": f"{id}",
                          "messagetime": f"{vee}", "message": f"{keyword}", "image": False}
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                jsondata.testj.append(dest12)
                jsondata.save()
                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }

                return Response(apidata, status=status.HTTP_200_OK)
        if messagetone.reciever == request.user:
            if myimage:
                serializer = UploadedImage.objects.create(image=myimage)
                serializer.save()
                serializeddata = Imagetest(serializer)
                dest12 = {"sender": f"{messagetone.reciever}", "reciever": f"{request.user}", "messageid": f"{id}",
                          "messagetime": f"{vee}", "message": f"{keyword}", "image": True,
                          "imageurl": serializeddata.data}
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                jsondata.testj.append(dest12)
                jsondata.save()
                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }

                return Response(apidata, status=status.HTTP_200_OK)
            else:
                dest12 = {"sender": f"{messagetone.reciever}", "reciever": f"{request.user}", "messageid": f"{id}",
                          "messagetime": f"{vee}", "message": f"{keyword}", "image": False}
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                jsondata.testj.append(dest12)
                jsondata.save()
                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }

                return Response(apidata, status=status.HTTP_200_OK)

    mymessage = messagefolder.objects.filter(messageid=messagetone).first()
    messageserialized = messageserializer(mymessage)

    apidata = {
        'messageserialized': messageserialized.data,
        'usersdataserialized': messagetonedata.data,
        'allmessages': all_messages_folders_serializer.data
    }

    return Response(apidata, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def messageportals(request, id):
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    # Query messages where the current user is either the sender or receiver
    messages = messagestarter.objects.filter(
        Q(sender=user) | Q(reciever=user)
    )

    # Query messagefolder model for all message IDs in the selected messages
    all_messages_folders = messagefolder.objects.filter(messageid__in=messages).all().order_by('-lastupdated')
    all_messages_folders_serializer = messageserializer(all_messages_folders, many=True)
    messagetone = get_object_or_404(messagestarter, messageid=id)
    print(messagetone)
    messagetonedata = messagestarterserializer(messagetone)
    vee = timezone.now()
    if request.method == 'POST':
        print('request', request.data)
        myimage = request.data.get('myimg')
        data = request.data.get('data')  # Assuming 'data' is the key containing the JSON payload
        image_data = request.FILES.get('myaudio')
        print('imafe is', myimage)
        print('data', data)
        if messagetone.sender == request.user:
            if image_data:
                serializerz = Image.objects.create(image=image_data)
                serializerz.save()
                serializer = ImageSerializer(serializerz).data

                data_dict = {}
                for key, value in request.data.items():
                    if 'myaudio' not in key:
                        field_name = key.split('[')[-1][:-1]  # Extract field name
                        data_dict[field_name] = value  # Assuming each key has only one value

                data_dict['datetime'] = str(vee)
                data_dict['senderid'] = request.user.id
                data_dict['recieverid'] = messagetone.reciever.id
                data_dict['audio_url'] = serializer['image']
                dest12 = data_dict
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                jsondata.testj.append(dest12)
                jsondata.save()
                print('json obj', dest12)

                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                # print(mymessage)
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }
                return Response(apidata, status=status.HTTP_200_OK)
            elif myimage:
                data_dict = {}
                for key, value in request.data.items():
                    if 'myimg' not in key:
                        field_name = key.split('[')[-1][:-1]  # Extract field name
                        data_dict[field_name] = value  # Assuming each key has only one value

                serializer = UploadedImage.objects.create(image=myimage)
                serializer.save()
                serializeddata = Imagetest(serializer).data
                print('serialized image', serializeddata)
                data_dict['datetime'] = str(vee)
                data_dict['senderid'] = request.user.id
                data_dict['recieverid'] = messagetone.reciever.id
                data_dict['imageUrl'] = serializeddata['image']
                dest12 = data_dict
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                jsondata.testj.append(dest12)
                jsondata.save()
                print('json obj', dest12)

                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                # print(mymessage)
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }
                return Response(apidata, status=status.HTTP_200_OK)
            else:
                data['datetime'] = str(vee)
                data['senderid'] = request.user.id
                data['recieverid'] = messagetone.reciever.id

                dest12 = data
                print(data)
                print(str(request.user))
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                jsondata.testj.append(dest12)
                jsondata.save()
                print('done', jsondata)
                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }

                return Response(apidata, status=status.HTTP_200_OK)
        if messagetone.reciever == request.user:
            if image_data:
                serializerz = Image.objects.create(image=image_data)
                serializerz.save()
                serializer = ImageSerializer(serializerz).data

                data_dict = {}
                for key, value in request.data.items():
                    if 'myaudio' not in key:
                        field_name = key.split('[')[-1][:-1]  # Extract field name
                        data_dict[field_name] = value  # Assuming each key has only one value

                data_dict['datetime'] = str(vee)
                data_dict['senderid'] = messagetone.reciever.id
                data_dict['recieverid'] = request.user.id
                data_dict['audio_url'] = serializer['image']
                dest12 = data_dict
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                jsondata.testj.append(dest12)
                jsondata.save()
                print('json obj', dest12)

                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                # print(mymessage)
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }
                return Response(apidata, status=status.HTTP_200_OK)

            elif myimage:
                data_dict = {}
                for key, value in request.data.items():
                    if 'myimg' not in key:
                        field_name = key.split('[')[-1][:-1]  # Extract field name
                        data_dict[field_name] = value  # Assuming each key has only one value

                serializer = UploadedImage.objects.create(image=myimage)
                serializer.save()
                serializeddata = Imagetest(serializer).data
                print('serialized image', serializeddata)
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                data_dict['datetime'] = str(vee)
                data_dict['senderid'] = messagetone.reciever.id
                data_dict['recieverid'] = request.user.id
                data_dict['imageUrl'] = serializeddata['image']
                dest12 = data_dict
                jsondata.testj.append(dest12)

                jsondata.save()
                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }

                return Response(apidata, status=status.HTTP_200_OK)
            else:
                jsondata = get_object_or_404(messagefolder, messageid=messagetone)
                data['datetime'] = str(vee)
                data['senderid'] = messagetone.reciever.id
                data['recieverid'] = request.user.id
                dest12 = data
                jsondata.testj.append(dest12)
                jsondata.save()
                mymessage = messagefolder.objects.filter(messageid=messagetone).first()
                messageserialized = messageserializer(mymessage)

                apidata = {
                    'messageserialized': messageserialized.data,
                    'usersdataserialized': messagetonedata.data,
                    'allmessages': all_messages_folders_serializer.data
                }

                return Response(apidata, status=status.HTTP_200_OK)

    mymessage = messagefolder.objects.filter(messageid=messagetone).first()
    messageserialized = messageserializer(mymessage)

    apidata = {
        'messageserialized': messageserialized.data,
        'usersdataserialized': messagetonedata.data,
        'allmessages': all_messages_folders_serializer.data
    }

    return Response(apidata, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # Uncomment this line to enforce authentication
def themessageportals(request, id):
    current_time = timezone.now()
    user = request.user  # Use the authenticated user

    channel_name = f'message-channel-{id}'
    vee = timezone.now()

    # Fetch all messages where the current user is the sender or receiver
    messages = messagestarter.objects.filter(Q(sender=user) | Q(reciever=user))

    # Fetch all relevant message folders

    all_messages_folders = messagefolder.objects.filter(messageid__in=messages).order_by('-lastupdated')
    all_messages_folders_serializer = messageserializer(all_messages_folders, many=True)

    # Get the specific message by ID
    messagetone = get_object_or_404(messagestarter, messageid=id)
    messagetonedata = messagestarterserializer(messagetone)

    # If POST request is received, handle the message update
    if request.method == 'POST':
        data_dict = {}
        for key, value in request.data.items():
            if 'myimg' not in key and 'myaudio' not in key:
                field_name = key.split('[')[-1][:-1]  # Extract the field name correctly
                data_dict[field_name] = value

        data_dict['datetime'] = str(vee)
        data_dict['senderid'] = user.id if messagetone.sender.id == user.id else messagetone.reciever.id
        data_dict['recieverid'] = messagetone.reciever.id if messagetone.sender.id == user.id else user.id
        channid = messagetone.reciever.id if messagetone.sender.id == user.id else messagetone.sender.id
        channel_name = f'message-channel-{channid}'
        # Handle file uploads (audio or image)
        image_data = request.FILES.get('myaudio', None)
        myimage = request.FILES.get('myimg', None)

        if image_data:
            # Handle audio file upload
            serializerz = Image.objects.create(image=image_data)
            data_dict['audio_url'] = ImageSerializer(serializerz).data['image']
        elif myimage:
            # Handle image upload
            serializer = UploadedImage.objects.create(image=myimage)
            data_dict['imageUrl'] = Imagetest(serializer).data['image']

        jsondata, created = messagefolder.objects.get_or_create(messageid=messagetone)
        jsondata.testj.append(data_dict)
        jsondata.save()

        # Prepare the response with serialized data
        mymessage, created = messagefolder.objects.get_or_create(messageid=messagetone)
        messageserialized = messageserializer(mymessage)

        apidata = {
            'messageserialized': messageserialized.data,
            'allmessages': all_messages_folders_serializer.data
        }

        # Trigger Pusher event
        pusher_client.trigger(channel_name, 'new-message', {
            'messageserialized': messageserialized.data,

        })

        return Response(apidata, status=status.HTTP_200_OK)

    # For GET request, return the message data
    mymessage, created = messagefolder.objects.get_or_create(messageid=messagetone)
    messageserialized = messageserializer(mymessage)
    apidata = {
        'messageserialized': messageserialized.data,
        'usersdataserialized': messagetonedata.data,
        'allmessages': all_messages_folders_serializer.data
    }

    # # Trigger Pusher event
    # pusher_client.trigger(channel_name, 'new-message', {
    #     'usersdataserialized': messagetonedata.data,
    #     'allmessages': all_messages_folders_serializer.data
    # })

    return Response(apidata, status=status.HTTP_200_OK)


# @api_view(['GET', 'POST'])
# # @permission_classes([IsAuthenticated])
# def themessageportals(request, id):
#     current_time = timezone.now()
#     user = request.user
#     # Update last_seen for the current user
#
#
#     channel_name = f'message-channel-{id}'
#     vee = timezone.now()
#
#     # Fetch all messages where the current user is the sender or receiver
#     messages = messagestarter.objects.filter(Q(sender=user) | Q(reciever=user))
#
#     # Fetch all relevant message folders
#     all_messages_folders = messagefolder.objects.filter(messageid__in=messages).order_by('-lastupdated')
#     all_messages_folders_serializer = messageserializer(all_messages_folders, many=True)
#
#     # Get the message by ID
#     messagetone = get_object_or_404(messagestarter, messageid=id)
#     messagetonedata = messagestarterserializer(messagetone)
#
#     # If POST request is received, handle the message update
#     if request.method == 'POST':
#         data_dict = {}
#         for key, value in request.data.items():
#             if 'myimg' not in key and 'myaudio' not in key:
#                 field_name = key.split('[')[-1][:-1]  # Extract field name
#                 data_dict[field_name] = value
#
#         data_dict['datetime'] = str(vee)
#         data_dict['senderid'] = user.id if messagetone.sender == user.id else messagetone.reciever.id
#         data_dict['recieverid'] = messagetone.reciever.id if messagetone.sender == user.id else user.id
#
#         # Handle file uploads (audio or image)
#         image_data = request.FILES.get('myaudio')
#         myimage = request.data.get('myimg')
#
#         if image_data:
#             # Handle audio upload
#             serializerz = Image.objects.create(image=image_data)
#             data_dict['audio_url'] = ImageSerializer(serializerz).data['image']
#         elif myimage:
#             # Handle image upload
#             serializer = UploadedImage.objects.create(image=myimage)
#             data_dict['imageUrl'] = Imagetest(serializer).data['image']
#
#         # Append new message data to the message folder
#         jsondata = get_object_or_404(messagefolder, messageid=messagetone)
#         jsondata.testj.append(data_dict)
#         jsondata.save()
#
#         # Prepare response
#         mymessage = messagefolder.objects.filter(messageid=messagetone).first()
#         messageserialized = messageserializer(mymessage)
#
#         apidata = {
#             'messageserialized': messageserialized.data,
#             'usersdataserialized': messagetonedata.data,
#             'allmessages': all_messages_folders_serializer.data
#         }
#
#         pusher_client.trigger(channel_name, 'new-message', {
#             'messageserialized': messageserialized.data,
#             'usersdataserialized': messagetonedata.data,
#             'allmessages': all_messages_folders_serializer.data
#         })
#
#         return Response(apidata, status=status.HTTP_200_OK)
#
#     # For GET request, return the message data
#     mymessage = messagefolder.objects.filter(messageid=messagetone).first()
#     messageserialized = messageserializer(mymessage)
#
#     apidata = {
#         'messageserialized': messageserialized.data,
#         'usersdataserialized': messagetonedata.data,
#         'allmessages': all_messages_folders_serializer.data
#     }
#
#     pusher_client.trigger(channel_name, 'new-message', {
#         'messageserialized': messageserialized.data,
#         'usersdataserialized': messagetonedata.data,
#         'allmessages': all_messages_folders_serializer.data
#     })
#
#     return Response(apidata, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def deletemessageportals(request, id):
    messagetone = get_object_or_404(messagestarter, messageid=id)
    messagetonedata = messagestarterserializer(messagetone)
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    # Query messages where the current user is either the sender or receiver
    messages = messagestarter.objects.filter(
        Q(sender=user) | Q(reciever=user)
    )

    # Query messagefolder model for all message IDs in the selected messages
    all_messages_folders = messagefolder.objects.filter(messageid__in=messages).all().order_by('-lastupdated')
    all_messages_folders_serializer = messageserializer(all_messages_folders, many=True)

    print(messagetone)
    vee = timezone.now()
    if request.method == 'POST':
        data = request.data.get('data_id')  # Assuming 'data' is the key containing the JSON payloa
        id_to_update = int(data)
        scans = messagefolder.objects.filter(messageid=messagetone).filter(
            testj__contains=[{"id": id_to_update}]).first()
        print('scan is', scans)

        # Retrieve the messagefolder object
        scan = messagefolder.objects.filter(messageid=messagetone).first()

        # Check if the object exists and if it has the specified ID in the `testj` field
        if scan and scan.testj:
            # Iterate through each JSON object in the `testj` field
            for item in scan.testj:
                # Check if the current object has the specified ID
                if int(item.get('id')) == id_to_update:
                    print('item is ', item)
                    # Update the fields of the JSON object
                    item['type'] = 'deleted'
                    # Save the changes to the database
                    scan.save()
                    break  # Exit the loop since the update is done

    mymessage = messagefolder.objects.filter(messageid=messagetone).first()
    messageserialized = messageserializer(mymessage)

    apidata = {
        'messageserialized': messageserialized.data,
        'usersdataserialized': messagetonedata.data,
        'allmessages': all_messages_folders_serializer.data
    }

    return Response(apidata, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userjobs(request):
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    jobcard = Jobs.objects.all().order_by('-id')
    jobcardscount = Jobs.objects.all().count()
    jobserialized = Jobserializer(jobcard, many=True)

    context = {
        'jobcards': jobserialized.data,
        'jobcardscount': jobcardscount,
    }
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def userqrcards(request):
    qrcards = qrcodes.objects.all().order_by('-id')
    qrcardsserialized = QrcodeSerializer(qrcards, many=True)

    context = {
        'qrcards': qrcardsserialized.data,

    }
    return Response(context, status=status.HTTP_200_OK)


import random


def jobprint(request):
    # Generate a fake job title
    keywords = [
        "software development",
        "data science",
        "product management",
        "marketing management",
        "sales and business development",
        "customer support",
        "financial planning and analysis",
        "human resources",
        "user experience (UX) design",
        "user interface (UI) design",
        "full-stack development",
        "front-end development",
        "back-end development",
        "cloud computing",
        "DevOps",
        "database administration",
        "content marketing",
        "social media management",
        "content strategy",
        "cybersecurity",
        "network security",
        "IT support",
        "project coordination",
        "agile methodology",
        "quality control",
        "mobile app development",
        "web design and development",
        "e-commerce management",
        "SEO optimization",
        "data entry and analysis",
        "market research",
        "public relations",
        "event planning",
        "legal counsel",
        "health and safety management",
        "supply chain management",
        "logistics coordination",
        "environmental sustainability",
        "data visualization",
        "systems architecture",
        "brand management",
        "video production",
        "multimedia design",
        "gaming development",
        "education and training",
        "non-profit management",
        "project scheduling",
        "research and development",
        "healthcare administration",
        "hospitality management",
    ]

    job_description_templates = [
        "Join our team as a {job_title} in {job_location}. We are seeking a skilled {job_service} professional to {job_action}. Your role will involve {job_responsibilities}.",
        "Are you ready for a rewarding career as a {job_title} in {job_location}? We're looking for an experienced {job_service} expert to {job_action}. Your responsibilities will include {job_responsibilities}.",
        "We're hiring a {job_title} based in {job_location}. If you have expertise in {job_service}, apply now. You'll be responsible for {job_action} and {job_responsibilities}.",
        "As a {job_title} in {job_location}, you'll lead our {job_team} to {job_action}. Your role includes {job_responsibilities}.",
        "Become a {job_title} in {job_location} and make a difference in {job_service}. You'll be responsible for {job_action} and {job_responsibilities}.",
        "Join us as a {job_title} in {job_location}. We're looking for a {job_service} professional to {job_action}. Your contributions will include {job_responsibilities}.",
        "We're seeking a talented {job_title} based in {job_location}. If you're passionate about {job_service}, apply now. Your role involves {job_action} and {job_responsibilities}.",
        "As a {job_title} in {job_location}, you will work closely with our {job_team} to {job_action}. Your responsibilities include {job_responsibilities}.",
        "Start your career as a {job_title} in {job_location}. We need a {job_service} expert to {job_action}. Your role will encompass {job_responsibilities}.",
        "Join our {job_team} in {job_location} as a {job_title}. We're looking for someone with {job_service} skills to {job_action}. Your contributions will be in {job_responsibilities}.",
    ]

    # List of potential values for placeholders
    job_titles = ["Software Engineer", "Data Analyst", "Marketing Manager", "Sales Representative", "UX/UI Designer",
                  "Project Manager", "Financial Analyst", "Product Designer", "Customer Success Specialist",
                  "Business Analyst"]
    job_locations = ["New York", "San Francisco", "Los Angeles", "Chicago", "Boston", "London", "Berlin", "Tokyo",
                     "Sydney", "Toronto"]
    job_services = ["software development", "data analysis", "marketing strategy", "customer relations",
                    "financial analysis", "project management", "product design", "business development",
                    "quality assurance", "digital marketing"]
    job_actions = ["lead a team of professionals", "develop cutting-edge solutions", "drive marketing campaigns",
                   "manage client relationships", "analyze financial data", "oversee project delivery",
                   "design innovative products", "expand our market presence", "ensure product quality",
                   "optimize online advertising"]
    job_responsibilities = ["leading projects", "collaborating with cross-functional teams",
                            "delivering exceptional results", "meeting deadlines", "ensuring quality",
                            "driving innovation", "managing budgets", "implementing strategies",
                            "conducting data analysis", "customer acquisition"]
    job_teams = ["a talented group of professionals", "a cross-functional team", "our dedicated engineering team",
                 "a group of creative designers", "a high-performing sales team", "a dynamic marketing department",
                 "our innovative research team", "a customer-focused support team", "a skilled development team",
                 "a collaborative project management team"]

    # Generate a random job title
    user = User.objects.filter(id=10).first()
    for _ in range(10):
        job_title = fake.job()

        # Generate a random job location
        job_location = fake.city()

        job_description_template = random.choice(job_description_templates)
        job_title = job_title
        job_location = job_location
        job_service = random.choice(job_services)
        job_action = random.choice(job_actions)
        job_responsibility = random.choice(job_responsibilities)
        job_team = random.choice(job_teams)

        job_description = job_description_template.format(
            job_title=job_title,
            job_location=job_location,
            job_service=job_service,
            job_action=job_action,
            job_responsibilities=job_responsibility,
            job_team=job_team,
        )

        Jobs.objects.create(jobtitle=job_title, jobservice=random.choice(keywords), joblocation=job_location,
                            jobminimumexperience=10, jobdescription=job_description, user=user,
                            workinglevel='Senior Level', jobemploymenttype='Full-Time'
                            )

    return HttpResponse('hello world')


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def userjobssinglepage(request, id):
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    jobcard = Jobs.objects.filter(id=id).first()
    jobserialized = Jobserializer(jobcard)

    context = {
        'jobcard': jobserialized.data,
    }
    return Response(context, status=status.HTTP_200_OK)


def timetest(request):
    vee = datetime.now().date().strftime("%Y-%m-%d %H:%M:%S")
    print(vee)
    current_datetime = timezone.now()
    veetwo = datetime.now()
    print(veetwo)

    return HttpResponse(f'{current_datetime}  hello  {veetwo} world')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_job_application_page(request, id):
    user = User.objects.filter(id=10).first()
    user_profile = Profile.objects.filter(user=user).first()
    userprofile = Completeprofile(user_profile)
    try:
        jb = Jobs.objects.get(id=id)
    except Jobs.DoesNotExist:
        return JsonResponse({'saved': False, 'message': 'Job not found'})

    work_exp = workexperience.objects.filter(user=user).all()
    edu = University.objects.filter(user=user).all()

    if request.method == 'GET':
        my_jb = Jobserializer(jb)
        my_work_exp = Workexperienceserializer(work_exp, many=True)
        my_edu = Educationserializer(edu, many=True)

        context = {
            'job_detail': my_jb.data,
            'education_detail': my_edu.data,
            'work_experience': my_work_exp.data,
            'userprofile': userprofile.data

        }
        return Response(context, status=status.HTTP_200_OK)

    # Return an error response for unsupported methods
    return JsonResponse({'saved': False, 'message': 'Invalid request method'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def extract_hashtags(request, format=None):
    text = request.data.get('text', '')  # Get the text from the POST request data
    image = request.data.get('myimg')
    hashtags_with_symbol = re.findall(r'#\w+', text)  # Find words starting with #hashtags
    hashtags_without_symbol = [tag[1:] for tag in hashtags_with_symbol]  # Remove the # symbol

    s = shortuuid.ShortUUID(alphabet="0123456789")
    otp = s.random(length=15)

    # Create an instance of your model
    user = request.user
    your_model_instance = postings(message=text, messageid=otp, user=user, image=image if image else None)
    your_model_instance.save()

    # Add the hashtags as tags to the model instance
    your_model_instance.tags.add(*hashtags_without_symbol)

    serializer = postingserializer(your_model_instance)

    allposts = postings.objects.all().order_by('-id')
    postserializer = postingserializer(allposts, many=True)
    json_data_lists = []
    queryset2 = postings.tags.most_common()[:4]
    common_tags = queryset2.annotate(num_times=Count('taggit_taggeditem_items'))
    for a in common_tags:
        # Construct a dictionary with the desired data
        datas = {"name": a.slug, "number": a.num_times}  # Replace with your data

        # Append the dictionary to the list
        json_data_lists.append(datas)

    context = {
        'allposts': postserializer.data,
        'trending': json_data_lists,
    }
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Timeline(request):
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    allposts = postings.objects.all().order_by('-id')
    postserializer = postingserializer(allposts, many=True)
    queryset2 = postings.tags.most_common()[:4]
    myprofile = Profile.objects.filter(user=request.user).first()
    myprofileserializer = ProfileSerializer(myprofile)
    # Exclude the current user by ID
    all_records_except_current_user = Profile.objects.all().exclude(user=request.user).order_by('?')[:2]

    profileserializer = ProfileSerializer(all_records_except_current_user, many=True)
    json_data_lists = []
    common_tags = queryset2.annotate(num_times=Count('taggit_taggeditem_items'))
    for a in common_tags:
        # Construct a dictionary with the desired data
        datas = {"name": a.slug, "number": a.num_times}  # Replace with your data

        # Append the dictionary to the list
        json_data_lists.append(datas)

    context = {
        'allposts': postserializer.data,
        'trending': json_data_lists,
        'profileserializer': profileserializer.data,
        'myprofileserializer': myprofileserializer.data
    }
    return Response(context, status=status.HTTP_200_OK)


from django.core import serializers, mail


class CommonTagAPIView(APIView):
    def get(self, request):
        # Query the common tags
        # allposts = postings.objects.all().order_by('-id')
        # postserializer = tagspostingserializer(allposts, many=True)
        myuser = User.objects.filter(id=11).first()

        # Exclude the current user by ID
        all_records_except_current_user = Profile.objects.all().exclude(user=myuser).order_by('?')[:2]

        # Serialize the shuffled queryset using the Userserializer
        profileserializer = ProfileSerializer(all_records_except_current_user, many=True)
        queryset2 = postings.tags.most_common()[:4]
        json_data_lists = []
        common_tags = queryset2.annotate(num_times=Count('taggit_taggeditem_items'))
        for a in common_tags:
            # Construct a dictionary with the desired data
            datas = {"name": a.slug, "number": a.num_times}  # Replace with your data

            # Append the dictionary to the list
            json_data_lists.append(datas)

        context = {
            # 'allposts': postserializer.data,
            'tagdata': json_data_lists,
            'all_records_except_current_user': profileserializer.data
        }
        return Response(context, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def savedtimelinepost(request):
    queryset2 = postings.tags.most_common()[:4]
    json_data_lists = []
    common_tags = queryset2.annotate(num_times=Count('taggit_taggeditem_items'))
    for a in common_tags:
        # Construct a dictionary with the desired data
        datas = {"name": a.slug, "number": a.num_times}  # Replace with your data

        # Append the dictionary to the list
        json_data_lists.append(datas)
    myuser = request.user
    if request.method == 'POST':
        # Get the post ID from the POST data
        post_id = request.data.get('post_id')

        # Retrieve the post object from the database
        try:
            post = postings.objects.get(messageid=post_id)
        except postings.DoesNotExist:
            return JsonResponse({'saved': False, 'message': 'Post not found'})

        # Check if the post is already saved by the current user
        if post.likes.filter(id=myuser.id).exists():
            # If yes, remove the current user from the post's saved_by ManyToMany field
            post.likes.remove(myuser)
            saved = False
            message = 'Post unliked'
            post = postings.objects.filter(messageid=post_id).first()
            postserialized = postingserializer(post)
            slug = request.data.get('tagslug')
            if (slug):
                tag = get_object_or_404(Tag, slug=slug)
                post = postings.objects.filter(tags=tag).order_by('-id')
                postserialized = postingserializer(post, many=True)

                context = {
                    'allposts': postserialized.data,
                    'saved': saved,
                    'message': message,
                    'tagdata': json_data_lists,
                }

                return Response(context, status=status.HTTP_200_OK)
            else:

                allposts = postings.objects.all().order_by('-id')
                postserializer = postingserializer(allposts, many=True)
                context = {
                    'allposts': postserializer.data,
                    'saved': saved,
                    'message': message,
                    'tagdata': json_data_lists,
                }

                return Response(context, status=status.HTTP_200_OK)
        else:
            # If no, add the current user to the post's saved_by ManyToMany field
            post.likes.add(myuser)
            saved = True
            message = 'Post liked'
            user = myuser
            post = postings.objects.filter(messageid=post_id).first()
            postserialized = postingserializer(post)

            slug = request.data.get('tagslug')
            if (slug):
                tag = get_object_or_404(Tag, slug=slug)
                posts = postings.objects.filter(tags=tag).order_by('-id')
                postserialized = postingserializer(posts, many=True)
                context = {
                    'allposts': postserialized.data,
                    'saved': saved,
                    'message': message,
                    'tagdata': json_data_lists,
                }

                return Response(context, status=status.HTTP_200_OK)

            else:

                allposts = postings.objects.all().order_by('-id')
                postserializer = postingserializer(allposts, many=True)

                context = {
                    'allposts': postserializer.data,
                    'saved': saved,
                    'message': message,
                    'tagdata': json_data_lists,

                }

                return Response(context, status=status.HTTP_200_OK)

    # Return an error response for unsupported methods
    return JsonResponse({'saved': False, 'message': 'Invalid request method'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newcomment(request, id):
    json_data_lists = []
    queryset2 = postings.tags.most_common()[:4]
    common_tags = queryset2.annotate(num_times=Count('taggit_taggeditem_items'))
    s = shortuuid.ShortUUID(alphabet="0123456789")
    otp = s.random(length=15)

    for a in common_tags:
        # Construct a dictionary with the desired data
        datas = {"name": a.slug, "number": a.num_times}  # Replace with your data

        # Append the dictionary to the list
        json_data_lists.append(datas)

    quizdata = []
    ves = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    a = get_object_or_404(postings, messageid=id)

    if request.method == 'POST':
        myimage = request.data.get('myimg')
        keyword = request.data.get('keyword')
        post_id = request.data.get('tagslug')
        print(keyword)
        if myimage:
            serializer = UploadedImage.objects.create(image=myimage)
            serializer.save()
            serializeddata = Imagetest(serializer)
            dest12 = {"sender": f"{request.user.username}", "senderid": f"{request.user.id}", "commentid": f"{otp}",
                      "messagetime": f"{ves}", "message": f"{keyword}"}

            a.testj.append(dest12)
            a.save()
            if (post_id):
                tag = get_object_or_404(Tag, slug=post_id)
                post = postings.objects.filter(tags=tag).order_by('-id')
                postserialized = postingserializer(post, many=True)
                apidata = {
                    'message': 'Comment Added Successfully',
                    'allposts': postingserializer.data,
                    'trending': json_data_lists,
                    'mypost': postingserializer.data,
                }
                return Response(apidata, status=status.HTTP_200_OK)
            else:

                allposts = postings.objects.all().order_by('-id')
                postserializer = postingserializer(allposts, many=True)
            apidata = {
                'message': 'Comment Added Successfully',
                'allposts': postserializer.data,
                'trending': json_data_lists,
                # 'mypost': postserialized.data,
            }
            return Response(apidata, status=status.HTTP_200_OK)

        else:
            dest12 = {"sender": f"{request.user.username}", "senderid": f"{request.user.id}", "commentid": f"{id}",
                      "messagetime": f"{ves}", "message": f"{keyword}"}
            # jsondata = get_object_or_404(postings, messageid=id)
            a.testj.append(dest12)
            a.save()
            if (post_id):
                tag = get_object_or_404(Tag, slug=post_id)
                post = postings.objects.filter(tags=tag).order_by('-id')
                postserialized = postingserializer(post, many=True)

                apidata = {
                    'message': 'Comment Added Successfully',
                    'allposts': postserialized.data,
                    'trending': json_data_lists,
                    'mypost': postserialized.data,
                }

                return Response(apidata, status=status.HTTP_200_OK)
            else:

                allposts = postings.objects.all().order_by('-id')
                postserializer = postingserializer(allposts, many=True)
                apidata = {
                    'message': 'Comment Added Successfully',
                    'allposts': postserializer.data,
                    'trending': json_data_lists,
                    'mypost': postserializer.data,
                }

                return Response(apidata, status=status.HTTP_200_OK)

    return Response({'message': 'We Are Unable To Process Your Request'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def postingsinglepage(request, id):
    current_time = timezone.now()
    Profile.objects.update_or_create(
        user=request.user,
        defaults={'last_seen': current_time}
    )
    user = request.user
    post = postings.objects.filter(messageid=id).first()
    if post:
        postserialized = postingserializer(post)

        context = {
            'mypost': postserialized.data,
        }
        return Response(context, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'We Are Unable To Process Your Request'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applications(request, pk):
    s = shortuuid.ShortUUID(alphabet="0123456789")
    otp = s.random(length=16)
    jb = get_object_or_404(Jobs, ref=pk)

    if Applications.objects.filter(user=request.user).filter(jobapplied=jb).exists():
        context = {

            'message': 'You Have Already Applied For This Role'
        }

        return Response(context, status=status.HTTP_200_OK)
    else:
        Applications.objects.create(user=request.user, author=jb.user, application_id=otp,
                                    jobapplied=jb)
        jb.last_seen = timezone.now()
        jb.applied.add(request.user)
        jb.save()
        context = {

            'message': 'Application Submitted'
        }

        return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def tagged(request, slug):
    user = request.user
    tag = get_object_or_404(Tag, slug=slug)
    post = postings.objects.filter(tags=tag).order_by('-id')
    postserialized = postingserializer(post, many=True)
    queryset2 = postings.tags.most_common()[:4]
    myprofile = Profile.objects.filter(user=user).first()
    myprofileserializer = ProfileSerializer(myprofile)
    # Exclude the current user by ID
    all_records_except_current_user = Profile.objects.all().exclude(user=user).order_by('?')[:2]

    profileserializer = ProfileSerializer(all_records_except_current_user, many=True)
    json_data_lists = []
    common_tags = queryset2.annotate(num_times=Count('taggit_taggeditem_items'))
    for a in common_tags:
        # Construct a dictionary with the desired data
        datas = {"name": a.slug, "number": a.num_times}  # Replace with your data

        # Append the dictionary to the list
        json_data_lists.append(datas)

    context = {
        'message': 'Successfully Fetched',
        'allposts': postserialized.data,
        'trending': json_data_lists,
        'profileserializer': profileserializer.data,
        'myprofileserializer': myprofileserializer.data
    }
    return Response(context, status=status.HTTP_200_OK)


class SearchEmployeeByPhoneNumberAPIView(APIView):
    def get(self, request):
        phone_number = request.query_params.get('phone_number', None)

        if phone_number is None:
            return Response({"error": "Phone number parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            employee = employees.objects.get(phone_number=phone_number)
            serializer = EmployeesSerializer(employee)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except employees.DoesNotExist:
            return Response({"error": "No employee found with the provided phone number."},
                            status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST':
        image_data = request.FILES.get('myaudio')
        serializerz = Image.objects.create(image=image_data)
        serializerz.save()
        serializer = ImageSerializer(serializerz)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def create_company(request):
    data = request.data
    company_name = data.get('companyName')
    logo = request.FILES.get('logo')

    if not company_name or not logo:
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user already exists
    try:
        user = User.objects.get(username=company_name)
        # Check if the user already has an associated company
        if hasattr(user, 'company'):
            return Response({'error': 'Company already exists for this user'}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        # Create a new user
        user = User.objects.create_user(
            username=company_name,
            email=f'admin@{company_name}.com',
            password='test'
        )

    # Create a new company instance
    company_instance = company(
        user=user,
        organization_name=company_name,
        logo=logo  # Directly set the uploaded logo file
    )

    company_instance.save()

    return Response({'message': 'Company created successfully'}, status=status.HTTP_201_CREATED)


class UniversityListCreateView(generics.ListCreateAPIView):
    queryset = exceltest.objects.all()
    serializer_class = Universitydata

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


@api_view(['GET'])
def seodetail(request, id):
    jobdetails = get_object_or_404(Jobs, ref=id)
    jobdetail_data = seoserializer(jobdetails).data

    # Convert the job description to plain text
    jobdescription_html = jobdetail_data.get('jobdescription', '')
    jobdescription_plain = strip_tags(unescape(jobdescription_html))

    # Update the jobdetail data with the plain text version of jobdescription
    jobdetail_data['jobdescription'] = jobdescription_plain

    context = {
        'jobdetail': jobdetail_data,
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
def alljobcards(request):
    jobcard = Jobs.objects.filter(is_paidfor=True) \
        .select_related('organization') \
        .only(
        'status', 'is_paidfor', 'joblocation', 'selected_lga', 'applicationenddate',
        'applicationpublish', 'jobpostdate', 'jobtitle', 'ref', 'jobservice', 'joblocation',
        'jobcategory', 'jobsalaryrange', 'workinglevel', 'jobdescription', 'responsibilities',
        'requirements', 'organization__organization_name', 'organization__logo'
    ) \
        .prefetch_related('likes') \
        .order_by('-id')
    jobserialized = Jobserializer(jobcard, many=True)
    context = {
        'jobdetail': jobserialized.data,
    }

    return Response(context, status=status.HTTP_200_OK)


def generaterandomref(request):
    jobcard = Jobs.objects.all().order_by('-id')
    for a in jobcard:
        a.is_paidfor = True
        a.save()
        print(a)

    return JsonResponse({'status': 'success', 'message': 'References generated successfully'})


@api_view(['GET'])
def jobdetail(request, id):
    jobdetails = get_object_or_404(Jobs, ref=id)
    jobdetail = Jobserializer(jobdetails)
    context = {
        'jobdetail': jobdetail.data,
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def createjobpost(request):
    request_user = request.user
    request_company = company.objects.filter(user=request_user).first()

    if request_company:
        data = request.data

        # Extracting data
        selected_skills = data.get('selectedSkills', [])
        role_title = data.get('roleTitle', '')
        number_of_seats = data.get('numberOfSeats', '')
        industry = data.get('industry', '')
        boardseat_type = data.get('boardseatType', '')
        role_status = data.get('roleStatus', '')
        reference = data.get('reference', '')
        tenure = data.get('tenure', '')
        work_experience = data.get('workExperience', '')
        managerial_experience = data.get('managerialExperience', '')
        board_experience = data.get('boardExperience', '')
        remuneration = data.get('remuneration', '')
        remuneration_for_role = data.get('remunerationForRole', '')
        skills = data.get('skills', [])
        requirements = data.get('requirements', [])
        job_description = data.get('jobDescription', '')
        selected_state = data.get('selectedState', '')
        selected_lga = data.get('selectedLga', '')
        paymentstatus = bool(reference)
        if reference:
            paymentstatus = True

        # Create and save the Job instance
        job_details = Jobs.objects.create(
            jobtitle=role_title,
            jobservice=industry,
            jobmaximumapplication=number_of_seats,
            jobdescription=job_description,
            requirements=requirements,
            responsibilities=skills,
            workinglevel=work_experience,
            jobcategory=industry,
            board_type=boardseat_type,
            tenure=tenure,
            managerial_experience=managerial_experience,
            board_experience=board_experience,
            jobsalaryrange=remuneration,
            joblocation=selected_state,
            selected_lga=selected_lga,
            user=request_user,
            organization=request_company,
            selected_skills=selected_skills,
            is_paidfor=paymentstatus
        )

        # Serialize the job details
        serializer = Jobserializer(job_details)
        job_alerts = user_Bs_Jobsalert.objects.all()

        # Start a thread to send messages
        threading.Thread(target=notify_users, args=(job_alerts, job_details)).start()
        # Return the serialized data as a response
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response({"error": "Company not found for this user."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def organizationsposts(request):
    request_user = request.user
    request_company = company.objects.filter(user=request_user).first()

    if request_company:
        jobcards = Jobs.objects.filter(user=request_user).filter(organization=request_company).order_by('-id')

        jobserialized = Jobserializer(jobcards, many=True)
        context = {
            'jobdetail': jobserialized.data,
        }

        return Response(context, status=status.HTTP_200_OK)

    return Response({"error": "Company not found for this user."}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_training_post(request):
#     request_user = request.user
#     request_company = company.objects.filter(user=request_user).first()
#     if request.method == 'POST':
#         serializer = CoursesSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(organization=request_company)  # Attach the logged-in user as author
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def create_training_post(request):
    # Handle GET request to retrieve the training posts (no authentication required)
    if request.method == 'GET':
        courses = Course.objects.all()
        serializer = CoursesSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Handle POST request to create a new training post (authentication required)
    if request.method == 'POST':
        # Require authentication for POST requests
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'},
                            status=status.HTTP_401_UNAUTHORIZED)

        request_user = request.user
        request_company = company.objects.filter(user=request_user).first()
        serializer = CoursesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(organization=request_company)  # Attach the company to the training post
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_jobalert_post(request):
    request_user = request.user

    if request.method == 'POST':
        keyword = request.data.get('keyword', '').strip()

        # Check if the keyword already exists for the user
        existing_alert = user_Bs_Jobsalert.objects.filter(keyword=keyword, user=request_user).first()
        if existing_alert:
            return Response({"error": "Keyword already saved."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = JobAlertSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request_user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# GET all BlogPosts (List all blog posts)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_training_detail_post(request, id):
    if request.method == 'GET':
        if request.user.is_staff:
            # Get or create the Corporate profile for staff members
            corporate_profile, _ = company.objects.get_or_create(user=request.user)

            # Get the blog post (Course) if it exists
            blogpost = Course.objects.filter(reference=id, organization=corporate_profile).select_related(
                'organization').first()

            if blogpost:
                # Use `select_related` for event and organization to minimize DB hits
                visitor_requests = visitorslog.objects.select_related('event__organization').filter(event=blogpost)

                # Serialize the data
                visitorserializer = VisitorRequestSerializer(visitor_requests, many=True)
                serializer = CoursesSerializer(blogpost)

                # Return both visitor and course data
                return Response(
                    {
                        'visitorserializer': visitorserializer.data,
                        'coursedata': serializer.data
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_training_post(request, id):
    if request.method == 'GET':
        print(id)
        blogposts = get_object_or_404(Course, reference=id)
        serializer = CoursesSerializer(blogposts)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def payforpost(request):
    data = request.data
    ref = data.get('ref')
    id = data.get('roleref', '')

    if ref:
        # Retrieve the job detail object, or return a 404 error if not found
        jobdetail = get_object_or_404(Jobs, ref=id)

        # Update the is_paidfor field and save the object
        jobdetail.is_paidfor = True
        jobdetail.save()

        # Serialize the job detail data
        jobdetaildata = Jobserializer(jobdetail)
        context = {
            'jobdetail': jobdetaildata.data,
        }

        return Response(context, status=status.HTTP_200_OK)

    return Response({"error": "Reference not provided."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])  # Use PATCH to update specific fields
@permission_classes([IsAuthenticated])
def update_aosskill(request):
    user = request.user
    try:
        # Get the individual's profile
        individual_profile = Individualprofile.objects.get(user=user)
    except Individualprofile.DoesNotExist:
        return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    # Get the payload data
    aosskill_data = request.data.get('aosskill', None)

    if aosskill_data is not None:
        # Update the aosskill field
        individual_profile.aosskill = aosskill_data
        individual_profile.save()  # Save the updated profile

        # Optionally, you can serialize the updated profile for the response
        serializer = IndividualprofileSerializer(individual_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response({"detail": "Invalid payload."}, status=status.HTTP_400_BAD_REQUEST)





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_or_create_profile(request):
    user = request.user
    # Check if the user is a staff member
    if user.is_staff:
        # Get or create the Corporate profile for staff members
        corporate_profile, created = company.objects.get_or_create(user=user)
        serializer = CorporateprofileSerializer(corporate_profile)
    else:
        # Get or create the Individual profile for non-staff members
        individual_profile, created = Individualprofile.objects.get_or_create(user=user)
        serializer = IndividualprofileSerializer(individual_profile)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def create_work_experience(request):
    user = request.user

    if request.method == 'POST':
        data = request.data
        work_experience_data = {
            'user': user.id,
            'organization_name': data.get('organization_name'),
            'jobtitle': data.get('jobtitle'),
            'jobservice': data.get('jobservice'),
            'jobsector': data.get('jobsector'),
            'jobstart': data.get('jobstart'),
            'jobend': data.get('jobend'),
            'jobdescription': data.get('jobdescription'),
            'city': data.get('city'),
            'region': data.get('region')
        }

        serializer = Workexperienceserializer(data=work_experience_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        work_experience = workexperience.objects.filter(user=user)
        serializer = Workexperienceserializer(work_experience, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def university_view(request):
    user = request.user

    if request.method == 'POST':
        data = request.data
        university_data = {
            'user': user.id,
            'university': data.get('university'),
            'course': data.get('course'),
            'degree': data.get('degree'),
            'start_date': data.get('start_date'),
            'finish_date': data.get('finish_date'),
        }

        serializer = Educationserializer(data=university_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        universities = University.objects.filter(user=user).select_related('university')
        serializer = UniversitySerializer(universities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Try to get the profile or create it if it does not exist
        profile, created = Individualprofile.objects.get_or_create(user=user)

        serializer = IndividualprofileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user

        # Try to get the profile or create it if it does not exist
        profile, created = Individualprofile.objects.get_or_create(user=user)

        # Update profile with data from request
        serializer = IndividualprofileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UploadPDFView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = PDFUploadSerializer(data=request.data)
        if serializer.is_valid():
            parsed_pdf = serializer.save()  # Save the PDF file and create a new ParsedPDF instance
            ref_id = parsed_pdf.ref_id

            # Start a background thread to handle parsing
            threading.Thread(target=self.process_pdf, args=(parsed_pdf,)).start()

            return Response({'ref_id': ref_id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def process_pdf(self, parsed_pdf):
        try:
            pdf_file = parsed_pdf.pdf_file
            content = ''

            # Extract text using PyPDF2
            with pdf_file.open('rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        content += page_text
                        print(content)
            if not content:
                parsed_pdf.parsed_data = {"error": "No text could be extracted from the PDF."}
                parsed_pdf.is_parsed = True
                parsed_pdf.save()
                return

            # Combine extracted data with the prompt
            prompttext = """
            Here is my extracted CV data. Please extract the following key information and return it in JSON format:

            - **First Name**: 
            - **Last Name**: 
            - **Email**: 
            - **Phone**: 
            - **Address**: 
            - **LinkedIn URL**: 
            - **Summary**: 
            - **Skills**: A list of skills.
            - **Work History**: A list of work experiences, each including:
              - **Title**: 
              - **Company**: 
              - **Years**: 
              - **Location**: 
              - **Description**: 
            - **Education**: A list of educational qualifications, each including:
              - **Degree**: 
              - **Institution**: 
              - **Location**: 
              - **Year**: 
            - **Certifications**: A list of certifications.
            """
            combined_content = f"{prompttext}{content}"

            # Call Gemini API
            api_key = 'AIzaSyCmTIrEffXp5jBva5PKKfeCha3xs1Eba-8'
            url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}'
            headers = {'Content-Type': 'application/json'}
            data = {
                "contents": [{"parts": [{"text": combined_content}]}]
            }
            response = requests.post(url, headers=headers, json=data)
            response.raise_for_status()
            print('parsinggggggggggggg')

            api_response = response.json()
            json_response = api_response['candidates'][0]['content']['parts'][0]['text']

            parsed_pdf.parsed_data = json_response
            parsed_pdf.is_parsed = True
            parsed_pdf.save()

        except Exception as e:
            parsed_pdf.parsed_data = {"error": str(e)}
            parsed_pdf.is_parsed = True
            parsed_pdf.save()


class AiPdf(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = PDFUploadSerializer(data=request.data)
        if serializer.is_valid():
            parsed_pdf = serializer.save()  # Save the PDF file and create a new ParsedPDF instance
            ref_id = parsed_pdf.ref_id

            # Start a background thread to handle parsing
            threading.Thread(target=self.aiprocess_pdf, args=(parsed_pdf,)).start()

            return Response({'ref_id': ref_id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def aiprocess_pdf(self, parsed_pdf):
        try:
            pdf_file = parsed_pdf.pdf_file
            content = ''

            # Extract text using PyPDF2
            with pdf_file.open('rb') as file:
                pdf_reader = PdfReader(file)
                for page in pdf_reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        content += page_text

            if not content:
                parsed_pdf.parsed_data = {"error": "No text could be extracted from the PDF."}
                parsed_pdf.is_parsed = True
                parsed_pdf.save()
                return

            # Combine extracted data with the prompt
            prompttext = """
"Please analyze the provided CV and extract the following key information. The output should be in JSON format:

First Name: The first name of the individual.
Last Name: The last name of the individual.
Email: The individual's email address.
Phone: The individual's contact phone number.
Summary: Please create a completely new and concise professional summary for the individual, based on their full work history, skills, and experience found in the document. Ignore any existing professional summaries in the text. The summary should focus on the individual's key achievements, expertise, strengths, and industry impact. It should highlight the individual's career progression, unique value proposition, and contributions to their field. Make sure the summary is written in a way that positions the individual as a highly qualified and accomplished professional. It should be very detailed as it is a review of the user's profile.

Skills: An array of skills the individual possesses, including both technical and soft skills.
Work level: Determine if the user is a beginner, intermediate, expert, or advanced.
Work type: Extract the individual's primary work type (e.g., banker, software developer, frontend web developer, dentist). 
comment : After extracting the information, please add a humorous comment based on the individual's work type. For example:
- If the user is a banker, you might say: 'Hmm, would you teach me how to make money, lol?'
- If the user is a dentist, you might say: 'Doc, how can I get perfectly white teeth, lol?'
- If the user is a software developer or frontend web developer, you might say: 'Hmm, I hope you can teach me how to center a div, lol. Just joking!'
- Tailor the comment to fit the work type and make it light-hearted and fun.
Ensure the response is concise and structured correctly in JSON format.


            """
            combined_content = f"{prompttext}\n\n{content}"

            # Call Gemini API
            api_key = 'AIzaSyCmTIrEffXp5jBva5PKKfeCha3xs1Eba-8'  # Use environment variable for API key
            url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}'
            headers = {'Content-Type': 'application/json'}
            data = {
                "contents": [{"parts": [{"text": combined_content}]}]
            }
            response = requests.post(url, headers=headers, json=data)
            response.raise_for_status()

            api_response = response.json()
            json_response = api_response['candidates'][0]['content']['parts'][0]['text']

            parsed_pdf.parsed_data = json_response
            parsed_pdf.is_parsed = True
            parsed_pdf.save()

        except Exception as e:
            parsed_pdf.parsed_data = {"error": str(e)}
            parsed_pdf.is_parsed = True
            parsed_pdf.save()


class PDFStatusView(APIView):
    def get(self, request, ref_id):
        try:
            parsed_pdf = ParsedPDF.objects.get(ref_id=ref_id)
            return Response({
                'is_parsed': parsed_pdf.is_parsed,
                'parsed_data': parsed_pdf.parsed_data
            }, status=status.HTTP_200_OK)
        except ParsedPDF.DoesNotExist:
            return Response({"error": "Invalid reference ID."}, status=status.HTTP_404_NOT_FOUND)


import smtplib
from django.core.mail import send_mail, BadHeaderError


class TestEmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        users_name = f"{data.get('firstName')} {data.get('lastName')}"
        referral_name = request.user.get_full_name()
        sender_email = settings.DEFAULT_FROM_EMAIL
        recipient_email = data.get('email')
        role = get_object_or_404(Jobs, ref=data.get('jobref'))

        # Corrected context passed as a dictionary
        context = {
            'users_name': users_name,
            'referral_name': referral_name,
            'role': role
        }

        html_message = render_to_string('referral.html', context)

        try:
            # Sending the email using DEFAULT_FROM_EMAIL from settings
            send_mail(
                subject='Boardseats | An Exciting Opportunity Referred to You',
                message='',  # Include an empty string for the plain text version
                html_message=html_message,
                from_email=sender_email,
                recipient_list=[recipient_email],
                fail_silently=False,
            )
            return Response({
                "message": "Email sent successfully!",
                "sender": sender_email,
                "recipient": recipient_email
            }, status=status.HTTP_200_OK)

        except BadHeaderError:
            return Response({"error": "Invalid header found.", "sender": sender_email, "recipient": recipient_email},
                            status=status.HTTP_400_BAD_REQUEST)

        except smtplib.SMTPAuthenticationError:
            return Response(
                {"error": "SMTP authentication error. Check your email credentials.", "sender": sender_email,
                 "recipient": recipient_email}, status=status.HTTP_400_BAD_REQUEST)

        except smtplib.SMTPRecipientsRefused:
            return Response(
                {"error": "All recipients were refused. Check the recipient's email address.", "sender": sender_email,
                 "recipient": recipient_email}, status=status.HTTP_400_BAD_REQUEST)

        except smtplib.SMTPSenderRefused:
            return Response(
                {"error": "The sender address was refused. Check the sender's email address.", "sender": sender_email,
                 "recipient": recipient_email}, status=status.HTTP_400_BAD_REQUEST)

        except smtplib.SMTPDataError:
            return Response({"error": "The SMTP server refused to accept the message data.", "sender": sender_email,
                             "recipient": recipient_email}, status=status.HTTP_400_BAD_REQUEST)

        except smtplib.SMTPConnectError:
            return Response({"error": "Unable to connect to the SMTP server.", "sender": sender_email,
                             "recipient": recipient_email}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except smtplib.SMTPException as e:
            return Response(
                {"error": f"SMTP error occurred: {str(e)}", "sender": sender_email, "recipient": recipient_email},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({"error": f"An unexpected error occurred: {str(e)}", "sender": sender_email,
                             "recipient": recipient_email}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def corporatedashboard(request):
    jobcards = Jobs.objects.filter(
        user=request.user,
        is_paidfor=True
    ).order_by('-last_seen').only(
        'status', 'is_paidfor', 'joblocation', 'selected_lga', 'applicationenddate',
        'applicationpublish', 'jobpostdate', 'jobtitle', 'ref', 'jobservice',
        'joblocation', 'jobcategory', 'workinglevel', 'organization'
    ).filter(applied__isnull=False).select_related('organization').prefetch_related(
        'applied'
    ).distinct()

    jobcarddata = CorporateJobserializer(jobcards, many=True)
    jobcardscount = Jobs.objects.filter(
        user=request.user,
        is_paidfor=True
    ).count()

    unpubcount = Jobs.objects.filter(
        user=request.user,
        is_paidfor=False
    ).count()

    context = {
        'jobcarddata': jobcarddata.data,
        'published': jobcardscount,
        'filled': unpubcount
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applicationpreview(request, id):
    job = get_object_or_404(Jobs, ref=id)
    if job:
        # Use select_related to fetch related user and individual profile data in a single query
        allapplications = Applications.objects.filter(jobapplied=job).select_related('user',
                                                                                     'user__individualprofile').all()
        appdata = Appliucationreviewserializer(allapplications, many=True)
        return Response(appdata.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def rolematch(request):
    myusersprofile = Individualprofile.objects.filter(user=request.user).first()
    favourite_category = myusersprofile.favourite_category if myusersprofile.favourite_category else ''
    if not myusersprofile:
        return Response(status=status.HTTP_404_NOT_FOUND)
    print(
        f'{myusersprofile.jobminimumexperience}  {myusersprofile.managerial_experience}   {myusersprofile.board_experience}')
    jobcards = Jobs.objects.filter(
        is_paidfor=True,
        jobminimumexperience__lte=myusersprofile.jobminimumexperience,
        managerial_experience__lte=myusersprofile.managerial_experience,
        board_experience__lte=myusersprofile.board_experience,
        jobcategory__icontains=favourite_category
    ).select_related('organization').prefetch_related('likes').distinct()

    jobcarddata = Jobserializer(jobcards, many=True)

    return Response(jobcarddata.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def subscription(request):
    # Ensure the user is authenticated
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    # Fetch request data
    p_ref = request.data.get('pref')
    p_data = request.data.get('pdata')
    planid = request.data.get('planid')

    # Fetch the selected plan
    membership = Userplan.objects.filter(references=planid).first()
    if not membership:
        return Response({"error": "Invalid plan ID"}, status=status.HTTP_400_BAD_REQUEST)

    # Get the latest active subscription if any
    myplans = UserMembership.objects.filter(user=user).order_by('-end_at').first()

    start_date = timezone.now()
    end_date = start_date + relativedelta(months=1)  # Default duration is 1 month

    # No membership logic
    if not myplans:
        # If planid == 001, set months to 1, otherwise 2
        if planid == "1":
            end_date = start_date + relativedelta(months=1)
        else:
            end_date = start_date + relativedelta(months=2)

    # If user has a membership
    else:
        if myplans.end_at > timezone.now():
            # If user has an active plan and planid != 001, extend by 1 month
            if planid != "1":
                myplans.end_at += relativedelta(months=1)
                myplans.save()
                # Create a new instance for record purposes
                UserMembership.objects.create(
                    user=user,
                    start_at=start_date,
                    end_at=myplans.end_at,
                    payment_ref=p_ref,
                    payment_data=p_data,
                    active=True,
                    membership=membership
                )
                return Response({"message": "Subscription extended by 1 month", "new_end_at": myplans.end_at},
                                status=status.HTTP_200_OK)

            # If user has an active plan and planid == 001, don't extend, just create a new instance
            else:
                UserMembership.objects.create(
                    user=user,
                    start_at=start_date,
                    end_at=start_date,  # Both start and end at the same time
                    payment_ref=p_ref,
                    payment_data=p_data,
                    active=True,
                    membership=membership
                )
                return Response({"message": "New subscription created with planid == 001", "start_date": start_date},
                                status=status.HTTP_200_OK)

    # If no active subscription, create a new one based on the logic
    newplanobj = UserMembership.objects.create(
        user=user,
        start_at=start_date,
        end_at=end_date,
        payment_ref=p_ref,
        payment_data=p_data,
        active=True,
        membership=membership
    )

    # Serialize the new subscription data
    myUserMembershipSerializer = UserMembershipSerializer(newplanobj)
    return Response(myUserMembershipSerializer.data, status=status.HTTP_201_CREATED)


class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Contact form submitted successfully'})
        return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_blog_post(request):
    if request.method == 'POST':
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)  # Attach the logged-in user as author
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# GET all BlogPosts (List all blog posts)
@api_view(['GET'])
def get_blog_posts(request):
    if request.method == 'GET':
        blogposts = BlogPost.objects.all().order_by('-posted_date')  # Get all blog posts, newest first
        serializer = BlogPostSerializer(blogposts, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_blog_post(request, id):
    try:
        blogpost = BlogPost.objects.get(ref=id)  # Retrieve the blog post by ID
        serializer = BlogPostSerializer(blogpost)
        return Response(serializer.data)
    except BlogPost.DoesNotExist:
        return Response({'error': 'Blog post not found'}, status=status.HTTP_404_NOT_FOUND)


class AICreateView(generics.CreateAPIView):
    serializer_class = AIModelSerializer

    def perform_create(self, serializer):
        anonymous = self.request.data.get('anonymous', True)
        if anonymous:
            if self.request.user and not self.request.user.is_anonymous:
                serializer.save(user=self.request.user)
            else:
                serializer.save()
        else:
            serializer.save(user=None)


class AIFetchView(generics.GenericAPIView):
    serializer_class = AIModelSerializer

    def get(self, request, *args, **kwargs):
        ref_id = kwargs.get('ref_id')
        try:
            ai_model = AIModel.objects.get(ref_id=ref_id)
            serializer = self.get_serializer(ai_model)
            return Response(serializer.data)
        except AIModel.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


import json
import re


class GenerateQuizQuestionsAPIView(APIView):

    def get(self, request, *args, **kwargs):
        ref_id = kwargs.get('ref_id')
        try:
            generatedchat = AIModel.objects.get(ref_id=ref_id)
        except AIModel.DoesNotExist:
            return Response({'error': 'AI Model not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create a threadingrequest entry to track the process
        threadingrequest = generatedchats.objects.create(model=generatedchat)

        # Start a new thread to handle the API request and parsing
        thread = threading.Thread(target=self.generate_quiz_questions, args=(generatedchat, threadingrequest))
        thread.start()

        return Response({'ref_id': threadingrequest.ref_id}, status=status.HTTP_201_CREATED)

    def generate_quiz_questions(self, generatedchat, threadingrequest):
        print('threading')
        # Example parameters
        topic_area = generatedchat.work_type
        num_questions = 20
        difficulty_level = generatedchat.experience_level
        chat_history = ''
        user_profile = generatedchat.profile_summary

        # Generate AI prompt
        ai_prompt = f"""
            You are an expert in generating detailed, context-rich quiz questions. I want you to create a set of very lengthy, detailed quiz questions based on the following parameters in JSON format:

            1. **Topic area**: {topic_area}
            2. **Number of questions**: try and generate as many as {num_questions} questions
            3. **Difficulty level**: {difficulty_level}
            4. **profile of the user taking the test** {user_profile}

            Each question should include:
            - A unique and detailed question based on the specified topic area which is the users specialization.
            - 4 multiple-choice options.
            - A clear indication of the correct answer (answerIndex) among the 4 options.
            - topic should be based off a particular topic in which the question falls under
            
            
            -- note -- this is for an examination, so provide exam standard questions and options matching the users difficultylevel which is  {generatedchat.experience_level}
            Here is an example of what I want:
            {{
                "topic": "HTML Semantics and Best Practices",
                "question": "You are building a website and need to structure the main content, including headers, paragraphs, and sections...",
                "options": [
                    "Using <div> elements for everything and applying CSS classes to style them.",
                    "Using <article> for main content, <section> for sections...",
                    "Using <main> for the main content...",
                    "Using <div> for main content..."
                ],
                "answerIndex": 2
            }}
        """

        # Prepare API request
        api_key = 'AIzaSyCmTIrEffXp5jBva5PKKfeCha3xs1Eba-8'
        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}'
        headers = {'Content-Type': 'application/json'}
        data = {
            "contents": [
                {
                    "parts": [
                        {"text": ai_prompt}
                    ]
                }
            ]
        }

        try:
            response = requests.post(url, headers=headers, json=data)
            response.raise_for_status()  # Raise error if not 200

            # Parse AI response
            api_response = response.json()
            generated_text = api_response['candidates'][0]['content']['parts'][0]['text']

            # Clean and parse the JSON
            cleaned_text = generated_text.replace('```json', '').replace('```', '').strip()
            questions_json = json.loads(cleaned_text)

            # Save parsed data and mark as parsed
            threadingrequest.parsed_data = questions_json
            threadingrequest.is_parsed = True
            threadingrequest.save()

        except (requests.exceptions.HTTPError, json.JSONDecodeError) as err:
            threadingrequest.parsed_data = {"error": str(err)}
            threadingrequest.is_parsed = True
            threadingrequest.save()


# class GenerateQuizQuestionsAPIView(APIView):
#
#     def get(self, request, *args, **kwargs):
#         ref_id = kwargs.get('ref_id')
#         try:
#             generatedchat = AIModel.objects.get(ref=ref_id)  # Retrieve the blog post by ID
#         except AIModel.DoesNotExist:
#             return Response({'error': 'Ai Model not found'}, status=status.HTTP_404_NOT_FOUND)
#
#         # Example of input data expected in the request body
#         topic_area = generatedchat.work_type
#         num_questions = 10
#         difficulty_level = generatedchat.experience_level
#         chat_history = ''
#         user_profile = generatedchat.profile_summary
#
#         threadingrequest = generatedchats.objects.create(model=generatedchat)
#         return Response({'ref_id': threadingrequest.ref_id}, status=status.HTTP_201_CREATED)
#
#         # Generate AI prompt
#         ai_prompt = f"""
#                You are an expert in generating detailed, context-rich quiz questions. I want you to create a set of very lengthy  detailed quiz questions based on the following parameters in Json format
#
#                 1. **Topic area**: {topic_area}
#                 2. **Number of questions**: {num_questions}
#                 3. **Difficulty level**: {difficulty_level}
#
#                 Each question should include:
#                 - A unique and detailed question based on the specified topic area.
#                 - 4 multiple-choice answer options.
#                 - A brief explanation for the correct answer.
#                 - A clear indication of the correct answer (answerIndex) among the 4 options.
#
#                 here is an example of what i want
#                 Here is a sample
#
#         '
#             "topic": "HTML Semantics and Best Practices",
#             "question": "You are building a website and need to structure the main content, including headers, paragraphs, and sections. You also need to use a navigation bar at the top and a footer at the bottom. What is the most semantically appropriate HTML structure for your page, considering modern HTML5 standards and best practices for accessibility and SEO?",
#             "options": [
#               "Using <div> elements for everything and applying CSS classes to style them appropriately.",
#               "Using <article> for main content, <section> for sections, <nav> for navigation, <header> for the top, and <footer> for the bottom.",
#               "Using <main> for the main content, <header> for the top, <footer> for the bottom, <nav> for navigation, and <section> for individual parts of the page.",
#               "Using <div> for main content, <section> for sections, and <header> for navigation."
#             ],
#             "answerIndex": 2
#           ',
#
#
#           also make sure it is in json format
#                 """
#
#         if chat_history:
#             ai_prompt += f"\nChat history: {chat_history}"
#
#         if user_profile:
#             ai_prompt += f"\nUser profile: {user_profile}"
#
#         # Prepare the request payload
#         api_key = 'AIzaSyCmTIrEffXp5jBva5PKKfeCha3xs1Eba-8'
#         url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}'
#         headers = {'Content-Type': 'application/json'}
#
#         # Construct the request body including optional extra data
#         data = {
#             "contents": [
#                 {
#                     "parts": [
#                         {"text": ai_prompt}
#                     ]
#                 }
#             ]
#         }
#
#         try:
#             # Send request to the Gemini API
#             response = requests.post(url, headers=headers, json=data)
#             response.raise_for_status()  # Raise error if response is not 200
#
#             # Parse the response
#             api_response = response.json()
#             generated_text = api_response['candidates'][0]['content']['parts'][0]['text']
#
#             # Remove unnecessary backticks and extra newlines
#             cleaned_text = generated_text.replace('```json', '').replace('```', '').strip()
#
#             # Convert the cleaned text into a JSON object
#             try:
#                 # Assuming the AI generates a JSON-formatted string, we can parse it
#                 questions_json = json.loads(cleaned_text)
#             except json.JSONDecodeError:
#                 # If the response is not valid JSON, return an error
#                 return Response({"error": "Invalid JSON format in AI response"}, status=status.HTTP_400_BAD_REQUEST)
#
#             # Return the parsed JSON directly to the client
#             return Response(questions_json, status=status.HTTP_200_OK)
#
#         except requests.exceptions.HTTPError as err:
#             # Handle any errors from the API
#             return Response({"error": str(err)}, status=status.HTTP_400_BAD_REQUEST)


class GeneratedChatsDetailAPIView(APIView):

    def get(self, request, ref_id, *args, **kwargs):
        try:
            generated_chat = generatedchats.objects.get(ref_id=ref_id)
        except generatedchats.DoesNotExist:
            return Response({'error': 'Generated chat not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = GeneratedChatsSerializer(generated_chat)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetAllChats(APIView):
    def get(self, request, ref_id, *args, **kwargs):
        try:
            aimodelinstance = AIModel.objects.get(ref_id=ref_id)
        except AIModel.DoesNotExist:
            return Response({'error': 'AI Model not found'}, status=404)

        all_chats = generatedchats.objects.filter(model=aimodelinstance)
        serializer = GeneratedChatsSerializer(all_chats, many=True)
        return Response(serializer.data, status=200)


import requests
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view

LINKEDIN_CLIENT_ID = '771udvmb7mdwvl'
LINKEDIN_CLIENT_SECRET = 'Pym6VkjkfTBta68o'
redirect_uri = "http://localhost:3000/auth/login/"


@api_view(['GET'])
def linkedin_auth(request):
    print(redirect_uri)
    auth_url = (
        f"https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={LINKEDIN_CLIENT_ID}"
        f"&redirect_uri={redirect_uri}&state=random_state_string&scope=openid%20profile%20email"
    )
    return redirect(auth_url)


@api_view(['GET'])
def linkedin_callback(request):
    code = request.GET.get('code')
    redirectlink = request.GET.get('redirect_uri')
    token_url = f"https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code={code}&redirect_uri={redirectlink}&client_id={LINKEDIN_CLIENT_ID}&client_secret={LINKEDIN_CLIENT_SECRET}"
    print(redirect_uri)
    # token_url = "https://www.linkedin.com/oauth/v2/accessToken"

    response = requests.post(token_url, headers={'Content-Type': 'application/x-www-form-urlencoded'})

    print(response.json())
    if response.status_code != 200:
        return Response({'error': 'Failed to fetch access token from LinkedIn'}, status=response.status_code)

    access_token = response.json().get('access_token')

    user_profile_url = "https://api.linkedin.com/v2/userinfo"
    email_url = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))"

    headers = {
        'Authorization': f'Bearer {access_token}',
    }

    user_profile_response = requests.get(user_profile_url, headers=headers)
    print(user_profile_response.json())
    if user_profile_response.status_code != 200:
        return Response({'error': 'Failed to fetch user details from LinkedIn'}, status=response.status_code)

    user_profile = user_profile_response.json()

    # Process the user profile and email as needed
    return Response({
        'profile': user_profile,
    })


@api_view(['GET'])
def linkedinauth_callback(request):
    code = request.GET.get('code')
    redirectlink = request.GET.get('redirect_uri')
    token_url = f"https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code={code}&redirect_uri={redirectlink}&client_id={LINKEDIN_CLIENT_ID}&client_secret={LINKEDIN_CLIENT_SECRET}"
    # token_url = "https://www.linkedin.com/oauth/v2/accessToken"

    response = requests.post(token_url, headers={'Content-Type': 'application/x-www-form-urlencoded'})

    print(response.json())
    if response.status_code != 200:
        return Response({'error': 'Failed to fetch access token from LinkedIn'}, status=response.status_code)

    access_token = response.json().get('access_token')

    user_profile_url = "https://api.linkedin.com/v2/userinfo"
    email_url = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))"

    headers = {
        'Authorization': f'Bearer {access_token}',
    }

    user_profile_response = requests.get(user_profile_url, headers=headers)
    # print(user_profile_response.json())
    if user_profile_response.status_code != 200:
        return Response({'error': 'Failed to fetch user details from LinkedIn'}, status=response.status_code)

    user_profile = user_profile_response.json()
    # print(user_profile)
    first_name = user_profile.get('given_name', '')  # Use .get to avoid KeyError
    last_name = user_profile.get('family_name', '')
    email = user_profile.get('email', '')

    # Check if the user already exists
    user, created = User.objects.get_or_create(username=email, defaults={
        'email': email,
        'first_name': first_name,
        'last_name': last_name,
        'password': User.objects.make_random_password()  # Set a random password
    })
    individual_profile, created = Individualprofile.objects.get_or_create(user=user)
    # Generate JWT tokens
    refresh = MyTokenObtainPairSerializer.get_token(user)
    access = refresh.access_token
    # print(access)
    return Response({
        'refresh': str(refresh),
        'access': str(access),
        'user': {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
    }, status=status.HTTP_200_OK)


class BulkUniversityCreateView(APIView):
    def post(self, request):
        user = request.user  # Assuming the user is authenticated
        universities_data = request.data

        university_objects = []

        for data in universities_data:
            selected_university_id = data['selectedUniversitydata']['value']
            selected_university = exceltest.objects.get(id=selected_university_id)

            university_objects.append(University(
                user=user,
                university=selected_university,
                course=data.get('course', ''),
                degree=data.get('degree', ''),
                start_date=parse_date(data.get('startDate')),
                finish_date=parse_date(data.get('finishDate'))
            ))

        # Bulk create all the objects in a single query
        University.objects.bulk_create(university_objects)

        return Response({"message": "Universities created successfully"}, status=status.HTTP_201_CREATED)


class WorkExperienceCreateView(APIView):
    def post(self, request, *args, **kwargs):
        # Extract the data array from the request payload
        workexperience_data = request.data

        # Get the current user (assuming the user is authenticated)
        user = request.user

        # Prepare a list of workexperience objects to bulk create
        workexperiences_to_create = []

        for entry in workexperience_data:
            # Create the workexperience object
            workexperience_instance = workexperience(
                user=user,
                organization_name=entry.get('organization_Name', ''),
                jobtitle=entry.get('jobTitle', ''),
                jobservice=entry.get('jobService', ''),
                jobsector=entry.get('jobSector', ''),
                jobstart=parse_date(entry.get('jobStart')),
                jobend=parse_date(entry.get('jobEnd')),
                jobdescription=entry.get('jobDescription', ''),
                country='Nigeria',  # Assuming 'state' maps to 'country'
                city=entry.get('state', ''),  # Assuming 'lga' maps to 'city'
                region=entry.get('lga', '')  # Add if you have a separate field for 'region' or any other data
            )
            workexperiences_to_create.append(workexperience_instance)

        # Use bulk_create to insert all records at once
        workexperience.objects.bulk_create(workexperiences_to_create)

        return Response({"message": "Work experiences created successfully!"}, status=status.HTTP_201_CREATED)


class DeleteWorkExperience(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def delete(self, request, experience_id):
        # Get the work experience object or return a 404 if not found
        work_experience = get_object_or_404(workexperience, id=experience_id)

        # Check if the logged-in user is the owner of the work experience
        if work_experience.user == request.user:
            work_experience.delete()
            return Response({'message': 'Work experience deleted successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You do not have permission to delete this record.'},
                            status=status.HTTP_403_FORBIDDEN)


class DeleteUniversityRecord(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def delete(self, request, university_id):
        # Get the university record object or return a 404 if not found
        university_record = get_object_or_404(University, id=university_id)

        # Check if the logged-in user is the owner of the university record
        if university_record.user == request.user:
            university_record.delete()
            return Response({'message': 'University record deleted successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You do not have permission to delete this record.'},
                            status=status.HTTP_403_FORBIDDEN)


def notify_users(job_alerts, job_instance):
    jobtitle = job_instance.jobtitle
    companyname = job_instance.organization.organization_name if job_instance.organization else "Unknown"
    jobref = job_instance.ref
    jobdescription_plain = strip_tags(
        unescape(job_instance.jobdescription)).lower()  # Convert to lowercase for case-insensitivity

    for alert in job_alerts:
        keyword = alert.keyword.lower()  # Also convert the keyword to lowercase
        print('hello world')

        if keyword in jobdescription_plain:  # Using the modified job description and keyword
            number = alert.contact_method_detail  # Assuming this holds the number
            try:
                if alert.contact_method.lower() == 'whatsapp':
                    send_whatsapp_message(number, jobtitle, companyname, jobref, alert.keyword)
                elif alert.contact_method.lower() == 'telegram':
                    send_telegram_message(number, jobtitle, companyname, jobref, alert.keyword)
                elif alert.contact_method.lower() == 'email':
                    send_keyword_mail(number, jobtitle, companyname, jobref, alert.keyword, jobdescription_plain )
                else:
                    print('hello')
            except Exception as e:
                print(f"Failed to send message to {number}: {e}")
                raise

class SendvisitEmailThread(threading.Thread):
    def __init__(self, number, jobtitle, companyname, jobref,  keyword, jobdescription_plain):
        self.number = number
        self.jobtitle = jobtitle
        self.companyname = companyname
        self.jobref = jobref
        self.keyword = keyword
        self.jobdescription_plain = jobdescription_plain
        threading.Thread.__init__(self)

    def run(self):
        send_keyword_mail(self.number, self.jobtitle, self.companyname, self.jobref, self.keyword,
                                          self.jobdescription_plain)


@retry(stop_max_attempt_number=3, wait_fixed=2000)
def send_keyword_mail(number, jobtitle, companyname, jobref, keyword, jobdescription_plain):

    print('testingggggggg')

    useremail = number
    subject = 'Exciting Job Opportunity Based on Your Keyword Match!'
    lnk2 = f'veeseats.vercel.app/view-role/{jobref}'

    # Preparing the email content
    html_message = render_to_string(
        'rolematch.html',
        {
            'jobtitle': jobtitle,
            'companyname': companyname,
            'keyword': keyword,
            'lnk2': lnk2,
            'jobdescription_plain': jobdescription_plain,
        }
    )
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER
    to = [useremail]

    try:
        # Sending the email
        send_mail(subject, plain_message, from_email, to, html_message=html_message)
        threadingrequest = mythread.objects.create()
        print('sending')
    except Exception as e:
        print(f'Error sending email: {e}')
        # Raising the exception to trigger a retry
        raise


# Threading function to run the email sending in a background thread
def threaded_send_email(*args):
    thread = threading.Thread(target=send_keyword_mail, args=args)
    thread.start()
    thread.join()  # You can decide to remove this if you don't want the main program to wait for completion


@retry(stop_max_attempt_number=3, wait_fixed=2000)
def send_whatsapp_message(number, jobtitle, companyname, jobref, keyword):
    threadingrequest = mythread.objects.create()

    def send_message():
        url = "https://graph.facebook.com/v20.0/100824376140659/messages"

        payload = json.dumps({
            "messaging_product": "whatsapp",
            "to": f'{number}',
            "type": "template",
            "template": {
                "name": "job_role_match",
                "language": {
                    "code": "en",
                    "policy": "deterministic"
                },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            {"type": "text", "text": f"{keyword}"},
                            {"type": "text", "text": f"{jobtitle}"},
                            {"type": "text", "text": f"{companyname}"},
                        ]
                    },
                    {
                        "type": "button",
                        "sub_type": "url",
                        "index": 0,
                        "parameters": [{"type": "text", "text": f"{jobref}"}]
                    }
                ]
            }
        })

        access_token = settings.WA_TOKEN
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }

        response = requests.post(url, headers=headers, data=payload)
        print(response)  # Log the response for debugging
        if response.status_code == 200:
            return response.json()  # Optionally return the response data if needed
        else:
            print(f"Error sending message: {response.status_code} - {response.text}")

    # Start the message sending in a new thread
    threading.Thread(target=send_message).start()


EXTERNAL_API_URL = "https://myapi.elitexperthub.com/tgsend-message/"

# Function to send a POST request to the external API
def send_post_request(payload):
    """
    Function to send a POST request to the external API.
    """
    response = requests.post(EXTERNAL_API_URL, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        return response.json()  # Optionally return the response data
    else:
        raise Exception(f"Failed to send message. Status code: {response.status_code}, Response: {response.text}")

# Retry decorator: retry 3 times with 2 seconds wait between attempts
@retry(stop_max_attempt_number=3, wait_fixed=2000)
def send_telegram_message(number, jobtitle, companyname, jobref, keyword):

    # Create an entry in mythread model (if applicable)
    threadingrequest = mythread.objects.create()

    # Define the inner function to handle message sending in a thread
    def send_tg_message():
        try:
            # Construct the message body based on the provided details
            message_body = f"""
*Role Match*\n
Dear User,\n
We are pleased to notify you that there is a role match for the job alert keyword **{keyword}** that you set on your account. 
Based on your profile, it aligns well with the qualifications required for the position listed below:\n
- **{jobtitle}** at **{companyname}** \n
https://veeseats.vercel.app/view-role/{jobref}\n
If this opportunity interests you and you would like to learn more or apply,simply log in to your account to proceed.\n
We're excited to help you take the next step in your career!
            """

            # Prepare the payload for the external API
            payload = {
                "recipient": number,
                "message": message_body
            }

            # Attempt to send the POST request with retries
            send_post_request(payload)
            print(f"Message sent successfully to {number}")

        except Exception as e:
            # Log the error if retries fail
            print(f"Error sending message: {str(e)}")

    # Start a new thread to send the message
    threading.Thread(target=send_tg_message).start()


@api_view(['GET'])
def send_mail_whastapp_message(request, number, jobtitle, companyname, jobref, keyword):
    url = "https://graph.facebook.com/v20.0/100824376140659/messages"
    import json

    payload = json.dumps({
        "messaging_product": "whatsapp",
        "to": f'{number}',
        "type": "template",
        "template": {
            "name": "job_role_match",
            "language": {
                "code": "en",
                "policy": "deterministic"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": f"{keyword}"
                        },
                        {
                            "type": "text",
                            "text": f"{jobtitle}"
                        },
                        {
                            "type": "text",
                            "text": f"{companyname}"
                        },
                    ]
                },
                {
                    "type": "button",
                    "sub_type": "url",
                    "index": 0,
                    "parameters": [
                        {
                            "type": "text",
                            "text": f"{jobref}"
                        }
                    ]
                }
            ]
        }
    })

    access_token = settings.WA_TOKEN
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, data=payload)
    search_result = response.json()

    if response.status_code == 200:
        return Response(search_result, status=status.HTTP_200_OK)
    else:
        return Response(search_result, status=response.status_code)


def update_users_without_firstname(requests):
    # Fetch all users where the first name is empty
    users_without_firstname = User.objects.filter(first_name='')

    # Loop through the users and update their first name with the username
    for user in users_without_firstname:
        user.first_name = user.username
        user.save()

    return f"Updated {users_without_firstname.count()} users."

@api_view(['GET'])
def fetchwithkey(requests, id):
    # Use select_related to join the organization table for optimized querying
    myapikey = APIKey.objects.filter(token=id).select_related('organization').first()

    # Early exit if API key is not valid or not found
    if not myapikey:
        return Response({'error': 'You do not have permission to get this record. API key not found or invalid.'},
                        status=status.HTTP_404_NOT_FOUND)

    # Fetch the job cards based on the API key's organization
    jobcards = Jobs.objects.filter(
        organization=myapikey.organization,
        is_paidfor=True,
        applied__isnull=False
    ).order_by('-id').only(
        'status', 'is_paidfor', 'joblocation', 'selected_lga', 'applicationenddate',
        'applicationpublish', 'jobpostdate', 'jobtitle', 'ref', 'jobservice',
        'joblocation', 'jobcategory', 'workinglevel', 'organization'
    ).select_related('organization').distinct()



    # Serialize the job cards
    jobcarddata = embedJobserializer(jobcards, many=True)

    # Return the response with job card data
    return Response(jobcarddata.data, status=status.HTTP_200_OK)


# def extract_text_from_url(url):
#     try:
#         response = requests.get(url)
#         response.raise_for_status()  # Raise exception for bad responses
#         soup = BeautifulSoup(response.content, 'html.parser')
#         texts = soup.stripped_strings  # Extract and clean text
#         return ' '.join(texts)
#     except requests.exceptions.RequestException as e:
#         return f"Error scraping {url}: {e}"
#
#
# # Django REST framework view to handle the POST request
# @api_view(['POST'])
# def scrape_url(request):
#     # Expecting a JSON with 'url' key
#     url = request.data.get('url')
#
#     if not url:
#         return Response({"error": "url is required"}, status=status.HTTP_400_BAD_REQUEST)
#
#     try:
#         # Scrape the URL and extract text
#         extracted_text = extract_text_from_url(url)
#
#         # Return the extracted text
#         return Response({"extracted_text": extracted_text}, status=status.HTTP_200_OK)
#
#     except ValueError as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class TextExtractionView(APIView):
    def post(self, request):
        url = request.data.get('url')
        if not url:
            return Response({"error": "No URL provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Step 1: Scrape the URL
        extracted_text = self.extract_text_from_url(url)
        if 'Error' in extracted_text:
            return Response({"error": extracted_text}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Step 2: Send the extracted text to the Gemini API for analysis
        processed_data = self.analyze_with_gemini(extracted_text)

        return Response(processed_data, status=status.HTTP_200_OK)

    def extract_text_from_url(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()  # Check for request errors
            soup = BeautifulSoup(response.content, 'html.parser')
            texts = soup.stripped_strings  # Extract and clean text
            return ' '.join(texts)
        except requests.exceptions.RequestException as e:
            return f"Error scraping {url}: {e}"

    def analyze_with_gemini(self, content):
        # Combine extracted data with the prompt
        prompttext = """
        Please analyze the provided data and summarize
        """
        combined_content = f"{prompttext}\n\n{content}"
        api_key = 'AIzaSyCmTIrEffXp5jBva5PKKfeCha3xs1Eba-8'
        # Call Gemini API
        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}'
        headers = {'Content-Type': 'application/json'}
        data = {
            "contents": [{"parts": [{"text": combined_content}]}]
        }

        try:
            response = requests.post(url, headers=headers, json=data)
            response.raise_for_status()

            # Parse the response
            api_response = response.json()
            json_response = api_response['candidates'][0]['content']['parts'][0]['text']
            return {"summary": json_response}
        except requests.exceptions.RequestException as e:
            return {"error": f"Error sending data to Gemini API: {e}"}