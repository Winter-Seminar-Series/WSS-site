package idpay

import "context"

// PaymentService should represent a payment service just like IDPay
type PaymentService interface {
	CreateTransaction(context.Context, TransactionCreationRequest) (TransactionCreationResult, error)
	VerifyTransaction(context.Context, TransactionVerificationRequest) (TransactionVerificationResult, error)
}
