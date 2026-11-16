export type CategoryId = "women" | "men" | "shoes" | "bags" | "accessories" | "beauty";
export type ProductColor = { name: string; hex: string };
export type Product = {
  id: string; slug: string; name: string; price: number; compareAtPrice?: number;
  description: string; story: string; images: string[];
  /** True when every image is a cut-out render (transparent background), shown contained on the tint. */
  cutout: boolean;
  /** Soft colour field the product sits on (cards, gallery, thumbnails). */
  tint: string;
  category: CategoryId;
  colors: ProductColor[]; sizes: { name: string; stock: number }[];
  tags: ("new" | "featured")[]; details: string[];
};
// All amounts are integer pesewas (100 pesewas = GH₵1).
export type CartItem = {
  key: string; productId: string; slug: string; name: string; image: string;
  /** Optional so bags saved before these fields existed still render. */
  tint?: string; cutout?: boolean;
  price: number; color: string; size: string; quantity: number; maxStock: number;
};
export type DeliveryMethod = "delivery" | "pickup";
export type PaymentMethod = "momo" | "card";
export type Order = {
  id: string; /** Epoch ms, set when the order is saved. */
  createdAt?: number;
  items: CartItem[]; subtotal: number; deliveryFee: number; total: number;
  customer: { name: string; phone: string; email?: string };
  delivery: { method: DeliveryMethod; region?: string; city?: string; area?: string; address?: string; notes?: string; eta?: string };
  payment?: PaymentMethod;
};
// Minimal product shape for client-side search over the catalog.
export type SearchItem = {
  slug: string; name: string; price: number; category: string; categoryName: string; image: string; tint: string;
  cutout: boolean; soldOut: boolean; isNew: boolean; colors: string[]; keywords: string;
};
