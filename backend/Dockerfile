FROM python:3.12 as build-python

RUN apt-get -y update \
  && apt-get -y install python3-psycopg2 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
WORKDIR /app
RUN pip install -r requirements.txt

FROM python:3.12

COPY --from=build-python /usr/local/lib/python3.12/site-packages/ /usr/local/lib/python3.12/site-packages/
COPY --from=build-python /usr/local/bin/ /usr/local/bin/
COPY . /app
WORKDIR /app

EXPOSE 8000
ENV PYTHONUNBUFFERED 1

# collectstatic touches neither the database nor S3, but settings.py requires these at import time.
# Real values come from the runtime env_file, so no secret is ever baked into the image.
RUN SECRET_KEY=collectstatic DB_HOST=- DB_PORT=5432 DB_NAME=- DB_USER=- DB_PASS=- \
    AWS_ACCESS_KEY=- AWS_SECRET_KEY=- AWS_STORAGE_BUCKET_NAME=- \
    python manage.py collectstatic --noinput

CMD ["gunicorn", "--bind", ":8000", "--workers", "4", "WSS.wsgi:application"]
