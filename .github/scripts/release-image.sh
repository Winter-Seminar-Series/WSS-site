#!/bin/bash

set -euo pipefail

SERVICE_NAME=
SRC_TAG=
RELEASE_TAG=
DOCKER_USER=
DOCKER_PASS=

FULL_SRC_TAG=
FULL_RELEASE_TAG=
FULL_LATEST_TAG=

function main() {
  inflate_options "$@"
  check_options

  echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

  echo "Releasing image '$FULL_SRC_TAG' as '$FULL_RELEASE_TAG'"

  docker pull $FULL_SRC_TAG
  docker tag $FULL_SRC_TAG $FULL_RELEASE_TAG
  docker tag $FULL_SRC_TAG $FULL_LATEST_TAG
  docker push $FULL_RELEASE_TAG
  docker push $FULL_LATEST_TAG
}

function inflate_options() {
  while [ -n "${1+x}" ]; do
    case "$1" in
    --service-name)
      shift
      SERVICE_NAME="$1"
      shift
      ;;
    --src-tag)
      shift
      SRC_TAG="$1"
      shift
      ;;
    --release-tag)
      shift
      RELEASE_TAG="$1"
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

  FULL_SRC_TAG="$DOCKER_USER/$SERVICE_NAME:$SRC_TAG"
  FULL_RELEASE_TAG="$DOCKER_USER/$SERVICE_NAME:$RELEASE_TAG"
  FULL_LATEST_TAG="$DOCKER_USER/$SERVICE_NAME:latest"
}

function check_options() {
  if [ -z ${SERVICE_NAME+x} ] || [ -z ${SRC_TAG} ] || [ -z ${RELEASE_TAG} ] || [ -z ${DOCKER_USER} ] || [ -z ${DOCKER_PASS} ]; then
    echo "ERROR: All of inputs should be specified: --service-name --src-tag --release-tag --docker-user --docker-pass"
    exit 3
  fi
}

main "$@"
