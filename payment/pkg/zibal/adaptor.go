package zibal

import (
	"context"
	"github.com/go-faster/errors"
	"strconv"
	"wss-payment/pkg/payment"
)

type PaymentAdaptor struct {
	zibal Zibal
}

func NewPaymentAdaptor(merchant string) PaymentAdaptor {
	return PaymentAdaptor{NewZibal(merchant)}
}

func (adaptor PaymentAdaptor) CreateTransaction(ctx context.Context, req payment.TransactionCreationRequest) (payment.TransactionCreationResult, error) {
	// Create the request
	zibalRequest := TransactionCreationRequest{
		Merchant:    adaptor.zibal.merchant,
		Description: req.Description,
		Callback:    req.Callback,
		OrderID:     req.OrderID,
		Phone:       req.UsersPhone,
		Amount:      req.Amount,
	}
	if len(req.Description) > 500 { // arbitrary limiting
		zibalRequest.Description = zibalRequest.Description[:500]
	}
	zibalResult, err := adaptor.zibal.CreateTransaction(ctx, zibalRequest)
	if err != nil {
		return payment.TransactionCreationResult{}, err
	}
	// Parse back the data
	trackIDString := strconv.FormatInt(zibalResult.TrackID, 10)
	return payment.TransactionCreationResult{
		ServiceOrderID: trackIDString,
		RedirectLink:   "https://gateway.zibal.ir/start/" + trackIDString,
	}, nil
}

func (adaptor PaymentAdaptor) VerifyTransaction(ctx context.Context, req payment.TransactionVerificationRequest) (payment.TransactionVerificationResult, error) {
	// Convert back the track ID from string to int
	trackID, err := strconv.ParseInt(req.ServiceOrderID, 10, 64)
	if err != nil {
		return payment.TransactionVerificationResult{}, errors.Wrap(err, "cannot parse track ID")
	}
	// Create the request and send it
	zibalRequest := TransactionVerificationRequest{
		Merchant: adaptor.zibal.merchant,
		TrackID:  trackID,
	}
	zibalResult, err := adaptor.zibal.VerifyTransaction(ctx, zibalRequest)
	if err != nil {
		return payment.TransactionVerificationResult{}, err
	}
	// Parse back the response
	return payment.TransactionVerificationResult{
		TrackID:   zibalResult.RefNumber,
		PaymentOK: isPaymentOk(zibalResult),
	}, nil
}

func isPaymentOk(response TransactionVerificationResult) bool {
	return !isHardError(response) && (response.Status == 1 || response.Result == 201)
}
