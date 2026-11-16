"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

type CartState = {
  items: CartItem[];
  add: (product: Product, color: string, size: string, quantity: number) => boolean;
  remove: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
};
export const useCart = create<CartState>()(persist((set, get) => ({
  items: [],
  add: (product, color, size, quantity) => {
    const maxStock = product.sizes.find(s => s.name === size)?.stock ?? 0;
    if (!product.colors.some(c => c.name === color) || !Number.isInteger(quantity) || quantity < 1) return false;
    const key = `${product.id}:${color}:${size}`;
    const existing = get().items.find(i => i.key === key);
    if ((existing?.quantity ?? 0) + quantity > maxStock) return false;
    set(state => ({ items: existing ? state.items.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i) : [...state.items, { key, productId: product.id, slug: product.slug, name: product.name, image: product.images[0], tint: product.tint, price: product.price, color, size, quantity, maxStock }] }));
    return true;
  },
  remove: key => set(s => ({ items: s.items.filter(i => i.key !== key) })),
  updateQuantity: (key, quantity) => set(s => ({ items: s.items.map(i => i.key === key ? { ...i, quantity: Math.max(1, Math.min(i.maxStock, Math.floor(quantity) || 1)) } : i) })),
  clear: () => set({ items: [] }),
}), {
  name: "fashion-tap-bag",
  // v2: new catalogue. Bags saved against the old product ids are dropped.
  version: 2,
  migrate: () => ({ items: [] }) as unknown as CartState,
  skipHydration: true,
}));
export const cartSubtotal = (items: CartItem[]) => items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const cartCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.quantity, 0);
export const useBagUI = create<{ open: boolean; setOpen: (open: boolean) => void }>(set => ({ open: false, setOpen: open => set({ open }) }));
