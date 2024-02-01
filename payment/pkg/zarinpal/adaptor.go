package zarinpal

import (
	"context"
	"strconv"
	"wss-payment/pkg/payment"
)

type PaymentAdaptor struct {
	zarinpal Zarinpal
}

func NewPaymentAdaptor(merchantID string) PaymentAdaptor {
	return PaymentAdaptor{NewZarinpal(merchantID)}
}

func (adaptor PaymentAdaptor) CreateTransaction(ctx context.Context, req payment.TransactionCreationRequest) (payment.TransactionCreationResult, error) {
	zarinpalRequest := TransactionCreationRequest{
		MerchantID:  adaptor.zarinpal.merchantID,
		Currency:    "IRR", // rial
		Description: req.Description,
		Callback:    req.Callback,
		Metadata: TransactionCreationRequestMetadata{
			Phone:   req.UsersPhone,
			Email:   req.UsersMail,
			OrderID: req.OrderID,
		},
		Amount: req.Amount,
	}
	if zarinpalRequest.Description == "" { // we cannot have empty description in zarinpal
		zarinpalRequest.Description = "Payment for user " + req.UsersPhone
	}
	zarinpalRequest.Description = "[WSS] " + zarinpalRequest.Description
	if len(req.Description) > 500 { // zarinpal only allows descriptions as long as 500 chars
		zarinpalRequest.Description = zarinpalRequest.Description[:500]
	}
	zarinpalResult, err := adaptor.zarinpal.CreateTransaction(ctx, zarinpalRequest)
	if err != nil {
		return payment.TransactionCreationResult{}, err
	}
	return payment.TransactionCreationResult{
		ServiceOrderID: zarinpalResult.Data.Authority,
		RedirectLink:   "https://www.zarinpal.com/pg/StartPay/" + zarinpalResult.Data.Authority,
	}, nil
}

func (adaptor PaymentAdaptor) VerifyTransaction(ctx context.Context, req payment.TransactionVerificationRequest) (payment.TransactionVerificationResult, error) {
	zarinpalRequest := TransactionVerificationRequest{
		MerchantID: adaptor.zarinpal.merchantID,
		Authority:  req.ServiceOrderID,
		Amount:     req.PaidAmount,
	}
	zarinpalResult, err := adaptor.zarinpal.VerifyTransaction(ctx, zarinpalRequest)
	if err != nil {
		return payment.TransactionVerificationResult{}, err
	}
	return payment.TransactionVerificationResult{
		TrackID:   strconv.Itoa(zarinpalResult.RefId),
		PaymentOK: isPaymentOk(zarinpalResult),
	}, nil
}

func isPaymentOk(response TransactionVerificationResult) bool {
	if response.Code == 100 || response.Code == 101 {
		return true
	}
	return false
}
