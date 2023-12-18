#!/bin/bash

set -eo pipefail

SERVICE_NAME=
VERSION=
DOCKER_USER=
DOCKER_PASS=

function main() {
  inflate_options "$@"

  # Set all versions to the given version, so that any of them if built is tagged by that version.
  export WEB_IMAGE_VERSION=$VERSION
  export FRONT_IMAGE_VERSION=$VERSION
  export STATIC_DATA_PROVIDER_IMAGE_VERSION=$VERSION

  echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
  docker-compose build $SERVICE_NAME
  docker-compose push $SERVICE_NAME
}

function inflate_options() {
  while [ -n "${1+x}" ]; do
    case "$1" in
    --service-name)
      shift
      SERVICE_NAME="$1"
      shift
      ;;
    --version)
      shift
      VERSION="$1"
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
      ;;
    esac
  done
}

main "$@"
