package idpay

import (
	"context"
	"github.com/go-faster/errors"
	"wss-payment/pkg/util"
)

// Mock is a mock for IDPay
type Mock struct {
	FailCreation          bool
	FailVerification      bool
	PaymentVerificationOk bool
}

func (idpay Mock) CreateTransaction(context.Context, TransactionCreationRequest) (TransactionCreationResult, error) {
	if idpay.FailCreation {
		return TransactionCreationResult{}, errors.New("mock failed!")
	}
	id := util.RandomID()
	return TransactionCreationResult{
		ID:   id,
		Link: "https://example.com/" + id,
	}, nil

}

// VerifyTransaction will verify a previously made transaction and report errors if there was a problem with it
func (idpay Mock) VerifyTransaction(context.Context, TransactionVerificationRequest) (TransactionVerificationResult, error) {
	if idpay.FailVerification {
		return TransactionVerificationResult{}, errors.New("mock failed!")
	}
	return TransactionVerificationResult{
		TrackID:        util.RandomID(),
		PaymentTrackID: util.RandomID(),
		PaymentOK:      idpay.PaymentVerificationOk,
	}, nil
}
