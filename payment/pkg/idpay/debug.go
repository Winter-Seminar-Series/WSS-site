package idpay

import "os"

var debugMode = os.Getenv("IDPAY_DEBUG") == "TRUE"

func getSandboxHeader() string {
	if debugMode {
		return "1"
	} else {
		return "0"
	}
}
