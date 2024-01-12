package zarinpal

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/go-faster/errors"
	log "github.com/sirupsen/logrus"
	"net/http"
)

type Zarinpal struct {
	merchantID string
}

func NewZarinpal(merchantID string) Zarinpal {
	return Zarinpal{merchantID}
}

// CreateTransaction will create a new transaction in ID pay and return its result (id and link)
func (zarinpal Zarinpal) CreateTransaction(ctx context.Context, reqBody TransactionCreationRequest) (TransactionCreationResult, error) {
	// Create the request
	payload, _ := json.Marshal(reqBody)
	req, _ := http.NewRequestWithContext(ctx, "POST", "https://api.zarinpal.com/pg/v4/payment/request.json", bytes.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	// Send the request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return TransactionCreationResult{}, errors.Wrap(err, "cannot send request")
	}
	// Parse body
	var body TransactionCreationResult
	err = json.NewDecoder(resp.Body).Decode(&body)
	_ = resp.Body.Close()
	if err != nil {
		return TransactionCreationResult{}, errors.Wrap(err, "cannot parse transaction body")
	}
	// Check status
	if resp.StatusCode/100 == 2 && body.Data.Code == 100 { // 2xx, ok and also the code in body
		return body, nil
	} else { // fuckup
		return TransactionCreationResult{}, errors.Errorf("not 2xx status code: %d (%d) with error message %v", resp.StatusCode, body.Data.Code, body.Errors)
	}
}

// VerifyTransaction will verify a previously made transaction and report errors if there was a problem with it
func (zarinpal Zarinpal) VerifyTransaction(ctx context.Context, reqBody TransactionVerificationRequest) (TransactionVerificationResult, error) {
	// Create the request
	payload, _ := json.Marshal(reqBody)
	req, _ := http.NewRequestWithContext(ctx, "POST", "https://api.zarinpal.com/pg/v4/payment/verify.json", bytes.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	// Send the request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return TransactionVerificationResult{}, errors.Wrap(err, "cannot send request")
	}
	// Parse body
	var body TransactionVerificationResult
	err = json.NewDecoder(resp.Body).Decode(&body)
	_ = resp.Body.Close()
	if err != nil {
		return TransactionVerificationResult{}, errors.Wrap(err, "cannot parse transaction body")
	}
	// Check status
	if resp.StatusCode/100 == 2 { // 2xx, ok and also the code in body
		if body.Data.Code == 101 {
			log.WithField("resp", body).Warn("double verification")
		}
		return body, nil
	} else { // fuckup
		return TransactionVerificationResult{}, errors.Errorf("not 2xx status code: %d (%d) with error message %v", resp.StatusCode, body.Data.Code, body.Errors)
	}
}
