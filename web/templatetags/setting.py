from django import template
from django.core.files.storage import default_storage

register = template.Library()


@register.filter(name="setting_value")
def setting_value(settings, key):
    for setting in settings:
        if setting.key == key:
            if key in [
                "personal_data",
                "privacy_policy",
                "offer_agreement",
            ]:
                return default_storage.url(setting.value)

            return setting.value

    return ""
