const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233249446921").replace(/\D/g, "");

export const site = {
  name: "Fashion Tap Boutik",
  city: "Accra, Ghana",
  // Verified from the store's TikTok profile (bio links WhatsApp 0249446921).
  tiktok: "https://www.tiktok.com/@fashiontapboutik",
  tiktokHandle: "@fashiontapboutik",
  whatsapp: whatsappNumber,
  phoneDisplay: "024 944 6921",
  phoneHref: "tel:+233249446921",
};

/** WhatsApp deep link with an optional prefilled message. */
export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Mock fees, in pesewas. Confirm real delivery coverage before launch.
export const deliveryAreas = [
  { name: "Osu", fee: 2500 }, { name: "Labone", fee: 2500 },
  { name: "Cantonments", fee: 3000 }, { name: "East Legon", fee: 3000 },
  { name: "Airport Residential", fee: 3000 }, { name: "Dzorwulu", fee: 3500 },
  { name: "Achimota", fee: 4000 }, { name: "Spintex", fee: 4000 },
  { name: "Adenta", fee: 4500 }, { name: "Tema", fee: 5000 },
] as const;
