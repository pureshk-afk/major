from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf import settings

from .views import collections, index, catalog, info_user


app_name = 'major'

urlpatterns = [
    path('', index, name='home'),
    path('collections/', collections, name='collections'),
    path('catalog/', catalog, name='catalog'),
    path('info/', info_user, name='info_user'),

    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
