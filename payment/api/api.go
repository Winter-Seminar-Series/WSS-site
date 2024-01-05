package api

import (
	db "wss-payment/internal/database"
	"wss-payment/pkg/idpay"
)

// API contains the data needed to operate the endpoints
type API struct {
	Database       db.PaymentDatabase
	PaymentService idpay.PaymentService
}
