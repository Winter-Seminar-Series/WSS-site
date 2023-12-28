package database

// GetGoods gets the list of all goods in database
func (db PaymentDatabase) GetGoods() ([]Good, error) {
	var payments []Good
	result := db.db.Find(&payments)
	return payments, result.Error
}

// AddGood adds a good to the table
func (db PaymentDatabase) AddGood(good *Good) error {
	return db.db.Create(good).Error
}
