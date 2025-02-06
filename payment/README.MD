# Payment service

Payment service is the adaptor that connects to IDPay/Zarinpal/Zibal in and logs all of the payments.

## Compiling

Compiling is easy with go 1.23. Just run `go build ./cmd/payment/` in project directory.

## Running

Configuration is done via environment variables. These are the list of environment variables that the program supports:

* `DATABASE_URL`: The URL used to connect to PostgreSQL database. For
  example: `host=localhost user=gorm password=gorm dbname=gorm port=9920`. [Read More](https://gorm.io/docs/connecting_to_the_database.html#PostgreSQL)
* `LISTEN_ADDRESS`: On what address should we listen? For example `127.0.0.1:12345`
* `IDPAY_APIKEY`: The API token of IDPay. This is only needed if you are using IDPay.
* `IDPAY_SANDBOX`: Should we run IDPay in sandbox environment for testing? This value should be a boolean and defaults
  to false. Only effective if you are using IDPay.
* `ZARINPAL_MERCHANT_ID`: The merchant ID of Zarinpal. This is a GUID. Only needed if you are using Zarinpal.
* `ZIBAL_MERCHANT`: The merchant ID of Zibal. Only needed if you are using Zibal.
* `GIN_MODE`: Set this value to `release` in production, otherwise leave it empty.
* `LOG_LEVEL`: Sets the log level. Can be one of these: `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `panic`.
  Defaults to `info`.

After setting these variables, just run the compiled program.
