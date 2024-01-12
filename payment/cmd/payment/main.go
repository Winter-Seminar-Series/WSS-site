package main

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/go-faster/errors"
	log "github.com/sirupsen/logrus"
	"net"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"wss-payment/api"
	db "wss-payment/internal/database"
	"wss-payment/pkg/idpay"
	"wss-payment/pkg/zarinpal"
)

func main() {
	// Create the data needed
	endpointApi := new(api.API)
	endpointApi.Database = setupDatabase()
	endpointApi.PaymentService = getZarinpal()
	defer endpointApi.Database.Close()
	// Setup endpoints
	r := gin.New()
	r.Use(gin.Recovery())
	r.GET("/health", api.HealthCheck)
	r.POST("/transaction", endpointApi.CreateTransaction)
	r.GET("/transaction", endpointApi.GetTransaction)
	// Listen
	srv := &http.Server{
		Handler: r,
	}
	go func() {
		if err := srv.Serve(getListener()); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("listen: %s", err)
		}
	}()
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")
	_ = srv.Shutdown(context.Background())
}

// Setup the database according to the DATABASE_URL environment variable
func setupDatabase() db.PaymentDatabase {
	// Check DB url
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("please set DATABASE_URL environment variable")
	}
	// Get the database url and connect to it
	database, err := db.NewPostgres(dbURL)
	if err != nil {
		log.Fatalf("cannot connect to database: %s\n", err)
	}
	return database
}

// getListener will start a listener based on environment variables
func getListener() net.Listener {
	// Get protocol
	protocol := "tcp"
	if envProtocol := os.Getenv("LISTEN_PROTOCOL"); envProtocol != "" {
		protocol = envProtocol
	}
	// Listen
	listener, err := net.Listen(protocol, os.Getenv("LISTEN_ADDRESS"))
	if err != nil {
		log.Fatalf("cannot listen: %s", err)
	}
	log.Debug("Listening on", listener.Addr())
	return listener
}

// getIDPay gets ID pay credentials from env variables
func getIDPay() idpay.PaymentAdaptor {
	apiKey := os.Getenv("IDPAY_APIKEY")
	if apiKey == "" {
		log.Fatal("please set IDPAY_APIKEY environment variable")
	}
	sandbox, _ := strconv.ParseBool(os.Getenv("IDPAY_SANDBOX"))
	if sandbox {
		log.Warn("IDPay sandbox mode activated")
	}
	return idpay.NewPaymentAdaptor(apiKey, sandbox)
}

// getZarinpal gets Zarinpal credentials from env variables
func getZarinpal() zarinpal.PaymentAdaptor {
	merchantID := os.Getenv("ZARINPAL_MERCHANT_ID")
	if merchantID == "" {
		log.Fatal("please set ZARINPAL_MERCHANT_ID environment variable")
	}
	return zarinpal.NewPaymentAdaptor(merchantID)
}
