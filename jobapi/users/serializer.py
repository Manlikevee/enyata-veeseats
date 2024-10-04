from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *


class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'id']  # Or specify the fields you want to expose


class IndividualprofileSerializer(serializers.ModelSerializer):
    user = Userserializer()

    class Meta:
        model = Individualprofile
        fields = '__all__'


class PDFUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParsedPDF
        fields = ['pdf_file']


# class PDFUploadSerializer(serializers.Serializer):
#     pdf_file = serializers.FileField()
class CorporateprofileSerializer(serializers.ModelSerializer):
    user = Userserializer()

    class Meta:
        model = company
        fields = '__all__'


class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields = ['first_name', 'last_name', 'email', 'middle_name', 'phone_number', 'gender', 'staff_id']

class eventCoursesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'


class VisitorRequestSerializer(serializers.ModelSerializer):
    event = eventCoursesSerializer()

    class Meta:
        model = visitorslog
        fields = ['first_name', 'last_name', 'email', 'phonenumber', 'event', 'reason', 'visitation_type', 'status',
                  'created_at', 'clock_in', 'clock_out', 'ref', 'reason', 'visitation_type', 'is_resheduled', 'stage_1', 'stage_2', 'stage_3', 'stage_4', 'stage_5',  'accepted_time'  ]


class Completeprofile(serializers.ModelSerializer):
    user = Userserializer()

    class Meta:
        model = Profile
        fields = '__all__'  # Or specify the fields you want to expose


class Workexperienceserializer(serializers.ModelSerializer):
    class Meta:
        model = workexperience
        fields = '__all__'


class Universitydata(serializers.ModelSerializer):
    class Meta:
        model = exceltest
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'password']


class Educationserializer(serializers.ModelSerializer):
    # university = Universitydata()

    class Meta:
        model = University
        fields = '__all__'


class UniversitySerializer(serializers.ModelSerializer):
    university = Universitydata()

    class Meta:
        model = University
        fields = '__all__'


class UserRegistrationSerializer(serializers.ModelSerializer):
    accountnumber = serializers.CharField(source='profile.accountnumber', read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'accountnumber']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class Individualreview(serializers.ModelSerializer):
    user = Userserializer()

    class Meta:
        model = Individualprofile
        fields = '__all__'


class Appliucationreviewserializer(serializers.ModelSerializer):
    individual_profile = Individualreview(source='user.individualprofile', read_only=True)

    class Meta:
        model = Applications
        fields = '__all__'


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['author', 'title', 'body', 'posted_date', 'blogimage', 'ref']
        read_only_fields = ['author', 'posted_date', 'ref']


class AIModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = AIModel
        fields = '__all__'
        read_only_fields = ['ref_id']
