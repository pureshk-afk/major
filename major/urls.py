"""
URL configuration for major project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from web.views import index
from web.views import collections
from web.views import catalog
from web.views import info_user
from web.views import product_details
from web.views import designer_for
from web.views import portfolio





urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("web.urls", namespace='web')),
    path('collections/', include("web.urls", namespace='web')),
    path('catalog/', include("web.urls", namespace='web')),
    path('catalog/', include("web.urls", namespace='web')),
    path('info/', include("web.urls", namespace='web')),
    path('designer_for/', include("web.urls", namespace='web')),
    path('portfolio/', include("web.urls", namespace='web')),
    path('project/<slug:slug>', include("web.urls", namespace='web')),
    path('product/<slug:slug>', include("web.urls", namespace='web')),

    

]

# позволяет видеть картинки на сайте

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
