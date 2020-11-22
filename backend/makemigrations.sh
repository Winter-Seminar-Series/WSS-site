#!/usr/bin/env bash

# A helper script to make django migration files

set -euo pipefail

readonly CWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
readonly ROOT_DIR="$CWD/../"
readonly CONTAINER_NAME="make_migrations_container_name"

cd "$ROOT_DIR"
docker-compose build
docker-compose run --name $CONTAINER_NAME web ./manage.py makemigrations
cd "$CWD"
for f in *; do
  if [ -d "$f/migrations/" ]; then
    docker cp $CONTAINER_NAME:/app/$f/migrations/ $f/
    sudo chown $USER:$USER $f/migrations/*
  fi
done
docker rm $CONTAINER_NAME
