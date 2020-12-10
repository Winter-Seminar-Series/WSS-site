#!/usr/bin/env bash

set -euo pipefail

readonly CONFIG_FILE_PATH=/mnt/frontend/AppConfig.js

# TODO use rsync instead of cp
cp -rf /app/build/* /mnt/frontend/
echo "Frontend files updated."

sed -i "s/^ *window.BASE_URL *= *'https:\/\/localhost'/window.BASE_URL = '$BASE_URL'/g" \
    $CONFIG_FILE_PATH
echo "BASE_URL updated to: $BASE_URL"
