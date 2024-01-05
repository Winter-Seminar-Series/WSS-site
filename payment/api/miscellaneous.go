package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// HealthCheck returns an empty json array
func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}
