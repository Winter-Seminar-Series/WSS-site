FROM node:10.23.0
WORKDIR /app/
COPY . .
RUN npm install --no-dev
RUN npm run-script build

CMD cp -rf /app/build/* /mnt/frontend/ && echo "Frontend files updated."
