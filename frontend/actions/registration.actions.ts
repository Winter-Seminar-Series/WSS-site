'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createPayment, getPrice } from '@/api/payment.api';
import type { Price } from '@/api/payment.api';
import { toLatinDigits } from '@/lib/digits';
import { errorMessage, firstIssue } from '@/lib/form';
import { isHttpError } from '@/services/http';
import type { ActionResult } from '@/types/participant.type';

const orderSchema = z.object({
  plans: z.array(z.number().int().positive()).min(1, 'Choose a plan first.'),
  discountCode: z.string().trim().transform(toLatinDigits),
});

export interface Quote {
  price: Price;
  discountApplied: boolean;
  discountInvalid: boolean;
}

/** Called by TanStack Query whenever the selection or discount code changes. */
export async function quoteAction(plans: number[], discountCode: string): Promise<ActionResult<Quote>> {
  const parsed = orderSchema.safeParse({ plans, discountCode });
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  try {
    const price = await getPrice(parsed.data.plans, parsed.data.discountCode);
    return { ok: true, data: { price, discountApplied: Boolean(parsed.data.discountCode), discountInvalid: false } };
  } catch (error) {
    // An unknown code is a validation error on `discount_code`: price the order without it and say so.
    if (parsed.data.discountCode && isHttpError(error, 400) && error.code === 'invalid') {
      const price = await getPrice(parsed.data.plans, '');
      return { ok: true, data: { price, discountApplied: false, discountInvalid: true } };
    }
    return { ok: false, error: errorMessage(error) };
  }
}

export async function checkoutAction(plans: number[], discountCode: string): Promise<ActionResult> {
  const parsed = orderSchema.safeParse({ plans, discountCode });
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  let redirectUrl: string;
  try {
    redirectUrl = await createPayment(parsed.data.plans, parsed.data.discountCode);
  } catch (error) {
    return { ok: false, error: errorMessage(error) };
  }
  redirect(redirectUrl);
}
