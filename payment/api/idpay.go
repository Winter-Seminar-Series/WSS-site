package api

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
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
	var body database.Good
	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	err = api.Database.AddGood(&body)
	if err != nil {
		log.WithError(err).WithField("body", body).Error("cannot insert body in database")
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.Status(http.StatusCreated)
}
