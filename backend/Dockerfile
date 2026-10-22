# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.12

FROM python:${PYTHON_VERSION}-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    VIRTUAL_ENV=/opt/venv \
    PATH=/opt/venv/bin:$PATH

# Dependencies live in a venv so the runtime stage copies one directory instead of site-packages + bin.
FROM base AS deps
RUN python -m venv "$VIRTUAL_ENV"
COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt

FROM base AS runtime
# `psycopg` is the pure-Python build, so it needs the libpq client library at runtime.
RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq5 \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --system --gid 1001 app \
    && useradd --system --uid 1001 --gid app --no-create-home app
COPY --from=deps /opt/venv /opt/venv
WORKDIR /app
COPY --chown=app:app . .

# collectstatic touches neither the database nor S3, but settings.py requires these at import time.
# Real values come from the runtime env_file, so no secret is ever baked into the image.
RUN SECRET_KEY=collectstatic DB_HOST=- DB_PORT=5432 DB_NAME=- DB_USER=- DB_PASS=- \
    AWS_ACCESS_KEY=- AWS_SECRET_KEY=- AWS_STORAGE_BUCKET_NAME=- \
    python manage.py collectstatic --noinput \
    && chown -R app:app staticfiles

USER app
EXPOSE 8000
# Tunable per deployment without rebuilding, e.g. GUNICORN_CMD_ARGS="--workers=8".
ENV GUNICORN_CMD_ARGS="--bind=0.0.0.0:8000 --workers=4 --access-logfile=- --graceful-timeout=30"
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD ["python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/admin/login/', timeout=4)"]
CMD ["gunicorn", "WSS.wsgi:application"]
