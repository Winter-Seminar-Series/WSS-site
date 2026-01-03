FROM docker.arvancloud.ir/node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

# RUN npm config set registry https://mirror-npm.runflare.com && npm ci
RUN npm ci

COPY .env.frontend .env
COPY . .

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN npm run build

EXPOSE 3000
