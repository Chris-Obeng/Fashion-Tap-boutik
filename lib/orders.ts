import type { Order } from "@/types";

const ORDERS_KEY = "fashion-tap-orders";
const MAX_ORDERS = 20;
const EMPTY: Order[] = [];

const listeners = new Set<() => void>();
// Referentially-stable cache so useSyncExternalStore snapshots don't churn.
let cache: { raw: string | null; orders: Order[] } = { raw: null, orders: EMPTY };

/**
 * Client-side order history in localStorage — the guest-checkout equivalent of
 * an account. Swap for API calls when the backend exists.
 */
export function getOrders(): Order[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(ORDERS_KEY);
  if (cache.raw !== raw) {
    let orders: Order[] = [];
    try {
      const parsed = raw ? (JSON.parse(raw) as Order[]) : [];
      orders = Array.isArray(parsed) ? parsed : [];
    } catch {
      orders = [];
    }
    cache = { raw, orders };
  }
  return cache.orders;
}

export function getOrder(id: string): Order | undefined {
  return getOrders().find(o => o.id === id);
}

export function subscribeOrders(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function saveOrder(order: Order): void {
  const withDate: Order = { ...order, createdAt: order.createdAt ?? Date.now() };
  const orders = [withDate, ...getOrders().filter(o => o.id !== order.id)].slice(0, MAX_ORDERS);
  try {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    cache = { raw: null, orders: EMPTY }; // invalidate so the next read reparses
    listeners.forEach(l => l());
  } catch {
    // Storage full or unavailable — the order confirmation still renders
    // from the navigation state, so losing history here is acceptable.
  }
}

export function formatOrderDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
