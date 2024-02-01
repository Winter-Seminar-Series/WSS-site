package zarinpal

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/go-faster/errors"
	log "github.com/sirupsen/logrus"
	"io"
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
	bodyBytes, _ := io.ReadAll(resp.Body)
	logger := log.WithField("status", resp.Status).WithField("response", string(bodyBytes)).WithField("request", reqBody)
	logger.Trace("got creation result")
	err = json.Unmarshal(bodyBytes, &body)
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
	bodyBytes, _ := io.ReadAll(resp.Body)
	logger := log.WithField("status", resp.Status).WithField("response", string(bodyBytes)).WithField("request", reqBody)
	logger.Trace("got verification result")
	// Tof sag emam zamani
	var okBody TransactionVerificationResultOk
	var errorBody TransactionVerificationResultError
	if err = json.Unmarshal(bodyBytes, &okBody); err == nil {
		// Nice! Things are good!
		if okBody.Data.Code == 101 {
			logger.Warn("double verification")
		}
		return TransactionVerificationResult{
			Code:    okBody.Data.Code,
			Message: okBody.Data.Message,
			RefId:   okBody.Data.RefId,
		}, nil
	} else if err = json.Unmarshal(bodyBytes, &errorBody); err == nil {
		// Something went south with the payment...
		if errorBody.Errors.Code == -51 { // Session is not valid, session is not active paid try.
			// This one is either canceled, timed out, or active payment.
			// Also, fuck active payments.
			return TransactionVerificationResult{
				Message: errorBody.Errors.Message,
				Code:    errorBody.Errors.Code,
			}, nil
		}
		// This on is actually a fuckup
		return TransactionVerificationResult{}, errors.Errorf("nok: status %d (HTTP %d) with error message %s and validations of %v", errorBody.Errors.Code, resp.StatusCode, errorBody.Errors.Message, errorBody.Errors.Validations)
	} else {
		// RIDEMAN KHEILI BOZORG
		logger.Error("cannot parse zarinpal verification body")
		return TransactionVerificationResult{}, errors.New("cannot parse zarinpal verification body")
	}
}
