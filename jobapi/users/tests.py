from django.test import TestCase

# Create your tests here.

# @api_view(['GET', 'POST'])
# # @permission_classes([IsAuthenticated])
# def themessageportals(request, id):
#     current_time = timezone.now()
#     user = User.objects.filter(id=1).first()
#     # Update last_seen for the current user
#     Profile.objects.update_or_create(
#         user=user,
#         defaults={'last_seen': current_time}
#     )
#
#
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
#         pusher_client.trigger(id, 'new-message', {
#             apidata
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
#     pusher_client.trigger(id, 'new-message', {
#         apidata
#     })
#
#     return Response(apidata, status=status.HTTP_200_OK)
