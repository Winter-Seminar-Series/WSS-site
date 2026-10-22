# CLAUDE.md

Guidance for Claude Code in `WSS-site/backend`, the Django REST API of the Winter Seminar Series. The
repo-wide rules are in `../CLAUDE.md`.

You are a **senior backend engineer**. Production data spans every edition since the first. Migrations
and API contracts must stay backward compatible: the frontend image deploys independently of this one.

---

## Stack

Django 4.2, Django REST Framework, `djangorestframework-simplejwt` (with the token blacklist),
`drf-standardized-errors`, PostgreSQL via `psycopg` 3, `django-storages` S3 on ArvanCloud for media,
WhiteNoise for static files, and gunicorn.

## Apps

| App | Responsibility |
| --- | --- |
| `core` | Editions (`Event`, selected by id = the frontend's `WSS_ORDER`), seminars, workshops, round tables, lab talks, speakers, modes of attendance |
| `participant` | Sign-up, profile, password reset/change, participation per event, plans, attachments, files |
| `staff` | Organising team and roles per edition |
| `payment` | Pricing, discount codes, checkout. It calls the `payment` Go service at `PAYMENT_SERVICE_URL` |
| `skyroom` | Live-stream (Skyroom) links |
| `spotplayer` | Recorded-video licences |
| `sponsor` | Sponsors |

All API routes live under `/api/` (see `WSS/urls.py`); `/admin/` is the Django admin used by the
organisers.

## Conventions

- **Views:** DRF generic class-based views with serializers. Keep views thin and put validation in
  serializers.
- **Errors:** they go through `drf_standardized_errors`. The frontend parses its `{ type, errors: [{ code,
  detail, attr }] }` shape (`frontend/services/http.ts`), so never return ad-hoc error bodies.
- **Auth:** JWT bearer tokens, with a 2h access token and a rotating 5-day refresh token. The frontend's
  `proxy.ts` depends on these lifetimes and on `/api/sign-in/refresh/`.
- **API contract:** field names are snake_case, and the frontend mirrors them exactly in
  `types/*.api.type.ts`. Renaming or removing a field is a breaking change. Add the new field, migrate the
  frontend, and only then remove the old one.
- **Settings:** settings come from the environment (`WSS/settings.py`). A required variable uses
  `os.environ[...]`, which fails fast at import; an optional one uses `os.getenv(..., default)`. Document
  every new variable in `../.env.backend.example`.
- **Media:** media is stored on S3. `AWS_QUERYSTRING_AUTH=false` gives unsigned public URLs, which the
  bucket allows; the frontend's `next/image` allow-list and its `/files/[id]` route expect this host.
- **Migrations:** every model change ships with its migration in the same commit. Never edit an applied
  migration. Data migrations must be reversible or explicitly documented as one-way.

## Running

```bash
docker compose -f ../compose.dev.yaml up -d --build backend   # http://localhost:8000
docker compose -f ../compose.dev.yaml exec backend python manage.py migrate
docker compose -f ../compose.dev.yaml exec backend python manage.py createsuperuser
```

To run it natively, create a venv, run `pip install -r requirements.txt`, set `DB_HOST=localhost`, then
run `python manage.py runserver`.

## Image

`Dockerfile` is multi-stage:

- **Build:** dependencies are installed in a venv on `python:3.12-slim`. `collectstatic` runs with inert
  placeholder env, so no secret is ever baked into the image.
- **Runtime:** a non-root `app` user, with only `libpq5` added.
- **Health:** the `HEALTHCHECK` hits `/admin/login/`.
- **gunicorn flags** come from `GUNICORN_CMD_ARGS`; override it per deployment instead of editing the image.

`staticfiles/` is build output: never commit it.
