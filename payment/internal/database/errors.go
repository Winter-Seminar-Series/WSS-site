package database

// GoodNotFoundError is returned if a specific good is not found
type GoodNotFoundError struct {
	GoodName string
}

func (err GoodNotFoundError) Error() string {
	return "cannot find good: " + err.GoodName
}
