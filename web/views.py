from unicodedata import category
from django.shortcuts import get_object_or_404, render, redirect

import web
from .models import *

menu = ['Каталог', 'Пользователям', 'Коллекции', 'Дизайнерам', 'Портфолио', '8 (918) 525-00-01']
def index(request):
    categories = Category.objects.all()
    reviews = Review.objects.all()
    return render(request, 'web/index.html', {'categories': categories, 'reviews': reviews, 'menu': menu ,'title': 'Главная страница'})


def collections(request):
    collections = Collection.objects.all()
    return render(request, 'web/collections.html', {'collections': collections,'title': 'Коллекции'})

def catalog(request):
    categories = Category.objects.all()
    collections = Collection.objects.all()
    products = Product.objects.all()
    # Получаем параметр категории из запроса
    category_slug = request.GET.get('category')
    sort_by = request.GET.get('sort', 'default')  # Параметр сортировки
    # Фильтруем товары по категории, если она указана
    if category_slug:
        products = Product.objects.filter(category__slug=category_slug)
        # Сохраняем выбранную категорию для подсветки в меню
        selected_category = Category.objects.filter(slug=category_slug).first()
    else:
        products = Product.objects.all()
        selected_category = None

    if sort_by == 'price_asc':
        products = products.order_by('price')
    elif sort_by == 'price_desc':
        products = products.order_by('-price')
    else:  # 'default' - сортировка по умолчанию (например, по id или дате создания)
        products = products.order_by('id')  # Или 'created_at' если есть такое поле

    return render(request, 'web/catalog.html', {'products': products,'collections': collections, 'current_sort': sort_by, 'categories': categories,'selected_category': selected_category,'title': 'Каталог дизайнерской мебели major'})

def info_user(request):
    return render(request, 'web/info.html', {'title': 'Пользователям'})

def product_details(request, slug: str):
    product = get_object_or_404(Product, slug=slug)
    products = Product.objects.all()
    the_product = Product.objects.get(slug=slug)
    print(product)
    return render(request, 'web/product-details.html', {'products': products, 'the_product' : the_product})

def designer_for(request):
    
    return render(request, 'web/designer_for.html', {'title': 'Дизайнерам'})

def portfolio(request):
    projects = Project.objects.all()
    return render(request, 'web/portfolio.html', {'projects': projects,'title': 'Портфолио проектов дизайн-студии major'})

def project_details(request, slug: str):
    project = get_object_or_404(Project, slug=slug)
    projects = Project.objects.all()
    the_project = Project.objects.get(slug=slug)
    project_image = ProjectImage.objects.filter(project__slug=slug)
    return render(request, 'web/project-details.html', {'projects': projects, 'the_project' : the_project, 'project_image':project_image})