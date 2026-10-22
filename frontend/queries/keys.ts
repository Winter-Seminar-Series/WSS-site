export const qk = {
  quote: (plans: number[], discountCode: string) => ['quote', [...plans].sort((a, b) => a - b), discountCode] as const,
};
