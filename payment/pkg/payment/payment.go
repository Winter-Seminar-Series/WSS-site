package payment

import (
	"context"
)

// Service should represent a payment service just like IDPay
type Service interface {
	CreateTransaction(context.Context, TransactionCreationRequest) (TransactionCreationResult, error)
	VerifyTransaction(context.Context, TransactionVerificationRequest) (TransactionVerificationResult, error)
}
