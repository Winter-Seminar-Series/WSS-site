package util

import (
	"crypto/rand"
	"encoding/base64"
)

// RandomID generates a random ID based on 8 bytes in base 64
func RandomID() string {
	buffer := make([]byte, 8)
	_, _ = rand.Read(buffer)
	return base64.StdEncoding.EncodeToString(buffer)
}
