import { httpGet, httpPost } from '@/services/http';
import type {
  AddonLineRequest,
  CreatePaymentResponse,
  PriceRequest,
  PriceResponse,
  VerifyPaymentResponse,
} from '@/types/payment.api.type';

const RIAL_PER_TOMAN = 10;

export interface Price {
  /** Toman, before discount. */
  total: number;
  /** Toman, after discount. */
  payable: number;
}

/** Units of one add-on in an order. */
export interface AddonLine {
  addonId: number;
  quantity: number;
}

export interface Order {
  plans: number[];
  addons: AddonLine[];
  discountCode: string;
}

function paymentBody({ plans, addons, discountCode }: Order): PriceRequest {
  const body: PriceRequest = { plans };
  if (addons.length > 0) {
    body.addons = addons.map((line): AddonLineRequest => ({ addon: line.addonId, quantity: line.quantity }));
  }
  if (discountCode) body.discount_code = discountCode;
  return body;
}

export async function getPrice(order: Order): Promise<Price> {
  const body = { ...paymentBody(order), total_price: 0, calculated_price: 0 };
  const price = await httpPost<PriceResponse>('/payment/price/', body, { auth: true });
  return { total: price.total_price / RIAL_PER_TOMAN, payable: price.calculated_price / RIAL_PER_TOMAN };
}

/** Returns the payment gateway URL (or the dashboard, when the order is free). */
export async function createPayment(order: Order): Promise<string> {
  const { redirect_url } = await httpPost<CreatePaymentResponse>('/payment/create/', paymentBody(order), {
    auth: true,
  });
  return redirect_url;
}

export function verifyPayment(paymentId: number): Promise<VerifyPaymentResponse> {
  return httpGet<VerifyPaymentResponse>(`/payment/verify/${paymentId}/`, { auth: true });
}
