FROM python:3.8-alpine
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev libxml2-dev libxslt-dev jpeg-dev zlib-dev
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
WORKDIR /app/
ARG WAIT_VERSION=2.7.3
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait .
RUN chmod +x ./wait
COPY . ./
RUN chmod +x ./run.sh

CMD ./run.sh
