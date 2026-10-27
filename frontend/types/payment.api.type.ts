export interface AddonLineRequest {
  addon: number;
  quantity: number;
}

export interface PriceRequest {
  plans: number[];
  /** Omitted when empty, so older backends keep accepting the body. */
  addons?: AddonLineRequest[];
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
