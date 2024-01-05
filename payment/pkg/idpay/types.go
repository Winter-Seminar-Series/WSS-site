package idpay

type ErrorMessage struct {
	ErrorMessage string `json:"error_message"`
	ErrorCode    int    `json:"error_code"`
}

type TransactionCreationRequest struct {
	// This must be a randomly generated ID
	OrderID     string `json:"order_id"`
	Name        string `json:"name"`
	Phone       string `json:"phone"`
	Mail        string `json:"mail"`
	Description string `json:"desc"`
	Callback    string `json:"callback"`
	Amount      uint64 `json:"amount"`
}

type TransactionCreationResult struct {
	ID   string `json:"id"`
	Link string `json:"link"`
}

type TransactionVerificationRequest struct {
	OrderID string `json:"order_id"`
	ID      string `json:"id"`
}

type TransactionVerificationResponse struct {
	Status  string `json:"status"`
	TrackId string `json:"track_id"`
	Payment struct {
		TrackId string `json:"track_id"`
	} `json:"payment"`
}

type TransactionVerificationResult struct {
	// The track ID which idpay returns to us after verification
	TrackID string
	// The payment track ID which idpay returns to us after verification
	PaymentTrackID string
	// Was the payment OK?
	PaymentOK bool
}
