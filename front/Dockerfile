FROM node:10.23.0
WORKDIR /app/
COPY package.json .
RUN npm install --no-dev
COPY . .
RUN npm run-script build

CMD cp -rf /app/build/* /mnt/frontend/ && echo "Frontend files updated."
