# CLAUDE.md

Guidance for Claude Code (claude.ai/code) in the **WSS-site** repository: the website, API and payment
service of the Winter Seminar Series (WSS), held yearly by the Student Scientific Chapter of Sharif
University of Technology. Each module has its own `CLAUDE.md`. Read the one for the module you are
changing before you edit it.

You are a **senior engineer** on a small production system with real users at registration time.
Prefer small, reviewable changes. Do not refactor things you were not asked to touch.

---

## Modules

| Module | Stack | Image | Docs |
| --- | --- | --- | --- |
| `frontend/` | Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, pnpm | `wss-frontend` | `frontend/CLAUDE.md` |
| `backend/` | Django 4.2 + DRF, SimpleJWT, PostgreSQL, S3 media (ArvanCloud) | `wss-backend` | `backend/CLAUDE.md` |
| `payment/` | Go 1.23, gin, gorm. Adapter in front of the Zibal/Zarinpal/IDPay gateways | `wss-payment` | `payment/CLAUDE.md` |

Request flow in production:

```
browser ─▶ nginx ─▶ frontend:3000 ─(server-side fetch)─▶ backend:8000 ─▶ payment:8080 ─▶ gateway
                 └▶ backend:8000 (api.wss-sharif.com)        │
                                                             └▶ postgres (DBs: backend, payment)
```

The browser never calls the API directly for authenticated data. The frontend proxies it through
Server Components, Server Actions and route handlers. Each yearly edition is one `core_event` row.
The frontend selects it with `WSS_ORDER`, which is currently `10`.

---

## Repository layout

```
frontend/  backend/  payment/        # one directory per module = one Docker image
compose.yaml                         # production: postgres, backend, payment, metabase (external `app` network)
front-compose.yaml                   # production: frontend
nginx-compose.yaml, nginx.conf       # production: reverse proxy for every edition's subdomain
compose.dev.yaml                     # local: postgres + backend + payment, self-contained
.env.*.example                       # documented env templates (committed); real .env.* are git-ignored
.github/workflows/images.yml         # build + push an image per changed module
.github/workflows/deploy.yml         # SSH deploy on push to master (runs ~/cd.sh on the server)
.github/scripts/changed-modules.sh   # change detection used by images.yml
```

---

## Running locally

```bash
cp .env.postgres.example .env.postgres   # then fill in values (see each file's comments)
cp .env.backend.example  .env.backend
cp .env.payment.example  .env.payment
cp frontend/.env.example frontend/.env.local

docker compose -f compose.dev.yaml up -d --build      # postgres :5432, backend :8000, payment :8080
cd frontend && pnpm install && pnpm dev               # http://localhost:3000

# Restore a pg_dumpall backup into the fresh database:
docker compose -f compose.dev.yaml exec -T postgres psql -U postgres -d postgres < ../full_backup.sql
```

After restoring a `pg_dumpall` dump, the `postgres` role's password is the production one. Reset it
with `ALTER ROLE postgres PASSWORD '…'` so it matches `.env.postgres`.

---

## CI/CD

`images.yml` rebuilds **only the modules that changed**. `changed-modules.sh` diffs the push, or the PR
against its merge-base, and maps each changed path to its top-level module directory:

- **Push to `master`:** the changed modules are built and pushed as `<IMAGE_PREFIX>/wss-<module>:sha-<short>`
  and `:latest`.
- **Pull request:** the changed modules are built but not pushed. This proves the Dockerfiles still build.
- **Manual run:** `modules` is `all` or a list such as `frontend,payment`.
- **Rebuild everything:** happens when the workflow or the detection script changes, on a new branch, or
  after a force-push whose base commit is gone.

Registry: GHCR (`ghcr.io/<owner>`) by default, authenticated with `GITHUB_TOKEN`. To push somewhere else,
set the repository variable `IMAGE_PREFIX` (including the registry host) and the secrets
`REGISTRY_USERNAME` and `REGISTRY_PASSWORD`. The frontend build arguments come from the repository
variables `FRONTEND_BUILD_API_ORIGIN`, `FRONTEND_PUBLIC_ORIGIN`, `WSS_ORDER` and `GA_TRACKING_ID`.

**Adding a module:** create `<module>/Dockerfile`, add the name to `MODULES` in `changed-modules.sh`, and
document it in the table above.

---

## Docker conventions (all three Dockerfiles follow them, and so should new ones)

- **Multi-stage builds.** Dependencies are installed in their own stage before `COPY . .`, so code changes
  don't invalidate the dependency layer. BuildKit cache mounts are used for package caches.
- **Minimal, non-root runtime.** Each image has a `.dockerignore` that keeps `.env*`, VCS and IDE files
  out of the build context.
- **No secrets in images.** Configuration arrives at runtime through `env_file`. Placeholders are fine
  only for build steps that don't use them, such as Django's `collectstatic`.
- **Base images.** Use Docker Hub or official images only. `gcr.io`, and therefore distroless, is
  unreachable from Iran, and the server and local builds must keep working there.
- **Build-time values.** Only the frontend has them: its public pages are prerendered, so `API_ORIGIN`,
  `NEXT_PUBLIC_ORIGIN`, `WSS_ORDER` and `GA_TRACKING_ID` are baked into the HTML.

---

## Rules

- **Never commit** `.env*` files (only `*.example`), `backend/staticfiles/` (generated by
  `collectstatic`), `media/`, `node_modules/`, `.next/` or database dumps.
- **New environment variables** go in the matching `.env.*.example` with a comment in the same change.
- **Commits** use Conventional Commits with a module scope: `feat(frontend): …`, `fix(backend): …`,
  `build(payment): …`, `ci: …`. One logical change per commit.
- **Cross-module changes:** when a change spans modules (for example, a new API field the frontend
  consumes), land the backend change first and keep it backward compatible. Images deploy independently.
