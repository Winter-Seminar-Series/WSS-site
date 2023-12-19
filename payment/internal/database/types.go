package database

import (
	"github.com/google/uuid"
	"time"
)

type PayedGood uint8

const (
	PayedGoodOnlineAttendance   PayedGood = 0
	PayedGoodInPersonAttendance PayedGood = 1
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
	// An optional description about this payment
	Description string
	// The track ID which idpay returns to us after verification
	TrackID string
	// The payment track ID which idpay returns to us after verification
	PaymentTrackID string
	// What product this user is buying
	GoodType PayedGood `gorm:"not null"`
	// What is the status of this payment?
	PaymentStatus PaymentStatus `gorm:"not null"`
	// When was this payment created?
	CreatedAt time.Time `gorm:"not null"`
	// When was it verified? (could be null)
	VerifiedAt time.Time
}
