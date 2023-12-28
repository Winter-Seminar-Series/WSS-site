package database

import (
	"github.com/go-faster/errors"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
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
