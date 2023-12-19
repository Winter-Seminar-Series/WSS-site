package api

import "gorm.io/gorm"

// API contains the data needed to operate the endpoints
type API struct {
	Database *gorm.DB
}
