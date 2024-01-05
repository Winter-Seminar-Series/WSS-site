package idpay

func (idpay IDPay) getSandboxHeader() string {
	if idpay.sandboxed {
		return "1"
	} else {
		return "0"
	}
}
