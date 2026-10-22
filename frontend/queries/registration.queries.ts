'use client';

import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import { checkoutAction, quoteAction } from '@/actions/registration.actions';
import type { Quote } from '@/actions/registration.actions';
import { qk } from '@/queries/keys';

export function useQuote(plans: number[], discountCode: string) {
  return useQuery({
    queryKey: qk.quote(plans, discountCode),
    queryFn: async (): Promise<Quote> => {
      const result = await quoteAction(plans, discountCode);
      if (!result.ok) throw new Error(result.error);
      return result.data;
    },
    enabled: plans.length > 0,
    // Prices only change when an admin edits a plan; keep the last quote on screen while the next one loads.
    staleTime: 5 * 60_000,
    placeholderData: keepPreviousData,
  });
}

export function useCheckout() {
  return useMutation({
    mutationFn: async ({ plans, discountCode }: { plans: number[]; discountCode: string }) => {
      // On success the action redirects to the payment gateway and never resolves here.
      const result = await checkoutAction(plans, discountCode);
      if (!result.ok) throw new Error(result.error);
    },
  });
}
