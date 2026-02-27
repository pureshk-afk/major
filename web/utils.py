import requests

from django.core.cache import cache
from django.conf import settings

from .models import Settings


def get_or_set_cache(key, queryset_func, timeout=settings.CACHES_LIFETIME):
    data = cache.get(key)
    if data is None:
        data = queryset_func()
        cache.set(key, data, timeout)
    return data

def send_to_dashamail(order):
    payload = {
        "method": "lists.add_member",
        "api_key": settings.DASHAMAIL_API_KEY,
        "list_id": settings.DASHAMAIL_LIST_ID,
        "email": order.email,
        "phone": order.phone,
        "merge_1": order.name,
        "merge_2": order.comment,
    }

    response = requests.post(settings.DASHAMAIL_URL, data=payload, timeout=10)
    print("Dasha add member response: ", response.json())

    recipient_email = Settings.objects.filter(key="admin_email").first()

    if not recipient_email:
        return

    payload = {
        "method": "transactional.send",
        "api_key": settings.DASHAMAIL_API_KEY,
        "to": recipient_email.value,
        "subject": "Поступил новый заказ",
        "html": f"""
Новый заказ!

Имя: {order.name}
Телефон: {order.phone}
Email: {order.email}
Комментарий: {order.comment}
""",
        "from_email": settings.DASHAMAIL_SENDER_EMAIL,
        "from_name": "Major Studio"
    }

    response = requests.post(settings.DASHAMAIL_URL, data=payload)
    print("Dasha send transactional response: ", response.json())
