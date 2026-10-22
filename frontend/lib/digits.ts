const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

/** Persian/Arabic keyboards type their own digits; the API only accepts Latin ones. */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)));
}

const priceFormatter = new Intl.NumberFormat('en-US');

export function formatToman(amount: number): string {
  return `${priceFormatter.format(amount)} Toman`;
}
