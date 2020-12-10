#!/usr/bin/env bash

readonly INFO_FILE_PATH=/app/src/constants/info.ts

# TODO use rsync instead of cp
cp -rf /app/build/* /mnt/frontend/
echo "Frontend files updated."

sed -i "s/^ *window.BASE_URL *= *'https://localhost'/window.BASE_URL = '$BASE_URL'/g" \
    $INFO_FILE_PATH
echo "BASE_URL updated to: $BASE_URL"
