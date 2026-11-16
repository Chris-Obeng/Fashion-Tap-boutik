export const site = {
  name: "Fashion Tap Boutik",
  tiktok: "https://www.tiktok.com/@fashiontapboutik",
  // Configure a real international-format number (digits only) to enable WhatsApp.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
};
// Mock fees, in pesewas. Confirm real delivery coverage before launch.
export const deliveryAreas = [
  { name: "Osu", fee: 2500 }, { name: "Labone", fee: 2500 },
  { name: "Cantonments", fee: 3000 }, { name: "East Legon", fee: 3000 },
  { name: "Airport Residential", fee: 3000 }, { name: "Dzorwulu", fee: 3500 },
  { name: "Achimota", fee: 4000 }, { name: "Spintex", fee: 4000 },
  { name: "Adenta", fee: 4500 }, { name: "Tema", fee: 5000 },
] as const;
