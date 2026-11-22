# Monitoring

Grafana at **https://grafana.wss-sharif.com**, with Prometheus and its exporters. It is defined in
`monitoring-compose.yaml` and runs on the production server next to the site.

```
browser ─▶ CDN ─▶ wss-nginx ─▶ grafana:3000 ─┬▶ prometheus:9090 ─┬▶ node-exporter (host metrics, host network)
                                             │                  ├▶ cadvisor:8080 (per-container metrics)
                                             │                  ├▶ postgres-exporter:9187 ─▶ postgresql (pg_monitor)
                                             │                  └▶ grafana:3000/metrics
                                             └▶ postgresql: backend, payment (read-only `grafana_reader`)
```

No service publishes a host port. Prometheus and the exporters are reachable only from the `app` network.
node-exporter uses the host network, so that its network panels show the server's interfaces, and listens only
on the `app` bridge gateway (`APP_NETWORK_GATEWAY`, 19.16.3.1 by default). nginx returns 404 for Grafana's
`/metrics`.

## What is in it

| Dashboard (folder WSS) | Source |
| --- | --- |
| WSS registrations and payments | Backend and payment databases: registrations, orders, revenue, plan fill, participants. |
| Node Exporter Full | Host CPU, memory, disk, network ([grafana.com 1860](https://grafana.com/grafana/dashboards/1860)). |
| cadvisor dashboard | Per-container resources ([grafana.com 19792](https://grafana.com/grafana/dashboards/19792)). |
| PostgreSQL Database | Connections, transactions, locks, cache hits ([grafana.com 9628](https://grafana.com/grafana/dashboards/9628)). |

Datasources and dashboards are provisioned from this directory on every start. Edits in the UI cannot be saved
over them. To change a dashboard, edit it in Grafana, export it as JSON (Share → Export, with "Export for sharing
externally" off), replace the file in `grafana/dashboards/` and commit it. Dashboards made from scratch in the UI
are stored in Grafana's own database (the `grafana-data` volume) and are not in git.

### Database access

`postgres/roles.sql` creates two roles:

- **`grafana_reader`** is used by the `WSS backend DB` and `WSS payment DB` datasources. Its sessions are read
  only, with a 30 s statement timeout and at most 10 connections. It has no access to sessions, JWT tables, the
  admin log or uploaded attachments. On `auth_user`, `participant_participantinfo`,
  `payment_grouppaymentrequest`, `spotplayer_spotplayerlicense` and `staff_staff` it can read only the
  columns that identify nobody and hold no secret: no password hashes, emails, names, national codes, phone
  numbers or license keys.
- **`wss_monitor`** is used by postgres-exporter. It has `pg_monitor`: server statistics, no table data.

**Per-edition income** needs the backend and payment databases joined, but they are separate databases, so
`monitoring/postgres/payment-fdw.sql` sets up `postgres_fdw`: it exposes the payment `payments` table (money
columns only, no `user_id`) inside the backend database as `payment_remote.payments`. The income panels run on the
backend datasource and join each order to it on `order_id`, attributing the money to the edition through the
order's plans. Run it after `roles.sql`, and re-run it if the reader password rotates (the foreign user mapping
stores a copy). Editions before the current payment gateway (roughly 1–9) have no rows in `payments` and correctly
show zero income.

The grants cover the tables that exist when the script runs. **Re-run it after a migration adds a table.** Grafana
can't read the new table until you do, and the script grants a new table in full, so first check whether it holds
anything sensitive and add a column-level grant if it does.

Grafana users with the Viewer role can only see dashboards. Editors and Admins can also run arbitrary SQL in
Explore, limited by the grants above. Give Editor only to people trusted with participant data.

## First deploy

On the server, in the checkout (`/home/wss/WSS-site`):

```bash
# 1. Secrets
cp .env.grafana.example .env.grafana                      # fill every change-me: openssl rand -hex 24
cp .env.postgres-exporter.example .env.postgres-exporter
chmod 600 .env.grafana .env.postgres-exporter

# 2. Database roles (WSS_DB_READER_PASSWORD from .env.grafana, DATA_SOURCE_PASS from .env.postgres-exporter)
docker exec -i wss-postgres psql -U postgres -v ON_ERROR_STOP=1 \
  -v reader_password='…' -v monitor_password='…' < monitoring/postgres/roles.sql

# 2b. Cross-database bridge for per-edition income (reader_password from .env.grafana)
docker exec -i wss-postgres psql -U postgres -v ON_ERROR_STOP=1 \
  -v reader_password='…' < monitoring/postgres/payment-fdw.sql

# 3. Start the stack, then let nginx route the domain
docker-compose -f monitoring-compose.yaml up -d
docker exec wss-nginx nginx -t && docker exec wss-nginx nginx -s reload
```

DNS: `grafana.wss-sharif.com` is an A record at the CDN (ArvanCloud), proxied like `wss-sharif.com`, with
HTTPS enabled.

## Operations

```bash
docker-compose -f monitoring-compose.yaml ps
docker-compose -f monitoring-compose.yaml logs -f grafana
docker-compose -f monitoring-compose.yaml restart grafana          # after changing provisioning
docker exec wss-prometheus wget -qO- localhost:9090/api/v1/targets | grep -o '"health":"[a-z]*"'   # all "up"
docker exec wss-grafana grafana cli admin reset-admin-password '…' # lost admin password
```

Resources: memory caps of 384 MiB (Grafana), 512 MiB (Prometheus), 256 MiB (cAdvisor) and 64 MiB per exporter.
Prometheus keeps 15 days or 1 GB of data, whichever limit is reached first. Logs are capped at 3 × 10 MB per
container.
