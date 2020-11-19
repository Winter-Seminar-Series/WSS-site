#!/bin/bash

set -o pipefail

HOST=
TAG=
DOCKER_USER=
DOCKER_PASS=
CHECK_LOGS=false
CHECK_CERT=true

function main() {
  inflate_options "$@"
  check_options
  if [ -n ${TAG+x} ]; then
    run_local_server_by_tag
    HOST=https://localhost
    CHECK_LOGS=true
    CHECK_CERT=false
    echo "Waiting for server to be up ..."
    sleep 20
  fi
  smoke_test_host
}

function inflate_options(){
  while [ -n "$1" ]; do
    case "$1" in
    --host)
      shift
      HOST="$1"
      shift
      ;;
    --tag)
      shift
      TAG="$1"
      shift
      ;;
    --docker-user)
      shift
      DOCKER_USER="$1"
      shift
      ;;
    --docker-pass)
      shift
      DOCKER_PASS="$1"
      shift
      ;;
    *)
      echo "Unknown option: $1"
      exit 2
    esac
  done
}

function check_options() {
  if [ -n ${TAG+x} ] && [ -n ${HOST+x} ]; then
    echo "Exactly one of '--tag' or '--host' should be specified."
    exit 3
  fi

  if [ -n ${TAG+x} ] && ( [ -z ${DOCKER_USER+x} ] || [ -z ${DOCKER_PASS+x} ] ); then
    echo "Specifying '--docker-user' and '--docker-pass' is mandatory when using '--tag'."
    exit 3
  fi
}

function run_local_server_by_tag() {
  export WEB_IMAGE_VERSION=$TAG
  echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
  docker-compose pull
  docker-compose up -d --no-build
}

function smoke_test_host() {
  check_cert_flag=
  if ! $CHECK_CERT; then
    check_cert_flag='--no-check-certificate'
  fi
  wget_output=$(wget --server-response $check_cert_flag "$HOST" 2>&1)
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
}
