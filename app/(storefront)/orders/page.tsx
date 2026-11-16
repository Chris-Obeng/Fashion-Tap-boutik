import type { Metadata } from "next";
import { OrdersList } from "@/components/orders/orders-list";

export const metadata: Metadata = {
  title: "Your orders",
  robots: { index: false, follow: false },
};

export default function OrdersPage() {
  return (
    <div className="container-shell flex min-h-[60vh] flex-1 flex-col pt-10 sm:pt-16">
      <h1 className="display text-[32px] text-ink sm:text-[40px]">Your orders</h1>
      <OrdersList />
    </div>
  );
}
