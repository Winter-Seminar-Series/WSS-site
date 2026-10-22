# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Public pages are prerendered at build time, so the build must reach the API. The container's runtime
# API_ORIGIN (an internal compose hostname) is not resolvable inside `docker build`, so default to the public one.
ARG API_ORIGIN=https://api.wss-sharif.com
ARG NEXT_PUBLIC_ORIGIN=https://wss-sharif.com
ARG WSS_ORDER=10
# Rendered into the prerendered HTML, so it is a build-time value.
ARG GA_TRACKING_ID=
ENV API_ORIGIN=$API_ORIGIN NEXT_PUBLIC_ORIGIN=$NEXT_PUBLIC_ORIGIN WSS_ORDER=$WSS_ORDER GA_TRACKING_ID=$GA_TRACKING_ID \
    NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001 -G nodejs
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
