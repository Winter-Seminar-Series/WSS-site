'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createPayment, getPrice } from '@/api/payment.api';
import type { Order, Price } from '@/api/payment.api';
import { toLatinDigits } from '@/lib/digits';
import { errorMessage, firstIssue } from '@/lib/form';
import { isHttpError } from '@/services/http';
import type { ActionResult } from '@/types/participant.type';

const orderSchema = z
  .object({
    plans: z.array(z.number().int().positive()),
    addons: z.array(z.object({ addonId: z.number().int().positive(), quantity: z.number().int().positive() })),
    discountCode: z.string().trim().transform(toLatinDigits),
  })
  .refine((order) => order.plans.length > 0 || order.addons.length > 0, { message: 'Choose a plan first.' });

export interface Quote {
  price: Price;
  discountApplied: boolean;
  discountInvalid: boolean;
}

/** Called by TanStack Query whenever the selection or discount code changes. */
export async function quoteAction(order: Order): Promise<ActionResult<Quote>> {
  const parsed = orderSchema.safeParse(order);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  try {
    const price = await getPrice(parsed.data);
    return { ok: true, data: { price, discountApplied: Boolean(parsed.data.discountCode), discountInvalid: false } };
  } catch (error) {
    // An unknown code is a validation error on `discount_code`: price the order without it and say so.
    if (parsed.data.discountCode && isHttpError(error, 400) && error.code === 'invalid') {
      const price = await getPrice({ ...parsed.data, discountCode: '' });
      return { ok: true, data: { price, discountApplied: false, discountInvalid: true } };
    }
    return { ok: false, error: errorMessage(error) };
  }
}

export async function checkoutAction(order: Order): Promise<ActionResult> {
  const parsed = orderSchema.safeParse(order);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  let redirectUrl: string;
  try {
    redirectUrl = await createPayment(parsed.data);
  } catch (error) {
    return { ok: false, error: errorMessage(error) };
  }
  redirect(redirectUrl);
}
