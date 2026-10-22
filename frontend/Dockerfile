# syntax=docker/dockerfile:1

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base
# pnpm comes from the `packageManager` field in package.json, so the version is pinned by the repo.
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
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
ENV API_ORIGIN=$API_ORIGIN NEXT_PUBLIC_ORIGIN=$NEXT_PUBLIC_ORIGIN WSS_ORDER=$WSS_ORDER GA_TRACKING_ID=$GA_TRACKING_ID
RUN pnpm build

# The standalone output carries its own pruned node_modules, so the runtime needs neither pnpm nor the store.
FROM node:${NODE_VERSION}-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:3000/robots.txt').then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]
CMD ["node", "server.js"]
