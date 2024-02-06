export function convertDigitsToLatin(string: string) {
  return string.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
}
