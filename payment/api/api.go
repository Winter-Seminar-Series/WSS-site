package api

import db "wss-payment/internal/database"

// API contains the data needed to operate the endpoints
type API struct {
	Database db.PaymentDatabase
}
