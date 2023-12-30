package database

import (
	"database/sql"
	"github.com/go-faster/errors"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"time"
)

// GetGoods gets the list of all goods in database
func (db PaymentDatabase) GetGoods() ([]Good, error) {
	var payments []Good
	result := db.db.Find(&payments)
	return payments, result.Error
}

// GetGoodsFromName gets the list of all goods from their name in database
func (db PaymentDatabase) GetGoodsFromName(names []string) ([]Good, error) {
	// TODO: There SHOULD be a better way
	result := make([]Good, len(names))
	for i, name := range names {
		if err := db.db.Where("name = ?", name).First(&result[i]).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, GoodNotFoundError{GoodName: name}
			} else {
				return nil, errors.Wrap(err, "cannot query database")
			}
		}
	}
	return result, nil
}

// AddGood adds a good to the table
func (db PaymentDatabase) AddGood(good *Good) error {
	return db.db.Create(good).Error
}

// InitiateTransaction will add the given Payment in database with status set to initialized
func (db PaymentDatabase) InitiateTransaction(payment *Payment) error {
	// At first initialize some values
	payment.OrderID = uuid.New()
	payment.PaymentStatus = PaymentStatusInitiated
	// Now insert it in database and pray to God that we have not fucked up anything up
	return db.db.Create(payment).Error
}

// MarkAsFailed will simply mark a payment as failed
func (db PaymentDatabase) MarkAsFailed(orderID uuid.UUID) {
	err := db.db.Model(&Payment{OrderID: orderID}).Update("PaymentStatus", PaymentStatusFailed).Error
	if err != nil {
		log.WithError(err).WithField("OrderID", orderID).Error("cannot mark order as failed")
	}
}

// GetPayment will get a payment from database based on its primary key
func (db PaymentDatabase) GetPayment(payment *Payment) error {
	return db.db.Find(payment).Error
}

// MarkPaymentAsOK will mark a payment as successful and then updates its track ID, payment track ID and verified at time.
// This function will also update the values in payment argument to the ones which will be inserted in database.
func (db PaymentDatabase) MarkPaymentAsOK(payment *Payment, trackID string, paymentTrackID string) error {
	verifiedAt := sql.NullTime{Valid: true, Time: time.Now()}
	err := db.db.Model(&Payment{OrderID: payment.OrderID}).Updates(&Payment{
		TrackID:        sql.NullString{Valid: true, String: trackID},
		PaymentTrackID: sql.NullString{Valid: true, String: paymentTrackID},
		PaymentStatus:  PaymentStatusSuccess,
		VerifiedAt:     verifiedAt,
	}).Error
	if err != nil {
		return err
	}
	payment.TrackID = sql.NullString{Valid: true, String: trackID}
	payment.PaymentTrackID = sql.NullString{Valid: true, String: paymentTrackID}
	payment.PaymentStatus = PaymentStatusSuccess
	payment.VerifiedAt = verifiedAt
	return nil
}

// MarkPaymentAsFailed will mark a payment as failed and then updates its verified at time.
// This function will also update the values in payment argument to the ones which will be inserted in database.
func (db PaymentDatabase) MarkPaymentAsFailed(payment *Payment) error {
	verifiedAt := sql.NullTime{Valid: true, Time: time.Now()}
	err := db.db.Model(&Payment{OrderID: payment.OrderID}).Updates(&Payment{
		PaymentStatus: PaymentStatusFailed,
		VerifiedAt:    verifiedAt,
	}).Error
	if err != nil {
		return err
	}
	payment.PaymentStatus = PaymentStatusFailed
	payment.VerifiedAt = verifiedAt
	return nil
}
