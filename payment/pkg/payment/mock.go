package payment

import (
	"context"
	"github.com/go-faster/errors"
	"wss-payment/pkg/util"
)

// ServiceMock is a mock for a payment service
type ServiceMock struct {
	FailCreation          bool
	FailVerification      bool
	PaymentVerificationOk bool
}

func (service ServiceMock) CreateTransaction(context.Context, TransactionCreationRequest) (TransactionCreationResult, error) {
	if service.FailCreation {
		return TransactionCreationResult{}, errors.New("mock failed!")
	}
	id := util.RandomID()
	return TransactionCreationResult{
		ServiceOrderID: id,
		RedirectLink:   "https://example.com/" + id,
	}, nil

}

// VerifyTransaction will verify a previously made transaction and report errors if there was a problem with it
func (service ServiceMock) VerifyTransaction(context.Context, TransactionVerificationRequest) (TransactionVerificationResult, error) {
	if service.FailVerification {
		return TransactionVerificationResult{}, errors.New("mock failed!")
	}
	return TransactionVerificationResult{
		TrackID:   util.RandomID(),
		PaymentOK: service.PaymentVerificationOk,
	}, nil
}
