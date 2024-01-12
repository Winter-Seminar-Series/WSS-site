package api

import (
	db "wss-payment/internal/database"
	"wss-payment/pkg/payment"
)

// API contains the data needed to operate the endpoints
type API struct {
	Database       db.PaymentDatabase
	PaymentService payment.Service
}
