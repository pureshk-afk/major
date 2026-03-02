#!/bin/ash

python manage.py migrate
python manage.py collectstatic --noinput
mv /app/staticfiles/* /static/
gunicorn major.wsgi:application --workers 12 --bind 0.0.0.0:8080
