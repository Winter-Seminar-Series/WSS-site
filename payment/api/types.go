package api

import "github.com/google/uuid"

// createTransactionRequest is the request body for create transaction endpoint
type createTransactionRequest struct {
	// Who is creating this transaction?
	UserID uint64 `json:"user_id" binding:"required"`
	// How much this user should pay?
	// This value should be more than zero
	ToPayAmount uint64 `json:"to_pay_amount" binding:"required,gte=1"`
	// How much discount this user had? (this is only stored in database for logs)
	Discount uint64 `json:"discount_amount"`
	// An optional description
	Description string `json:"description"`
	// What are the stuff this use is buying?
	BuyingGoods []string `json:"buying_goods" binding:"required"`
	// Name is only used to send it to payment service
	Name string `json:"name"`
	// Phone is only used to send it to payment service
	Phone string `json:"phone"`
	// The mail of user. Only used to send it to payment service
	Mail string `json:"mail"`
	// Where we should return the user after they have paid?
	CallbackURL string `json:"callback_url" binding:"required"`
}

// The response of create transaction endpoint if everything goes fine
type createTransactionResponse struct {
	// The order ID created by us
	OrderID uuid.UUID `json:"order_id"`
	// The ID returned from idpay
	ID string `json:"id"`
	// Where should we redirect the user?
	RedirectURL string `json:"redirect_url"`
}

// createTransactionRequest is the request body for creating goods endpoint
type createGoodRequest struct {
	// Name of it
	Name string `json:"name" binding:"required"`
	// The price of this item
	Price uint64 `json:"price" binding:"required,gte=1"`
	// An optional description about this payment
	Description string `json:"description"`
}

// createTransactionRequest is the result of creating goods endpoint
type creteGoodResponse struct {
	// ID of the created good
	ID uint32 `json:"id"`
}
