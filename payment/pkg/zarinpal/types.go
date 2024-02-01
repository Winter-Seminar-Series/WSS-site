package zarinpal

type TransactionCreationRequest struct {
	MerchantID  string                             `json:"merchant_id"`
	Currency    string                             `json:"currency"`
	Description string                             `json:"description"`
	Callback    string                             `json:"callback_url"`
	Metadata    TransactionCreationRequestMetadata `json:"metadata"`
	Amount      uint64                             `json:"amount"`
}

type TransactionCreationRequestMetadata struct {
	Phone   string `json:"mobile,omitempty"`
	Email   string `json:"email,omitempty"`
	OrderID string `json:"orderID"`
}

type TransactionCreationResult struct {
	Data struct {
		Code      int    `json:"code"`
		Message   string `json:"message"`
		Authority string `json:"authority"`
		FeeType   string `json:"fee_type"`
		Fee       int    `json:"fee"`
	} `json:"data"`
	Errors []interface{} `json:"errors"`
}

type TransactionVerificationRequest struct {
	MerchantID string `json:"merchant_id"`
	Authority  string `json:"authority"`
	Amount     uint64 `json:"amount"`
}

type TransactionVerificationResultOk struct {
	Data struct {
		Code     int    `json:"code"`
		Message  string `json:"message"`
		CardHash string `json:"card_hash"`
		CardPan  string `json:"card_pan"`
		RefId    int    `json:"ref_id"`
		FeeType  string `json:"fee_type"`
		Fee      int    `json:"fee"`
	} `json:"data"`
}

type TransactionVerificationResultError struct {
	Errors struct {
		Code        int           `json:"code"`
		Message     string        `json:"message"`
		Validations []interface{} `json:"validations"`
	} `json:"errors"`
}

type TransactionVerificationResult struct {
	Message string
	Code    int
	RefId   int
}
