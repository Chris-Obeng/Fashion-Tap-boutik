export type CategoryId = "women" | "men" | "shoes" | "accessories" | "beauty";
export type ProductColor = { name: string; hex: string };
export type Product = {
  id: string; slug: string; name: string; price: number; compareAtPrice?: number;
  description: string; story: string; images: string[];
  /** Soft colour field the studio shot sits on (cards, gallery). */
  tint: string;
  category: CategoryId;
  colors: ProductColor[]; sizes: { name: string; stock: number }[];
  tags: ("new" | "featured")[]; details: string[];
};
// All amounts are integer pesewas (100 pesewas = GH₵1).
export type CartItem = {
  key: string; productId: string; slug: string; name: string; image: string;
  /** Optional so bags saved before tints existed still render. */
  tint?: string;
  price: number; color: string; size: string; quantity: number; maxStock: number;
};
export type Order = {
  id: string; /** Epoch ms, set when the order is saved. */
  createdAt?: number;
  items: CartItem[]; subtotal: number; deliveryFee: number; total: number;
  customer: { name: string; phone: string; email?: string };
  delivery: { method: "delivery" | "pickup"; address?: string; area?: string; notes?: string };
};
// Minimal product shape for client-side search over the catalog.
export type SearchItem = {
  slug: string; name: string; price: number; category: string; image: string; tint: string; soldOut: boolean;
};
