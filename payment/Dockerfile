FROM golang:bullseye
COPY . /app
WORKDIR /app

ENV GOPROXY https://goproxy.io,direct
RUN go build -o payment ./cmd/payment/
CMD ["./payment"]
