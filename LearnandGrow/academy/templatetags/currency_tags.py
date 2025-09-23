import requests
from django import template
from django.core.cache import cache

register = template.Library()

@register.filter
def currency_convert(amount_usd, country_name):
    if not amount_usd:
        return ""
    
    try:
        amount_usd = float(amount_usd)
    except (ValueError, TypeError):
        return f"${amount_usd}"
    
    country_to_currency = {
        "United States": "USD", "USA": "USD", "US": "USD",
        "Pakistan": "PKR", "PK": "PKR",
        "United Kingdom": "GBP", "UK": "GBP", "Great Britain": "GBP",
        "India": "INR", "IN": "INR",
        "United Arab Emirates": "AED", "UAE": "AED",
        "Canada": "CAD", "CA": "CAD",
        "Australia": "AUD", "AU": "AUD",
        "Germany": "EUR", "DE": "EUR",
        "France": "EUR", "FR": "EUR",
        "Italy": "EUR", "IT": "EUR",
        "Spain": "EUR", "ES": "EUR",
        "Saudi Arabia": "SAR", "SA": "SAR",
    }
    
    currency_code = country_to_currency.get(country_name, "USD")

    # ✅ Debugging
    print(f"[currency_convert] country={country_name}, currency={currency_code}")
    
    # Show nothing if PKR or USD (handled separately in template/view)
    if currency_code in ["USD", "PKR"]:
        return ""
    
    rates = cache.get('exchange_rates')
    if not rates:
        try:
            response = requests.get('https://latest.currency-api.pages.dev/v1/currencies/usd.json', timeout=5)
            if response.status_code == 200:
                data = response.json()
                rates = data.get('usd', {})  # ✅ note: lowercase "usd" object
                cache.set('exchange_rates', rates, 3600)
                print(f"[currency_convert] Rates fetched: {list(rates.keys())[:10]} ...")
        except Exception as e:
            print(f"[currency_convert] API error: {e}")
            return ""
    
    rate = rates.get(currency_code.lower())  # ✅ lowercase lookup
    if not rate:
        print(f"[currency_convert] No rate found for {currency_code}")
        return ""
    
    converted_amount = float(amount_usd) * rate
    
    symbols = {"EUR": "€", "GBP": "£", "INR": "₹", "PKR": "₨", "USD": "$", "AED": "د.إ", "SAR": "﷼"}
    symbol = symbols.get(currency_code, currency_code)
    
    return f"~{symbol}{converted_amount:,.0f}"
