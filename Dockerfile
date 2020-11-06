FROM python:3.8
COPY requirements.txt /tmp/
RUN pip3 install --no-cache-dir -r /tmp/requirements.txt
WORKDIR /app/
COPY . ./

CMD ./manage.py migrate && ./manage.py runserver 0.0.0.0:8000
