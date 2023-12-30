package database

import (
	"database/sql"
	"github.com/google/uuid"
	"time"
)

type PaymentStatus uint8

const (
	PaymentStatusInitiated PaymentStatus = 0
	PaymentStatusFailed    PaymentStatus = 1
	PaymentStatusTimeout   PaymentStatus = 2
	PaymentStatusSuccess   PaymentStatus = 3
)

// Payment represents a payment made by a user
type Payment struct {
	// The order ID which is sent to pay.ir
	OrderID uuid.UUID `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	// Who has made this payment?
	UserID uint64 `gorm:"index;not null"`
	// What is the amount that the user should pay?
	ToPayAmount uint64 `gorm:"not null"`
	// The amount which we got a discount
	Discount uint64 `gorm:"not null"`
	// An optional description about this payment
	Description string `gorm:"not null"`
	// The ID which is returned from idpay after we have initiated the transaction
	ID sql.NullString
	// The track ID which idpay returns to us after verification
	TrackID sql.NullString
	// The payment track ID which idpay returns to us after verification
	PaymentTrackID sql.NullString
	// What is the status of this payment?
	PaymentStatus PaymentStatus `gorm:"not null"`
	// List of the Goos which this user has bought in this payment
	BoughtGoods []Good `gorm:"many2many:bought_goods;"`
	// When was this payment created?
	CreatedAt time.Time `gorm:"not null"`
	// When was it verified? (could be null)
	VerifiedAt sql.NullTime
}

type Good struct {
	// ID of this good
	ID uint32 `gorm:"primarykey"`
	// Name of it
	Name string `gorm:"unique;not null" `
	// The price of this item
	Price uint64 `gorm:"not null"`
	// An optional description about this payment
	Description string `gorm:"not null"`
}
