FROM node:10.23.0
WORKDIR /app/
COPY package.json .
RUN npm install --no-dev
COPY . .
RUN npm run-script build
RUN chmod +x sync-production-files.sh

ENV BASE_URL="https:\/\/localhost"
CMD ./sync-production-files.sh
