package database

import "gorm.io/gorm"

type PaymentDatabase struct {
	db *gorm.DB
}

// Close a gorm database
func (db PaymentDatabase) Close() {
	if database, err := db.db.DB(); err == nil {
		_ = database.Close()
	}
}
