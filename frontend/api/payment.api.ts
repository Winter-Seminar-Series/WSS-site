import { httpGet, httpPost } from '@/services/http';
import type {
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

function paymentBody(plans: number[], discountCode: string): PriceRequest {
  return discountCode ? { plans, discount_code: discountCode } : { plans };
}

export async function getPrice(plans: number[], discountCode: string): Promise<Price> {
  const body = { ...paymentBody(plans, discountCode), total_price: 0, calculated_price: 0 };
  const price = await httpPost<PriceResponse>('/payment/price/', body, { auth: true });
  return { total: price.total_price / RIAL_PER_TOMAN, payable: price.calculated_price / RIAL_PER_TOMAN };
}

/** Returns the payment gateway URL (or the dashboard, when the order is free). */
export async function createPayment(plans: number[], discountCode: string): Promise<string> {
  const { redirect_url } = await httpPost<CreatePaymentResponse>('/payment/create/', paymentBody(plans, discountCode), {
    auth: true,
  });
  return redirect_url;
}

export function verifyPayment(paymentId: number): Promise<VerifyPaymentResponse> {
  return httpGet<VerifyPaymentResponse>(`/payment/verify/${paymentId}/`, { auth: true });
}
