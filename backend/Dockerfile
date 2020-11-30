FROM python:3.8
WORKDIR /app/
ARG WAIT_VERSION=2.7.3
RUN wget https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait
RUN chmod +x ./wait
COPY requirements-apt.txt /tmp/
RUN apt-get update && cat /tmp/requirements-apt.txt | xargs apt-get install -y
COPY requirements-pip.txt /tmp/
RUN pip install -r /tmp/requirements-pip.txt
COPY . ./
RUN chmod +x ./run.sh

CMD ./run.sh
