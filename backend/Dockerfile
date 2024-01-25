FROM python:3.8-slim-buster

COPY . /app
WORKDIR /app

RUN apt update && apt install -y python-psycopg2
RUN pip install -r requirements.txt
CMD ["bash", "-c" ,"python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
