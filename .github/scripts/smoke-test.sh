#!/bin/bash

set -uo pipefail

readonly HOST=$1

wget_output=$(wget --server-response http://localhost 2>&1)
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
  echo "Services logs:"
  docker-compose logs
  exit 1
fi