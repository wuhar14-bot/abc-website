export type SupportedCurrency = "usd" | "hkd" | string;

export function formatMoney(amount: number | null, currency: SupportedCurrency = "usd") {
  if (amount === null || !Number.isFinite(amount)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatMinorMoney(amount: number | null, currency: SupportedCurrency = "usd") {
  return amount === null || !Number.isFinite(amount) ? "—" : formatMoney(amount / 100, currency);
}
