'use client';

import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import { checkoutAction, quoteAction } from '@/actions/registration.actions';
import type { Quote } from '@/actions/registration.actions';
import type { Order } from '@/api/payment.api';
import { qk } from '@/queries/keys';

export function useQuote(order: Order) {
  return useQuery({
    queryKey: qk.quote(order),
    queryFn: async (): Promise<Quote> => {
      const result = await quoteAction(order);
      if (!result.ok) throw new Error(result.error);
      return result.data;
    },
    enabled: order.plans.length > 0 || order.addons.length > 0,
    // Prices only change when an admin edits a plan; keep the last quote on screen while the next one loads.
    staleTime: 5 * 60_000,
    placeholderData: keepPreviousData,
  });
}

export function useCheckout() {
  return useMutation({
    mutationFn: async (order: Order) => {
      // On success the action redirects to the payment gateway and never resolves here.
      const result = await checkoutAction(order);
      if (!result.ok) throw new Error(result.error);
    },
  });
}
