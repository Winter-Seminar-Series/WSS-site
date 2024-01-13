package api

import (
	"github.com/gin-gonic/gin"
	"github.com/go-faster/errors"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"net/http"
	"wss-payment/internal/database"
	"wss-payment/pkg/payment"
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
	logger.Trace("creating transaction")
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
	databasePayment := database.Payment{
		UserID:      body.UserID,
		ToPayAmount: body.ToPayAmount,
		Discount:    body.Discount,
		Description: body.Description,
		BoughtGoods: goods,
	}
	err = api.Database.InitiateTransaction(&databasePayment)
	if err != nil {
		logger.WithError(err).Error("cannot put the transaction in database")
		c.JSON(http.StatusInternalServerError, "cannot put the transaction in database: "+err.Error())
		return
	}
	logger = logger.WithField("orderID", databasePayment.OrderID)
	logger.Debug("created transaction in database")
	// Initiate the request in payment service
	paymentResult, err := api.PaymentService.CreateTransaction(c.Request.Context(), payment.TransactionCreationRequest{
		OrderID:     databasePayment.OrderID.String(),
		UsersPhone:  body.Phone,
		UsersMail:   body.Mail,
		Description: body.Description,
		Callback:    body.CallbackURL,
		Amount:      body.ToPayAmount,
	})
	if err != nil {
		logger.WithError(err).Error("cannot start idpay transaction")
		c.JSON(http.StatusInternalServerError, "cannot start idpay transaction: "+err.Error())
		// Mark the transaction in database as failed
		api.Database.MarkAsFailed(databasePayment.OrderID)
		return
	}
	logger = logger.WithField("result", paymentResult)
	// Save the ServiceOrderID
	err = api.Database.SaveServiceOrderID(&databasePayment, paymentResult.ServiceOrderID)
	if err != nil {
		logger.WithError(err).Error("cannot save save service order ID")
		c.JSON(http.StatusInternalServerError, "cannot save save service order ID: "+err.Error())
		// Mark the transaction in database as failed
		api.Database.MarkAsFailed(databasePayment.OrderID)
		return
	}
	// Now we return back the order ID and link and stuff to the other service
	c.JSON(http.StatusCreated, createTransactionResponse{
		OrderID:     databasePayment.OrderID,
		ID:          paymentResult.ServiceOrderID,
		RedirectURL: paymentResult.RedirectLink,
	})
	logger.Info("created transaction")
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
	logger.Trace("getting transaction")
	// Now get the transaction from database
	databasePayment := database.Payment{OrderID: orderUUID}
	err = api.Database.GetPayment(&databasePayment)
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
	if databasePayment.PaymentStatus == database.PaymentStatusInitiated {
		logger.Debug("verifying transaction")
		// Send the verification request
		result, err := api.PaymentService.VerifyTransaction(c.Request.Context(), payment.TransactionVerificationRequest{
			OrderID:        databasePayment.OrderID.String(),
			ServiceOrderID: databasePayment.ServiceOrderID.String,
			PaidAmount:     databasePayment.ToPayAmount,
		})
		if err != nil {
			logger.WithError(err).Error("cannot verify transaction")
			c.JSON(http.StatusInternalServerError, "cannot verify transaction: "+err.Error())
			return
		}
		logger.WithField("verification-result", result).Info("transaction verification complete")
		// Check the result and update database
		if result.PaymentOK {
			err = api.Database.MarkPaymentAsOK(&databasePayment, result.TrackID)
		} else {
			err = api.Database.MarkPaymentAsFailed(&databasePayment)
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
		OrderID:       databasePayment.OrderID,
		UserID:        databasePayment.UserID,
		ToPayAmount:   databasePayment.ToPayAmount,
		Discount:      databasePayment.Discount,
		Description:   databasePayment.Description,
		ID:            databasePayment.ServiceOrderID.String,
		TrackID:       databasePayment.TrackID.String,
		PaymentStatus: databasePayment.PaymentStatus,
		BoughtGoods:   make([]string, len(databasePayment.BoughtGoods)),
		CreatedAt:     databasePayment.CreatedAt,
		VerifiedAt:    databasePayment.VerifiedAt.Time,
	}
	for i := range databasePayment.BoughtGoods {
		result.BoughtGoods[i] = databasePayment.BoughtGoods[i].Name
	}
	c.JSON(http.StatusOK, result)
}
