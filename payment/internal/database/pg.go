package database

import (
	"github.com/go-faster/errors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// NewPostgres opens a postgres database and returns the connection
func NewPostgres(dsn string) (PaymentDatabase, error) {
	// Create database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		TranslateError: true,
	})
	if err != nil {
		return PaymentDatabase{}, errors.Wrap(err, "cannot open database")
	}
	// Gorm automatically pings the database thus we can just migrate tables
	err = db.AutoMigrate(Payment{}, Good{})
	if err != nil {
		return PaymentDatabase{}, errors.Wrap(err, "cannot migrate database")
	}
	// GTG
	return PaymentDatabase{db}, nil
}
