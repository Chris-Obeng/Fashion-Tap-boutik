import type { Metadata } from "next";
import { OrderDetail } from "@/components/orders/order-detail";

export const metadata: Metadata = {
  title: "Order details",
  robots: { index: false, follow: false },
};

export default async function OrderDetailPage({
  params,
  searchParams,
}: PageProps<"/orders/[id]">) {
  const { id } = await params;
  const { placed } = await searchParams;
  return <OrderDetail id={id} placed={placed === "1"} />;
}
