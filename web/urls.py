from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from .views import collections, index


app_name = 'major'

urlpatterns = [
    path('', index, name='home'),
    path('collections/', collections, name='collections')
    

]