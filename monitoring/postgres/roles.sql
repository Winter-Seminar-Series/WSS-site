-- Database roles for monitoring. Idempotent: re-run it after a migration adds tables, so Grafana can read them.
--
--   docker exec -i wss-postgres psql -U postgres -v ON_ERROR_STOP=1 \
--     -v reader_password="$WSS_DB_READER_PASSWORD" -v monitor_password="$PG_EXPORTER_PASSWORD" < monitoring/postgres/roles.sql
--
-- wss_monitor     postgres-exporter: server statistics only (pg_monitor), no table data.
-- grafana_reader  Grafana's SQL datasources: read-only, a short statement timeout, and no access to secrets or to
--                 the columns that identify a person (names, emails, national code, phone number, profile links).

SELECT format('CREATE ROLE wss_monitor LOGIN PASSWORD %L', :'monitor_password')
WHERE NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'wss_monitor') \gexec
SELECT format('CREATE ROLE grafana_reader LOGIN PASSWORD %L', :'reader_password')
WHERE NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'grafana_reader') \gexec

-- Re-running also rotates the passwords to the ones passed in.
ALTER ROLE wss_monitor PASSWORD :'monitor_password' CONNECTION LIMIT 3;
ALTER ROLE grafana_reader PASSWORD :'reader_password' CONNECTION LIMIT 10;
ALTER ROLE grafana_reader SET default_transaction_read_only = on;
ALTER ROLE grafana_reader SET statement_timeout = '30s';
ALTER ROLE grafana_reader SET idle_in_transaction_session_timeout = '60s';
GRANT pg_monitor TO wss_monitor;

GRANT CONNECT ON DATABASE backend, payment TO grafana_reader;

-- ---------------------------------------------------------------------------------------------------------------
\connect payment
GRANT USAGE ON SCHEMA public TO grafana_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO grafana_reader;

-- ---------------------------------------------------------------------------------------------------------------
\connect backend
GRANT USAGE ON SCHEMA public TO grafana_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO grafana_reader;

-- Secrets and session state: no access at all.
REVOKE ALL ON django_session, django_admin_log, token_blacklist_outstandingtoken, token_blacklist_blacklistedtoken,
    participant_participationattachment
    FROM grafana_reader;

-- Tables that mix useful fields with secrets or personal data: drop the table grant and allow only the listed columns.
REVOKE ALL ON auth_user FROM grafana_reader;
GRANT SELECT (id, last_login, is_superuser, is_staff, is_active, date_joined) ON auth_user TO grafana_reader;

REVOKE ALL ON participant_participantinfo FROM grafana_reader;
GRANT SELECT (id, city, birth_date, gender, university, major, job, is_open_to_work, fields_of_interest, grade,
              introduction_method)
    ON participant_participantinfo TO grafana_reader;

REVOKE ALL ON payment_grouppaymentrequest FROM grafana_reader;
GRANT SELECT (id, participant_numbers, timestamp, paid, order_id, group_discount_percentage, discount_id,
              participant_id, plan_id, status)
    ON payment_grouppaymentrequest TO grafana_reader;

REVOKE ALL ON spotplayer_spotplayerlicense FROM grafana_reader;
GRANT SELECT (id) ON spotplayer_spotplayerlicense TO grafana_reader;

-- CVs: countable per edition; the stored path and the uploaded file name (often the person's name) stay hidden.
REVOKE ALL ON participant_cv FROM grafana_reader;
GRANT SELECT (id, user_id, event_id, size, uploaded_at, updated_at) ON participant_cv TO grafana_reader;

REVOKE ALL ON staff_staff FROM grafana_reader;
GRANT SELECT (id, name, designation) ON staff_staff TO grafana_reader;
