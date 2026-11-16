const currency = new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", minimumFractionDigits: 0, maximumFractionDigits: 2 });
export function formatPrice(pesewas: number) { return currency.format(pesewas / 100).replace(/GHS\s*/, "GH₵ "); }
