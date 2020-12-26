#!/bin/bash
# Usage: ./get_participant_list.sh username password output

# Admin user data
username=$1
password=$2

# Output csv file
output=$3

api_url="https://sharif-wss.ir/api"
content_type="Content-Type: application/json"
login_data="{\"username\": \"$username\", \"password\": \"$password\"}"

echo "Logging in as $username"
login_response=$(curl -X POST -H "$content_type" -d "$login_data" -s ${api_url}/login/)

token=$(python <<EOF
import json
response = json.loads('$login_response')
if 'token' in response:
    print(response['token'])
EOF
)

if [ -z "$token" ]; then
    echo $login_response
    exit 1
fi

echo "Successfull login"

authorization_header="Authorization: Token $token"

echo "Downloading Participants data..."

curl -X GET -H "$authorization_header" -H "Accept: text/csv" ${api_url}/2020/participants/ -o $output

echo "Logging out..."

curl -X POST -H "$authorization_header" -s ${api_url}/logout/

echo "Done!"