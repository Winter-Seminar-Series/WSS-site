# CLAUDE.md

Guidance for Claude Code in `WSS-site/payment`, the Go service that sits between the Django backend and
the payment gateways. The repo-wide rules are in `../CLAUDE.md`, and the variables are listed in `README.MD`.

You are a **senior Go engineer**. This service moves real money. Correctness and auditability come before
convenience: a transaction row is written before the gateway is called, and the gateway order id is saved after.

---

## Shape

```
cmd/payment/main.go      # wiring: env → database → gateway adaptor → gin routes; graceful shutdown on SIGTERM
api/                     # HTTP handlers + request/response types (POST/GET /transaction, GET /health)
internal/database/       # gorm models and PaymentDatabase (Postgres)
pkg/payment/             # gateway-agnostic `payment.Service` interface (+ a mock)
pkg/zibal/, pkg/zarinpal/, pkg/idpay/   # gateway adaptors; only Zibal is wired in main.go today
pkg/util/
```

- **Callers:** the only client is the Django backend (`PAYMENT_SERVICE_URL`). The service is internal: it
  is never exposed through nginx, and the browser never calls it.
- **Gateways:** a new gateway implements `payment.Service` (pkg/payment) in its own `pkg/<gateway>/`
  package. Switching gateways is a one-line change in `main.go`; handlers must not import a concrete
  gateway.
- **Configuration:** configuration is environment-only. Missing required values `log.Fatal` at startup, so
  fail fast and never fall back silently. `LISTEN_ADDRESS` has no default in code; the image sets `:8080`.
- **Errors and logging:** wrap errors with `github.com/go-faster/errors` and log with logrus. Never log
  merchant IDs, API keys or full gateway responses that contain card data.

## Running

```bash
docker compose -f ../compose.dev.yaml up -d --build payment   # http://localhost:8080/health
go build ./cmd/payment && go vet ./...                       # natively, Go 1.23
```

## Image

`Dockerfile` is multi-stage:

- **Build:** a static `CGO_ENABLED=0` binary is cross-compiled on the build platform, using module and
  build cache mounts.
- **Runtime:** a `scratch` image with only CA certs and zoneinfo, running as non-root uid 65532. The image
  is about 15MB.
- **Why not distroless:** `gcr.io` is unreachable from Iran. Keep it that way.
- **`GOPROXY`** defaults to `goproxy.io` with `proxy.golang.org` as the fallback, so builds work both
  inside and outside Iran.
- **No shell in the image:** health is checked from outside via `GET /health`.
