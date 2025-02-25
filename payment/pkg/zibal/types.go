package zibal

type TransactionCreationRequest struct {
	Merchant    string `json:"merchant"`
	Description string `json:"description"`
	Callback    string `json:"callbackUrl"`
	OrderID     string `json:"orderId"`
	Phone       string `json:"mobile,omitempty"`
	Amount      uint64 `json:"amount"`
}

type TransactionCreationResult struct {
	Message string `json:"message"`
	TrackID int64  `json:"trackId"`
	Result  int    `json:"result"`
}

type TransactionVerificationRequest struct {
	Merchant string `json:"merchant"`
	TrackID  int64  `json:"trackId"`
}

type TransactionVerificationResult struct {
	PaidAt      string `json:"paidAt"` // Basically a time, but fuck Go's date format
	Description string `json:"description"`
	CardNumber  string `json:"cardNumber"`
	OrderID     string `json:"orderId"`
	Message     string `json:"message"`
	RefNumber   string `json:"refNumber"`
	Amount      uint64 `json:"amount"`
	Result      int    `json:"result"`
	Status      int    `json:"status"`
}
