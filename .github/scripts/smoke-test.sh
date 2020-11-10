#!/bin/bash

set -o pipefail

HOST=
CHECK_LOGS=true

while [ -n "$1" ]; do
  case "$1" in
  --host)
    shift
    HOST="$1"
    shift
    ;;
  --no-check-logs)
    CHECK_LOGS=false
    shift
    ;;
  *)
    echo "Unknown option: $1"
    exit 1
  esac
done

wget_output=$(wget --server-response "$HOST" 2>&1)
status_code=$(echo "$wget_output" | awk '/^  HTTP/{print $2}')

if [[ "$status_code" == "200" ]]; then
  echo "Test Succeeded!"
  exit 0
else
  echo "Test Failed!"
  echo "Request to the application failed"
  echo "Status code: $status_code"
  echo "wget output:"
  echo "$wget_output"
  if $CHECK_LOGS; then
    echo "Services logs:"
    docker-compose logs
  fi
  exit 1
fi