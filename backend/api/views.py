from django.shortcuts import render
from django.utils.safestring import mark_safe
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import hashlib
import random

alias_set = set()
encrypted_map = dict()
alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

def home(request):
    return render(request,'home.html',{})

#  For testing purpose, to render chatroom HTML page
def room(request, room_name, user):
    if encrypted_map.get(user,None) is None:
        return HttpResponse(status=403)  
    return render(request, 'room.html', {
                'alias': mark_safe(json.dumps(user))
        })


def chat_room(request, room_name):
    if encrypted_map.get(user,None) is None:
        return HttpResponse(status=403)
    return render(request, 'room.html', {
        'alias': mark_safe(json.dumps(user))
    })

@csrf_exempt
def check_alias(request):
    if request.method == 'POST':
        alias = json.loads(request.body)['alias']
        # print(alias)
        data = {}
        # print(alias_set)
        if alias in alias_set:
            data['success'] = False
            print('false')
            return JsonResponse(data)
        else:
            alias_set.add(alias)
            encrypted_alias = encrypt(alias)
            encrypted_map[encrypted_alias] = alias
            data['success'] = True
            data['alias'] = alias
            data['encrypted_alias'] = encrypted_alias
            # print(encrypted_alias)
            # print(JsonResponse(data))
            return JsonResponse(data)

    return HttpResponse(status=400)


def active_users(request):
    if request.method == 'GET':
        active_list = list(alias_set)
        data = dict()
        data['active'] = active_list
        return JsonResponse(data)
    return HttpResponse(status=403)


def encrypt(text):
    text = text.join(random.SystemRandom().choice(alpha) for _ in range(10))
    hash_obj = hashlib.sha256(text.encode())
    return hash_obj.hexdigest()

