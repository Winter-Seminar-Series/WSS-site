package api

import (
	"github.com/gin-gonic/gin"
	"github.com/go-faster/errors"
	log "github.com/sirupsen/logrus"
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
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	logger := log.WithField("body", body)
	// Try to get the list of goods from database. This will fail if user has bought something
	// from its BuyingGoods before
	goods, err := api.Database.GetGoodsFromName(body.BuyingGoods)
	if err != nil {
		var goodError database.GoodNotFoundError
		if errors.As(err, &goodError) {
			logger.WithError(err).Warn("unknown good")
			c.JSON(http.StatusBadRequest, err.Error())
		} else {
			logger.WithError(err).Error("cannot query goods")
			c.JSON(http.StatusInternalServerError, err.Error())
		}
		return
	}
	// Now we try to insert it in database. This should probably succeed
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
		c.JSON(http.StatusInternalServerError, err.Error())
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
		c.JSON(http.StatusInternalServerError, err.Error())
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
