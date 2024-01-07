FROM golang:bullseye
COPY . /app
WORKDIR /app


RUN go build -o payment ./cmd/payment/
CMD ["./payment"]