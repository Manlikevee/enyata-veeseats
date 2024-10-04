from django.contrib import admin
from .models import Profile, workexperience, Personaldetails, Jobsalert, messagestarter, messagefolder, Jobs, \
    PaymentDetails, company, jobfeatures, Userplan, exceltest, Areaofexp, Category, Question, UserMembership, exceltest, \
    UploadedImage, postings, employees, visitorslog, qrcodes, Image, ParsedPDF, Individualprofile, Contact, BlogPost, \
    AIModel, Message, PusherMessage, user_Bs_Jobsalert, mythread, APIKey

# Register your models here.



admin.site.register(APIKey)
admin.site.register(mythread)
admin.site.register(user_Bs_Jobsalert)
admin.site.register(Profile)
admin.site.register(workexperience)
admin.site.register(Personaldetails)
admin.site.register(Jobsalert)
admin.site.register(messagestarter)
admin.site.register(messagefolder)
admin.site.register(Jobs)
admin.site.register(PaymentDetails)
admin.site.register(jobfeatures)
admin.site.register(Userplan)
admin.site.register(UserMembership)
admin.site.register(exceltest)
admin.site.register(UploadedImage)
admin.site.register(postings)
admin.site.register(employees)
admin.site.register(visitorslog)
admin.site.register(qrcodes)
admin.site.register(Image)
admin.site.register(company)
admin.site.register(ParsedPDF)
admin.site.register(Contact)
admin.site.register(Individualprofile)
admin.site.register(BlogPost)
admin.site.register(AIModel)
admin.site.register(PusherMessage)
