package api

import (
	"github.com/gin-gonic/gin"
	"github.com/go-faster/errors"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"net/http"
	"wss-payment/internal/database"
	"wss-payment/pkg/idpay"
)

// CreateTransaction initiates a transaction for a user
func (api *API) CreateTransaction(c *gin.Context) {
	// First things first, parse the body
	var body createTransactionRequest
	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, "cannot parse body: "+err.Error())
		return
	}
	logger := log.WithField("body", body)
	// If buying goods is zero, something's up...
	if len(body.BuyingGoods) == 0 {
		logger.Warn("empty buying_goods")
		c.JSON(http.StatusBadRequest, "empty buying_goods")
		return
	}
	// Now we try to insert it in database. This should probably succeed
	goods := make([]database.Good, len(body.BuyingGoods))
	for i := range body.BuyingGoods {
		goods[i] = database.Good{Name: body.BuyingGoods[i]}
	}
	payment := database.Payment{
		UserID:      body.UserID,
		ToPayAmount: body.ToPayAmount,
		Discount:    body.Discount,
		Description: body.Description,
		BoughtGoods: goods,
	}
	err = api.Database.InitiateTransaction(&payment)
	if err != nil {
		logger.WithError(err).Error("cannot put the transaction in database")
		c.JSON(http.StatusInternalServerError, "cannot put the transaction in database: "+err.Error())
		return
	}
	// Initiate the request in idpay
	idpayResult, err := api.PaymentService.CreateTransaction(c.Request.Context(), idpay.TransactionCreationRequest{
		OrderID:     payment.OrderID.String(),
		Name:        body.Name,
		Phone:       body.Phone,
		Mail:        body.Mail,
		Description: body.Description,
		Callback:    body.CallbackURL,
		Amount:      body.ToPayAmount,
	})
	if err != nil {
		logger.WithError(err).Error("cannot start idpay transaction")
		c.JSON(http.StatusInternalServerError, "cannot start idpay transaction: "+err.Error())
		// Mark the transaction in database as failed
		api.Database.MarkAsFailed(payment.OrderID)
		return
	}
	// Now we return back the order ID and link and stuff to the other service
	c.JSON(http.StatusCreated, createTransactionResponse{
		OrderID:     payment.OrderID,
		ID:          idpayResult.ID,
		RedirectURL: idpayResult.Link,
	})
	return
}

// GetTransaction verifies a transaction if not already and then returns the transaction
// information to the requester
func (api *API) GetTransaction(c *gin.Context) {
	// At first parse the body
	var body getTransactionRequest
	err := c.Bind(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, "cannot parse body: "+err.Error())
		return
	}
	orderUUID, err := uuid.Parse(body.OrderID)
	if err != nil {
		c.JSON(http.StatusBadRequest, "invalid uuid")
		return
	}
	logger := log.WithField("OrderID", body.OrderID)
	// Now get the transaction from database
	payment := database.Payment{OrderID: orderUUID}
	err = api.Database.GetPayment(&payment)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			logger.Warn("payment not found")
			c.JSON(http.StatusBadRequest, "payment not found")
		} else {
			logger.WithError(err).Error("cannot get payment from database")
			c.JSON(http.StatusInternalServerError, "cannot parse body: "+err.Error())
		}
		return
	}
	// Check if it's verified and verify it
	if payment.PaymentStatus == database.PaymentStatusInitiated {
		// Send the verification request
		result, err := api.PaymentService.VerifyTransaction(c.Request.Context(), idpay.TransactionVerificationRequest{
			OrderID: payment.OrderID.String(),
			ID:      payment.ID.String,
		})
		if err != nil {
			logger.WithError(err).Error("cannot verify transaction")
			c.JSON(http.StatusInternalServerError, "cannot verify transaction: "+err.Error())
			return
		}
		// Check the result and update database
		if result.PaymentOK {
			err = api.Database.MarkPaymentAsOK(&payment, result.TrackID, result.PaymentTrackID)
		} else {
			err = api.Database.MarkPaymentAsFailed(&payment)
		}
		if err != nil {
			// NIGGA
			logger.WithField("result", result).WithError(err).Error("cannot write verified transaction result")
			c.JSON(http.StatusInternalServerError, "cannot write verified transaction result: "+err.Error())
			return
		}
	}
	// Return the converted struct
	result := getTransactionResponse{
		OrderID:        payment.OrderID,
		UserID:         payment.UserID,
		ToPayAmount:    payment.ToPayAmount,
		Discount:       payment.Discount,
		Description:    payment.Description,
		ID:             payment.ID.String,
		TrackID:        payment.TrackID.String,
		PaymentTrackID: payment.PaymentTrackID.String,
		PaymentStatus:  payment.PaymentStatus,
		BoughtGoods:    make([]string, len(payment.BoughtGoods)),
		CreatedAt:      payment.CreatedAt,
		VerifiedAt:     payment.VerifiedAt.Time,
	}
	for i := range payment.BoughtGoods {
		result.BoughtGoods[i] = payment.BoughtGoods[i].Name
	}
	c.JSON(http.StatusOK, result)
}
