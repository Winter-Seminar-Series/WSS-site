package zibal

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/go-faster/errors"
	log "github.com/sirupsen/logrus"
	"io"
	"net/http"
)

// Zibal client that can connect to their webserver and
type Zibal struct {
	merchant string
}

// NewZibal creates a Zibal client
func NewZibal(merchant string) Zibal {
	return Zibal{merchant}
}

// CreateTransaction will create a new transaction in ID pay and return its result (id and link)
func (zibal Zibal) CreateTransaction(ctx context.Context, reqBody TransactionCreationRequest) (TransactionCreationResult, error) {
	// Create the request
	payload, _ := json.Marshal(reqBody)
	req, _ := http.NewRequestWithContext(ctx, "POST", "https://gateway.zibal.ir/v1/request", bytes.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	// Send the request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return TransactionCreationResult{}, errors.Wrap(err, "cannot send request")
	}
	// Parse body
	var body TransactionCreationResult
	bodyBytes, _ := io.ReadAll(resp.Body)
	_ = resp.Body.Close()
	logger := log.WithField("status", resp.Status).WithField("response", string(bodyBytes)).WithField("request", reqBody)
	logger.Trace("got creation result")
	err = json.Unmarshal(bodyBytes, &body)
	if err != nil {
		return TransactionCreationResult{}, errors.Wrap(err, "cannot parse transaction body")
	}
	// Check status
	if resp.StatusCode/100 == 2 && body.Result == 100 { // 2xx, ok and also the code in body
		return body, nil
	} else { // fuckup
		return TransactionCreationResult{}, errors.Errorf("not 2xx status code: %d (%d) with error message %v", resp.StatusCode, body.Result, body.Message)
	}
}

// VerifyTransaction will verify a previously made transaction and report errors if there was a problem with it
func (zibal Zibal) VerifyTransaction(ctx context.Context, reqBody TransactionVerificationRequest) (TransactionVerificationResult, error) {
	// Create the request
	payload, _ := json.Marshal(reqBody)
	req, _ := http.NewRequestWithContext(ctx, "POST", "https://gateway.zibal.ir/v1/verify", bytes.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	// Send the request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return TransactionVerificationResult{}, errors.Wrap(err, "cannot send request")
	}
	// Parse body
	var body TransactionVerificationResult
	bodyBytes, _ := io.ReadAll(resp.Body)
	_ = resp.Body.Close()
	logger := log.WithField("status", resp.Status).WithField("response", string(bodyBytes)).WithField("request", reqBody)
	logger.Trace("got verification result")
	err = json.Unmarshal(bodyBytes, &body)
	if err != nil {
		return TransactionVerificationResult{}, errors.Wrap(err, "cannot parse verification body")
	}
	// Check status
	if resp.StatusCode/100 == 2 && !isHardError(body) { // 2xx, ok and also the code in body
		// This means the request parameters are correct. This does not mean that
		// the payment was successful!
		return body, nil
	} else { // fuckup
		return TransactionVerificationResult{}, errors.Errorf("not 2xx status code: %d (%d) with error message %v", resp.StatusCode, body.Result, body.Message)
	}
}

// If this function returns true, it means that there is a problem on either Zibal
// side or we have fucked up something real bad.
func isHardError(body TransactionVerificationResult) bool {
	return !(body.Result == 100 || body.Result == 201 || body.Result == 202)
}
