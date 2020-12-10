FROM node:10.23.0
WORKDIR /app/
COPY package.json .
RUN npm install --no-dev
COPY . .
ARG BASE_URL="https:\/\/localhost"
RUN sed -i "s/^export const BASE_URL = 'https:\/\/localhost'/export const BASE_URL = '$BASE_URL'/g" \
    ./src/constants/info.ts
RUN npm run-script build

CMD cp -rf /app/build/* /mnt/frontend/ && echo "Frontend files updated."
