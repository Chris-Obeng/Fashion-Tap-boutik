const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233249446921").replace(/\D/g, "");

export const site = {
  name: "Fashion Tap Boutik",
  city: "Accra, Ghana",
  // Verified from the store's TikTok profile (bio links WhatsApp 0249446921).
  tiktok: "https://www.tiktok.com/@fashiontapboutik",
  tiktokHandle: "@fashiontapboutik",
  // Confirmed by the store owner.
  instagram: "https://www.instagram.com/fashion_tap_boutik/",
  instagramHandle: "@fashion_tap_boutik",
  facebook: "https://www.facebook.com/p/Fashion-Tap-Boutique-100065018320292/",
  whatsapp: whatsappNumber,
  phoneDisplay: "024 944 6921",
  phoneHref: "tel:+233249446921",
};

/** WhatsApp deep link with an optional prefilled message. */
export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/* ------------------------------------------------------------------------------------------------
 * Delivery, nationwide. All fees are placeholder pesewas: confirm real rider and courier rates
 * before launch. Greater Accra is priced by area (dispatch rider); every other region ships by
 * courier at a flat regional rate.
 * ---------------------------------------------------------------------------------------------- */
export const ACCRA = "Greater Accra";

export const accraAreas = [
  { name: "Osu", fee: 2500 }, { name: "Labone", fee: 2500 }, { name: "Cantonments", fee: 3000 },
  { name: "Airport Residential", fee: 3000 }, { name: "East Legon", fee: 3000 }, { name: "Dzorwulu", fee: 3500 },
  { name: "Achimota", fee: 4000 }, { name: "Spintex", fee: 4000 }, { name: "Madina", fee: 4000 },
  { name: "Adenta", fee: 4500 }, { name: "Kasoa", fee: 5000 }, { name: "Tema", fee: 5000 },
  { name: "Other area in Greater Accra", fee: 5000 },
] as const;

export const regions = [
  { name: ACCRA, fee: 0 },
  { name: "Ashanti", fee: 6000 }, { name: "Central", fee: 6000 }, { name: "Eastern", fee: 6000 },
  { name: "Western", fee: 7000 }, { name: "Volta", fee: 7000 }, { name: "Western North", fee: 8000 },
  { name: "Bono", fee: 8000 }, { name: "Bono East", fee: 8000 }, { name: "Ahafo", fee: 8000 },
  { name: "Oti", fee: 9000 }, { name: "Northern", fee: 9000 }, { name: "Savannah", fee: 10000 },
  { name: "North East", fee: 10000 }, { name: "Upper East", fee: 10000 }, { name: "Upper West", fee: 10000 },
] as const;

// Pickup address is shared on WhatsApp after the order; add it here once confirmed.
export const pickup = { label: "Pick up in store, Accra", eta: "Ready in 24 hours" };

/** Fee + ETA for a delivery address. Returns null until enough is known to quote. */
export function deliveryQuote(region?: string, area?: string): { fee: number; eta: string } | null {
  if (!region) return null;
  if (region === ACCRA) {
    const a = accraAreas.find(x => x.name === area);
    return a ? { fee: a.fee, eta: "Same or next day" } : null;
  }
  const r = regions.find(x => x.name === region);
  return r ? { fee: r.fee, eta: "2–4 working days" } : null;
}

/** Cheapest fee anywhere, for "from GH₵ x" copy. */
export const minDeliveryFee = Math.min(...accraAreas.map(a => a.fee));
