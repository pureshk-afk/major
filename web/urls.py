from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf import settings

from .views import collections, designer_for, index, catalog, info_user, portfolio, product_details, project_details


app_name = 'major'

urlpatterns = [
    path('', index, name='home'),
    path('collections/', collections, name='collections'),
    path('catalog/', catalog, name='catalog'),
    path('info/', info_user, name='info_user'),
    path('product/<slug:slug>', product_details, name="product_details"),
    path('project/<slug:slug>', project_details, name="project_details"),
    path('designer_for/', designer_for, name='designer_for'),
    path('portfolio/', portfolio, name='portfolio'),

    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
