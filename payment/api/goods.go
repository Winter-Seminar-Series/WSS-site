package api

import (
	"errors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"net/http"
	"wss-payment/internal/database"
)

// GetGoods gets all goods registered in database
func (api *API) GetGoods(c *gin.Context) {
	goods, err := api.Database.GetGoods()
	if err != nil {
		log.WithError(err).Error("cannot get goods")
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, goods)
}

// AddGood adds a good to server
func (api *API) AddGood(c *gin.Context) {
	// Parse body
	var body createGoodRequest
	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	logger := log.WithField("body", body)
	// Create it in database
	good := database.Good{
		Name:        body.Name,
		Price:       body.Price,
		Description: body.Description,
	}
	err = api.Database.AddGood(&good)
	if err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			logger.Warn("good already exists")
			c.JSON(http.StatusConflict, "good already exists")
		} else {
			logger.WithError(err).Error("cannot insert body in database")
			c.JSON(http.StatusInternalServerError, err.Error())
		}
		return
	}
	logger.Info("added good to database")
	// Report back to endpoint
	c.JSON(http.StatusCreated, creteGoodResponse{good.ID})
}
