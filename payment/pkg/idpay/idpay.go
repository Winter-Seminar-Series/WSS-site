package idpay

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/go-faster/errors"
	log "github.com/sirupsen/logrus"
	"net/http"
	"os"
)

// apiKey is the API key used for ID Pay
var apiKey = os.Getenv("IDPAY_KEY")

// CreateTransaction will create a new transaction in ID pay and return its result (id and link)
func CreateTransaction(ctx context.Context, reqBody TransactionCreationRequest) (TransactionCreationResult, error) {
	// Create the request
	payload, _ := json.Marshal(reqBody)
	req, _ := http.NewRequestWithContext(ctx, "POST", "https://api.idpay.ir/v1.1/payment", bytes.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-API-KEY", apiKey)
	req.Header.Set("X-SANDBOX", getSandboxHeader())
	// Send the request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return TransactionCreationResult{}, errors.Wrap(err, "cannot send request")
	}
	defer resp.Body.Close()
	// Check results
	if resp.StatusCode/100 == 2 { // 2xx, ok
		var body TransactionCreationResult
		err = json.NewDecoder(resp.Body).Decode(&body)
		if err != nil {
			return TransactionCreationResult{}, errors.Wrap(err, "cannot parse body")
		}
		return body, nil
	} else { // fuckup
		var body ErrorMessage
		err = json.NewDecoder(resp.Body).Decode(&body)
		if err != nil {
			return TransactionCreationResult{}, errors.Wrap(err, "cannot parse body")
		}
		return TransactionCreationResult{}, errors.Errorf("not 2xx status code: %d with error message %s", resp.StatusCode, body.ErrorMessage)
	}
}

// VerifyTransaction will verify a previously made transaction and report errors if there was a problem with it
func VerifyTransaction(ctx context.Context, reqBody TransactionVerificationRequest) (TransactionVerificationResult, error) {
	// Create the request
	payload, _ := json.Marshal(reqBody)
	req, _ := http.NewRequestWithContext(ctx, "POST", "https://api.idpay.ir/v1.1/payment/verify", bytes.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-API-KEY", apiKey)
	req.Header.Set("X-SANDBOX", getSandboxHeader())
	// Send the request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return TransactionVerificationResult{}, errors.Wrap(err, "cannot send request")
	}
	defer resp.Body.Close()
	// Check results
	if resp.StatusCode/100 == 2 { // 2xx, ok
		var body TransactionVerificationResponse
		err = json.NewDecoder(resp.Body).Decode(&body)
		if err != nil {
			return TransactionVerificationResult{}, errors.Wrap(err, "cannot parse body")
		}
		return TransactionVerificationResult{
			PaymentOK:      isPaymentOk(body),
			TrackID:        body.TrackId,
			PaymentTrackID: body.Payment.TrackId,
		}, nil
	} else { // fuckup
		var body ErrorMessage
		err = json.NewDecoder(resp.Body).Decode(&body)
		if err != nil {
			return TransactionVerificationResult{}, errors.Wrap(err, "cannot parse body")
		}
		return TransactionVerificationResult{}, errors.Errorf("not 2xx status code: %d with error message %s", resp.StatusCode, body.ErrorMessage)
	}
}

// isPaymentOk checks if a payment was ok based on the result of verification endpoint or not
func isPaymentOk(resp TransactionVerificationResponse) bool {
	if resp.Status == "101" {
		log.WithField("resp", resp).Warn("double verification")
	}
	return resp.Status == "100" || resp.Status == "101" || resp.Status == "200"
}
