import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
export const metadata: Metadata = { title: "Checkout", description: "Complete your Fashion Tap Boutik order with delivery in Accra or pickup.", robots: { index: false, follow: false } };
export default function CheckoutPage() {
  return <CheckoutForm />;
}
