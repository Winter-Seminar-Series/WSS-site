FROM python:3.8
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
WORKDIR /app/
ARG WAIT_VERSION=2.7.3
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait .
RUN chmod +x ./wait
COPY . ./
RUN chmod +x ./run.sh

CMD ./run.sh
