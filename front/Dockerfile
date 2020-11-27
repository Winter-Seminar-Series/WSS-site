FROM node:14.15.1-alpine3.12
WORKDIR /app/
COPY . .
RUN npm install --no-dev
RUN npm run-script build

CMD cp -rf /app/build/* /mnt/frontend/ && echo "Frontend files updated."