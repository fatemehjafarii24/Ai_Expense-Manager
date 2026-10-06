from decimal import Decimal

from django import template

from core.dates import gregorian_to_jalali, jalali_month_name, to_persian_digits
from core.validators import mask_card_number

register = template.Library()


@register.filter
def jalali(value):
    return gregorian_to_jalali(value)


@register.filter
def persian_digits(value):
    return to_persian_digits(value)


@register.filter
def mask_card(value):
    return mask_card_number(value)


@register.filter
def jalali_month(value):
    return jalali_month_name(int(value))


@register.filter
def persian_digits(value):
    if value is None:
        return ""
    return to_persian_digits(value)


@register.filter
def money(value):
    if value is None:
        return "۰"
    try:
        num = Decimal(str(value))
    except (ValueError, TypeError, ArithmeticError):
        return persian_digits(value)
    sign = "-" if num < 0 else ""
    formatted = f"{abs(num):,}"
    return sign + to_persian_digits(formatted.replace(",", "٬"))
