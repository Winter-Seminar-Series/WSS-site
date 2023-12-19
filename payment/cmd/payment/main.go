package main

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/go-faster/errors"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"wss-payment/api"
	db "wss-payment/internal/database"
)

func main() {
	// Create the data needed
	endpointApi := new(api.API)
	endpointApi.Database = setupDatabase()
	defer closeDatabase(endpointApi.Database)
	// Setup endpoints
	r := gin.New()
	r.Use(gin.Recovery())
	r.POST("/create")
	r.GET("/status")
	r.GET("/health", api.HealthCheck)
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
func setupDatabase() *gorm.DB {
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

// Closes a gorm database
func closeDatabase(database *gorm.DB) {
	if database, err := database.DB(); err == nil {
		_ = database.Close()
	}
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
	return listener
}
