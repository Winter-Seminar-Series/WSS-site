'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

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
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function useCheckout() {
  return useMutation({
    mutationFn: async (order: Order) => {
      const result = await checkoutAction(order);
      if (!result.ok) throw new Error(result.error);
      // A full navigation also handles external gateways and refreshes free-order registrations.
      window.location.assign(result.data.redirectUrl);
    },
  });
}
