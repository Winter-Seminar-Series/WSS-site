#!/bin/bash

set -euo pipefail

readonly DOCKER_USERNAME="$1"
readonly DOCKER_PASSWORD="$2"
readonly GITHUB_RUN_ID="$3"

echo "DOCKER_USERNAME = $DOCKER_USERNAME"
echo "GITHUB_RUN_ID = $GITHUB_RUN_ID"

docker pull $DOCKER_USERNAME/web:latest || echo "Unable to pull cache. exit code: $?"
WEB_IMAGE_VERSION=snapshot-$GITHUB_RUN_ID
echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
docker-compose build
docker-compose push web