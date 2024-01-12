package idpay

import (
	"context"
	"wss-payment/pkg/payment"
)

type PaymentAdaptor struct {
	idpay IDPay
}

func NewPaymentAdaptor(apiKey string, sandboxed bool) PaymentAdaptor {
	return PaymentAdaptor{NewIDPay(apiKey, sandboxed)}
}

func (adaptor PaymentAdaptor) CreateTransaction(ctx context.Context, req payment.TransactionCreationRequest) (payment.TransactionCreationResult, error) {
	idpayRequest := TransactionCreationRequest{
		OrderID:     req.OrderID,
		Phone:       req.UsersPhone,
		Mail:        req.UsersMail,
		Description: req.Description,
		Callback:    req.Callback,
		Amount:      req.Amount,
	}
	idpayResult, err := adaptor.idpay.CreateTransaction(ctx, idpayRequest)
	if err != nil {
		return payment.TransactionCreationResult{}, err
	}
	return payment.TransactionCreationResult{
		ServiceOrderID: idpayResult.ID,
		RedirectLink:   idpayResult.Link,
	}, nil
}

func (adaptor PaymentAdaptor) VerifyTransaction(ctx context.Context, req payment.TransactionVerificationRequest) (payment.TransactionVerificationResult, error) {
	idpayRequest := TransactionVerificationRequest{
		OrderID: req.OrderID,
		ID:      req.ServiceOrderID,
	}
	idpayResult, err := adaptor.idpay.VerifyTransaction(ctx, idpayRequest)
	if err != nil {
		return payment.TransactionVerificationResult{}, err
	}
	return payment.TransactionVerificationResult{
		TrackID:   idpayResult.TrackID,
		PaymentOK: idpayResult.PaymentOK,
	}, nil
}
