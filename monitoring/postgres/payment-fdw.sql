-- Cross-database bridge so the backend DB can read real payment amounts, for per-edition income in Grafana.
-- The backend and payment databases live in the same Postgres instance but can't join across databases, so
-- postgres_fdw exposes the payment `payments` table (money columns only, no user_id) inside the backend DB as
-- payment_remote.payments. A backend order (payment_paymentrequest / payment_grouppaymentrequest) joins to it on
-- order_id, and the order's plans give the edition.
--
--   docker exec -i wss-postgres psql -U postgres -d backend -v ON_ERROR_STOP=1 \
--     -v reader_password="$WSS_DB_READER_PASSWORD" < monitoring/postgres/payment-fdw.sql
--
-- Run monitoring/postgres/roles.sql first (grafana_reader must exist and have SELECT on payment.payments).
-- Idempotent. Re-run it if the reader password rotates (the user mapping stores a copy).

\connect backend

CREATE EXTENSION IF NOT EXISTS postgres_fdw;

-- The foreign server points at the payment database over the container network (`postgresql` is the compose
-- service alias). It must NOT be 'localhost': 127.0.0.1 authenticates as `trust`, and postgres_fdw refuses a
-- password-less connection for a non-superuser like grafana_reader. The network name goes through scram instead.
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_foreign_server WHERE srvname = 'payment_fdw') THEN
    CREATE SERVER payment_fdw FOREIGN DATA WRAPPER postgres_fdw
      OPTIONS (host 'postgresql', port '5432', dbname 'payment', updatable 'false');
  ELSE
    ALTER SERVER payment_fdw OPTIONS (SET host 'postgresql', SET dbname 'payment');
  END IF;
END $$;

-- grafana_reader connects to the payment database as itself (roles are cluster-wide and it already has SELECT on
-- payment.payments from roles.sql). Re-created so a rotated password is picked up.
DROP USER MAPPING IF EXISTS FOR grafana_reader SERVER payment_fdw;
CREATE USER MAPPING FOR grafana_reader SERVER payment_fdw
  OPTIONS (user 'grafana_reader', password :'reader_password');

-- Only the money columns are exposed; user_id and the gateway reference columns are left out.
CREATE SCHEMA IF NOT EXISTS payment_remote;
DROP FOREIGN TABLE IF EXISTS payment_remote.payments;
CREATE FOREIGN TABLE payment_remote.payments (
  order_id       uuid,
  to_pay_amount  bigint,   -- net paid, Rial
  discount       bigint,   -- taken off, Rial
  payment_status smallint, -- 0 initiated, 1 failed, 2 timeout, 3 success
  created_at     timestamptz,
  verified_at    timestamptz
) SERVER payment_fdw OPTIONS (schema_name 'public', table_name 'payments');

GRANT USAGE ON FOREIGN SERVER payment_fdw TO grafana_reader;
GRANT USAGE ON SCHEMA payment_remote TO grafana_reader;
GRANT SELECT ON payment_remote.payments TO grafana_reader;
