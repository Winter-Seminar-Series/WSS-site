FROM python:3.8
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
WORKDIR /app/
COPY . ./

CMD ./manage.py migrate && ./manage.py runserver 0.0.0.0:8000
