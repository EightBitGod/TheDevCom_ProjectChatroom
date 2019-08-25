from django.shortcuts import render
from django.utils.safestring import mark_safe
from django.http import HttpResponse
import json

alias_set = set()
def home(request):
    return render(request,'home.html',{})

def room(request, room_name, user):

    return render(request, 'room.html', {
        'alias': mark_safe(json.dumps(user))
    })


def check_alias(request,alias):
    print(alias_set)
    if alias in alias_set:
        return HttpResponse(status=400)
    else:
        alias_set.add(alias)
        return HttpResponse(status=200)