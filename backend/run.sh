#!/bin/sh
set -eu

readonly CWD=$(dirname "$0")

main() {
  "$CWD/wait_for_db_service.sh"
  "$CWD"/manage.py migrate
  sync_static_files
  gunicorn --bind :8000 --workers 16 WSS_Site.wsgi:application
}

sync_static_files() {
  # TODO use rsync instead of cp
  cp -rf /app/collected_static/* /mnt/backend-statics/
}

main "$@"
