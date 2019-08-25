from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from api import views

urlpatterns = [
    path('',views.home,name='home'),
    path('check/<str:alias>',views.check_alias,name='checkalias'),
    path('<str:room_name>/<str:user>', views.room, name='room'),
]