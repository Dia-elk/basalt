const SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  CNY: "¥",
  NGN: "₦",
  ZAR: "R",
};

/** Common currencies get their symbol; the rest (AED, SAR, KWD…) read better as the plain code anyway. */
export function currencySymbol(code: string): string {
  return SYMBOLS[code] ?? code;
}
