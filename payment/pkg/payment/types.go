package payment

type TransactionCreationRequest struct {
	// This must be a randomly generated ID
	OrderID     string
	UsersPhone  string
	UsersMail   string
	Description string
	// Where should the user redirect after the payment is done
	Callback string
	Amount   uint64
}

type TransactionCreationResult struct {
	// An ID which is returned from the payment service
	ServiceOrderID string
	// Where we should redirect the user?
	RedirectLink string
}

type TransactionVerificationRequest struct {
	// The order ID which we stored in our database
	OrderID string
	// The ID which the payment service returned when we created this order
	ServiceOrderID string
}

type TransactionVerificationResult struct {
	// The track ID which we can track this verification
	TrackID string
	// Was the payment OK?
	PaymentOK bool
}
