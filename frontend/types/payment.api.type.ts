export interface PriceRequest {
  plans: number[];
  discount_code?: string;
}

/** Rial. */
export interface PriceResponse {
  total_price: number;
  calculated_price: number;
}

export interface CreatePaymentResponse {
  redirect_url: string;
}

export interface VerifyPaymentResponse {
  id: number;
  order_id: string;
  paid: boolean;
}
