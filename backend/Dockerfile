# pull official base image
# syntax=docker/dockerfile:1
FROM python:3.8

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# install dependencies
WORKDIR /app/wss
COPY requirements.txt /app/wss
RUN pip install -r requirements.txt

# copy project
COPY ./ /app/wss
