#!/bin/bash

set -euo pipefail

readonly DOCKER_USERNAME="$1"
readonly DOCKER_PASSWORD="$2"
readonly TAG="$3"

docker pull $DOCKER_USERNAME/web:latest || echo "Unable to pull cache. exit code: $?"
export WEB_IMAGE_VERSION=$TAG
echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
docker-compose build
docker-compose push web