#!/bin/sh
set -eu

readonly CWD=$(dirname "$0")

main() {
  wait_for_db_service
  "$CWD"/manage.py migrate
  sync_static_files
  gunicorn --bind :8000 --workers 16 WSS_Site.wsgi:application
}

wait_for_db_service() {
  # Thanks to https://github.com/ufoscout/docker-compose-wait
  # WAIT_HOSTS: comma separated list of pairs host:port for which you want to wait.
  # WAIT_HOSTS_TIMEOUT: max number of seconds to wait for all the hosts to be available before failure. The default is 30 seconds.
  # WAIT_HOST_CONNECT_TIMEOUT: The timeout of a single TCP connection to a remote host before attempting a new connection. The default is 5 seconds.
  # WAIT_SLEEP_INTERVAL: number of seconds to sleep between retries. The default is 1 second.
  WAIT_HOSTS=database:5432 \
    WAIT_HOSTS_TIMEOUT=300 \
    WAIT_SLEEP_INTERVAL=5 \
    WAIT_HOST_CONNECT_TIMEOUT=5 \
    "$CWD"/wait
}

sync_static_files() {
  # TODO use rsync instead of cp
  cp -rf /app/collected_static/* /mnt/backend-statics/
}

main "$@"
