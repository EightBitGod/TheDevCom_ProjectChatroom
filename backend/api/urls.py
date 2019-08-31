from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from api import views

urlpatterns = [
    path('',views.home,name='home'),
    path('check',views.check_alias,name='checkalias'),
    path('active',views.active_users,name='active_users'),
    path('<str:room_name>/<str:user>', views.room, name='room'),
]