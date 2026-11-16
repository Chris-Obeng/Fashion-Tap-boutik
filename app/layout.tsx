import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { CartHydrator } from "@/components/shared/cart-hydrator";
import { Toaster } from "@/components/ui/sonner";
import { editorial } from "@/data/categories";

const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fashiontapboutik.com"),
  title: {
    default: "Fashion Tap Boutik · Accra",
    template: "%s · Fashion Tap Boutik",
  },
  description:
    "Dresses, shoes, bags, jewellery and fragrance from Fashion Tap Boutik in Accra. Delivery across Accra, pay with Mobile Money or card.",
  openGraph: {
    title: "Fashion Tap Boutik",
    description: "Luxury pieces, delivered across Accra.",
    siteName: "Fashion Tap Boutik",
    locale: "en_GH",
    type: "website",
    images: [{ url: editorial.heroMobile, width: 1024, height: 1024, alt: "Fashion Tap Boutik" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Tap Boutik",
    description: "Luxury pieces, delivered across Accra.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" className={`${figtree.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <CartHydrator />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
