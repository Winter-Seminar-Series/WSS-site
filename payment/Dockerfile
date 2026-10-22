# syntax=docker/dockerfile:1

ARG GO_VERSION=1.23

# Cross-compile on the build host's native arch: Go needs no emulation to target another platform.
FROM --platform=$BUILDPLATFORM golang:${GO_VERSION}-alpine AS build
WORKDIR /src
# goproxy.io first so builds from inside Iran keep working; proxy.golang.org as the fallback.
ARG GOPROXY=https://goproxy.io,https://proxy.golang.org,direct
ENV CGO_ENABLED=0 GOPROXY=$GOPROXY
RUN apk add --no-cache ca-certificates tzdata
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download
COPY . .
ARG TARGETOS TARGETARCH
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    GOOS=$TARGETOS GOARCH=$TARGETARCH go build -trimpath -ldflags="-s -w" -o /out/payment ./cmd/payment

# Static binary on scratch: no shell or package manager in the runtime image. Not distroless, because
# gcr.io is unreachable from Iran and local builds there must keep working.
FROM scratch
# CA certs for the outbound HTTPS calls to the payment gateways; zoneinfo for Go's time package.
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=build /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=build /out/payment /payment
USER 65532:65532
# LISTEN_ADDRESS has no default in the code; without it the service binds a random port.
ENV GIN_MODE=release LISTEN_ADDRESS=:8080
EXPOSE 8080
ENTRYPOINT ["/payment"]
