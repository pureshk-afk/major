from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
from django.shortcuts import get_object_or_404, render
from django.db.models import Q
from django.core.paginator import Paginator

from .forms import OrderRequestForm
from .utils import get_or_set_cache, send_to_dashamail

from .models import *

def index(request):
    categories = get_or_set_cache("categories_all", lambda: list(Category.objects.all()))
    reviews = get_or_set_cache("reviews_all", lambda: list(Review.objects.all()))
    settings = get_or_set_cache("settings_all", lambda: list(Settings.objects.all()))
    return render(request, 'web/index.html', {'categories': categories, 'reviews': reviews,'title': 'Главная страница', 'settings': settings})


def collections(request):
    settings = get_or_set_cache("settings_all", lambda: list(Settings.objects.all()))
    collections = get_or_set_cache("collections_all", lambda: list(Collection.objects.all()))
    return render(request, 'web/collections.html', {'collections': collections,'title': 'Коллекции', 'settings': settings})

def catalog(request):
    settings = get_or_set_cache("settings_all", lambda: list(Settings.objects.all()))
    categories = get_or_set_cache("categories_all", lambda: list(Category.objects.all()))
    collections = get_or_set_cache("collections_all", lambda: list(Collection.objects.all()))

    category_slug = request.GET.get('category')
    sort_by = request.GET.get('sort', 'default')

    min_price_filter = request.GET.get('min_price')
    max_price_filter = request.GET.get('max_price')
    collections_filter = request.GET.get('collection')

    if category_slug:
        products = Product.objects.filter(category__slug=category_slug)
        selected_category = Category.objects.filter(slug=category_slug).first()
    else:
        products = Product.objects.all()
        selected_category = None

    if min_price_filter:
        products = products.filter(price__gte=min_price_filter)
    if max_price_filter:
        products = products.filter(price__lte=max_price_filter)
    if collections_filter:
        collections_filter= collections_filter.split(',')
    
        query = Q()

        for collection_name in collections_filter:
            collection_name = collection_name.strip()
            query |= Q(collection__name=collection_name)

        products = products.filter(query)


    if sort_by == 'price_asc':
        products = products.order_by('price')
    elif sort_by == 'price_desc':
        products = products.order_by('-price')
    else:
        products = products.order_by('id')

    paginator = Paginator(products, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'web/catalog.html', {'products': page_obj, 'collections': collections, 'current_sort': sort_by, 'categories': categories,'selected_category': selected_category,'title': 'Каталог дизайнерской мебели major', 'settings': settings})

def info_user(request):
    settings = get_or_set_cache("settings_all", lambda: list(Settings.objects.all()))
    return render(request, 'web/info.html', {'title': 'Пользователям', 'settings': settings})

def product_details(request, slug: str):
    cache_key = f"product_details:{slug}"
    cached = cache.get(cache_key)

    if cached:
        return render(request, 'web/product-details.html', cached)

    settings = get_or_set_cache("settings_all", lambda: list(Settings.objects.all()))
    product = get_object_or_404(Product, slug=slug)
    recommends = Product.objects.filter(collection=product.collection).exclude(slug=slug)
    product_images = ProductImage.objects.filter(product__slug=slug)
    product_images = [product.main_image.url] + list(map(lambda x: x.image.url, product_images))
    product_images = enumerate(product_images)

    context = {'recommends': recommends, "product": product, "images": product_images, 'title': product.name, 'settings': settings}
    cache.set(cache_key, context)
    return render(request, 'web/product-details.html', context)

def designer_for(request):
    settings = get_or_set_cache("settings_all", lambda: list(Settings.objects.all()))
    categories = get_or_set_cache("categories_all", lambda: list(Category.objects.all()))
    return render(request, 'web/designer_for.html', {'title': 'Дизайнерам', 'categories': categories, 'settings': settings})

def portfolio(request):
    settings = get_or_set_cache("settings_all", lambda: list(Settings.objects.all()))
    projects = get_or_set_cache("projects_all", lambda: list(Project.objects.all()))
    return render(request, 'web/portfolio.html', {'projects': projects,'title': 'Портфолио проектов дизайн-студии major', 'settings': settings})

def project_details(request, slug: str):
    cache_key = f"project_details:{slug}"
    cached = cache.get(cache_key)

    if cached:
        return render(request, 'web/project-details.html', cached)

    settings = get_or_set_cache("settings_all", lambda: list(Settings.objects.all()))
    projects = Project.objects.all()
    project = get_object_or_404(Project, slug=slug)
    project_image = ProjectImage.objects.filter(project__slug=slug)
    context = {'projects': projects, 'the_project' : project, 'title': project.name, 'project_image':project_image, 'settings': settings}
    cache.set(cache_key, context)
    return render(request, 'web/project-details.html', context)

@csrf_exempt
@require_POST
def create_order(request):
    form = OrderRequestForm(request.POST)

    if not form.is_valid():
        return JsonResponse({
            "success": False,
            "errors": form.errors,
        }, status=400)

    order = form.save()

    files = request.FILES.getlist("files")
    for file in files:
        OrderFile.objects.create(
            order=order,
            file=file
        )

    send_to_dashamail(order)

    return JsonResponse({
        "success": True,
        "message": "Заявка успешно отправлена",
    })