# CLAUDE.md

Guidance for Claude Code in `WSS-site/backend`, the Django REST API of the Winter Seminar Series. The
repo-wide rules are in `../CLAUDE.md`.

You are a **senior backend engineer**. Production data spans every edition since the first, and this API moves
money. Migrations and API contracts must stay backward compatible: the frontend image deploys independently of
this one.

---

## Stack

Django 4.2, Django REST Framework, `djangorestframework-simplejwt` (with the token blacklist),
`drf-standardized-errors`, PostgreSQL via `psycopg` 3, Redis (rate-limit counters only), `django-storages` S3 on
ArvanCloud for media, WhiteNoise for static files, and gunicorn.

## Apps

| App | Responsibility |
| --- | --- |
| `common` | Cross-cutting: throttles (`throttling.py`), `UpstreamError`, `/api/health/`, test factories (`testing.py`) |
| `core` | Editions (`Event`, selected by id = `eventId` in `frontend/lib/editions.ts`), seminars, round tables, lab talks, poster sessions, workshops, speakers, poster submissions |
| `participant` | Accounts (email sign-in backend, sign-up, password reset/change), profile, plans, registrations, certificates |
| `payment` | Pricing, discount codes, checkout and verification. It calls the `payment` Go service at `PAYMENT_SERVICE_URL` |
| `skyroom` | Live-stream rooms and personal login links |
| `spotplayer` | Recorded-video licences |
| `staff` | Organising team and roles per edition |
| `sponsor` | Sponsors (admin only) |

All API routes live under `/api/` (see `WSS/urls.py`); `/admin/` is the Django admin used by the organisers.

## Layout of an app

```
models.py                 data, plus small invariants (e.g. PaymentRecord.set_status)
serializers.py            request validation and response shapes
services.py               business flows: transactions, row locks, side effects (participant, payment)
pricing.py                pure functions, no database (payment)
gateway.py / client.py    one class per external service: timeouts, typed errors (payment, skyroom, spotplayer)
views.py                  thin: validate with a serializer, call a service, serialise the result
tests/                    one module per area, built on common.testing
```

## Conventions

- **Views stay thin.** Validation goes in serializers, flows in `services.py`. A view never calls `requests` or
  opens a transaction itself.
- **Permissions:** private by default (`IsAuthenticated` in settings). A public endpoint says `AllowAny` explicitly.
- **Queries:** every list view loads its relations with `select_related`/`prefetch_related`. Tests pin the count
  with `assertNumQueries`; it must stay constant as the list grows.
- **Errors:** they go through `drf_standardized_errors`, as `{ type, errors: [{ code, detail, attr }] }`. Give each
  error a specific `code`: the frontend branches on codes (`invalid` on a discount code means "unknown code").
  Integrations raise `common.exceptions.UpstreamError` (502), never a 400.
- **Integrations** (payment service, Skyroom, SpotPlayer) always pass `timeout=settings.INTEGRATION_TIMEOUT`, log
  failures without personal data, and raise `UpstreamError`.
- **Money:** prices are Rial integers. Payments change state only through `payment/services.py`, under
  `select_for_update(of=('self',))`, so a double callback can never register twice or release a discount twice.
  `status` is the source of truth; `paid` mirrors it for Metabase. Discount uses are claimed with a conditional
  `UPDATE`, never read-modify-write.
- **Auth:** JWT bearer tokens, with a 2h access token and a rotating 5-day refresh token. The frontend's
  `proxy.ts` depends on these lifetimes and on `/api/sign-in/refresh/`. Emails are compared case-insensitively
  (legacy accounts share addresses in different cases). Reset links carry Django's signed
  `default_token_generator` token (nothing stored, expires after `PASSWORD_RESET_TIMEOUT`, dies once the password
  changes) and revoke the account's refresh tokens. New passwords go through `AUTH_PASSWORD_VALIDATORS`.
- **Rate limits:** sign-in, sign-up, password reset/change and checkout set `throttle_scope` and use the throttles
  in `common/throttling.py` (per client, plus per targeted email for credentials). Rates are in
  `REST_FRAMEWORK['DEFAULT_THROTTLE_RATES']`, counters in Redis. Clients are told apart by the last
  X-Forwarded-For hop (`NUM_PROXIES=1`): nginx appends the visitor's address (from Cloudflare's CF-Connecting-IP)
  and the frontend relays that header on authenticated and mutating calls. Public content is never throttled,
  because the frontend's ISR fetches all come from one address. The throttles fail open if Redis is down.
- **API contract:** field names are snake_case, and the frontend mirrors them exactly in
  `types/*.api.type.ts`. Renaming or removing a field is a breaking change. Add the new field, migrate the
  frontend, and only then remove the old one.
- **Settings:** settings come from the environment (`WSS/settings.py`). A required variable uses
  `os.environ[...]`, which fails fast at import; an optional one uses `os.getenv(..., default)`. Document
  every new variable in `../.env.backend.example`.
- **Media:** media is stored on S3. `AWS_QUERYSTRING_AUTH=false` gives unsigned public URLs, which the
  bucket allows; the frontend's `next/image` allow-list and its `/files/[id]` route expect this host.
- **Image placeholders (BlurHash):** a model with image fields that the API serves inherits `common.models.BlurHashMixin`
  and declares `BLURHASH_FIELDS = {'image': 'image_blurhash'}` plus a `blurhash_field()` column per image. `save()`
  recomputes the hash from the upload in memory whenever the image changes, and a bad image never blocks the save (the
  hash stays empty). Serializers list the hash fields next to the image; the frontend turns them into `next/image`
  placeholders. Rows written without `save()` (`update`, `bulk_create`, loaddata) and rows that predate the feature are
  filled by `python manage.py backfill_blurhash [app.Model …] [--force] [--dry-run] [--workers N]`: idempotent, safe on a
  live site, exits non-zero if an image could not be read. Run it once after deploying the migration.
- **Migrations:** every model change ships with its migration in the same commit. Never edit an applied
  migration (the one exception so far makes `core/0009` tolerate an empty database, without changing its effect
  where it already ran). Data migrations must be reversible or explicitly documented as one-way.

## Running

```bash
docker compose -f ../compose.dev.yaml up -d --build backend   # http://localhost:8000 (starts postgres and redis)
docker compose -f ../compose.dev.yaml exec backend python manage.py migrate
docker compose -f ../compose.dev.yaml exec backend python manage.py createsuperuser
```

To run it natively, create a venv, run `pip install -r requirements.txt`, set `DB_HOST=localhost` and
`REDIS_URL=redis://localhost:6379/0`, then run `python manage.py runserver`.

## Tests

```bash
# Against the working tree, without rebuilding the image:
docker compose -f ../compose.dev.yaml run --rm --no-deps -v "$PWD:/app" backend python manage.py test
```

They need the dev Postgres (a test database is created and dropped) and Redis. External services are mocked
(`payment.services.PaymentGateway`, `payment.services.SpotPlayerClient`, `skyroom.views.SkyroomClient`). Uploads
go to `InMemoryStorage` through `override_settings(STORAGES=...)`; a test must never reach S3. Throttle rates are
patched with `common.testing.throttle_rates`, because DRF reads them once at import.

## Image

`Dockerfile` is multi-stage:

- **Build:** dependencies are installed in a venv on `python:3.12-slim`. `collectstatic` runs with inert
  placeholder env, so no secret is ever baked into the image.
- **Runtime:** a non-root `app` user, with only `libpq5` added.
- **Health:** the `HEALTHCHECK` hits `/api/health/`, which also checks Postgres.
- **gunicorn flags** come from `GUNICORN_CMD_ARGS`; override it per deployment instead of editing the image.

`staticfiles/` is build output: never commit it.
