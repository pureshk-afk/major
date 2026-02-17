from unicodedata import category
from django.shortcuts import render, redirect

import web
from .models import *

menu = ['Каталог', 'Пользователям', 'Коллекции', 'Дизайнерам', 'Портфолио', '8 (918) 525-00-01']
def index(request):
    categories = Category.objects.all()
    reviews = Review.objects.all()
    return render(request, 'web/index.html', {'categories': categories, 'reviews': reviews, 'menu': menu ,'title': 'Главная страница'})


def collections(request):
    return render(request, 'web/collections.html', {'title': 'Коллекции'})