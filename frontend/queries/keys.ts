import type { Order } from '@/api/payment.api';

export const qk = {
  quote: ({ plans, addons, discountCode }: Order) =>
    [
      'quote',
      [...plans].sort((a, b) => a - b),
      [...addons].sort((a, b) => a.addonId - b.addonId).map((line) => [line.addonId, line.quantity]),
      discountCode,
    ] as const,
};
