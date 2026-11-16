"use client";
import { useSyncExternalStore } from "react";
import { useCart } from "@/store/cart";
const subscribe = (callback: () => void) => useCart.persist.onFinishHydration(callback);
const getSnapshot = () => useCart.persist.hasHydrated();
const getServerSnapshot = () => false;
export function useCartHydrated() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
