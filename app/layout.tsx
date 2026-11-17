import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { CartHydrator } from "@/components/shared/cart-hydrator";
import { Toaster } from "@/components/ui/sonner";
import { editorial } from "@/data/categories";

// Closest open face to Beats' Neuzeit Grotesk: geometric grotesk, calm at regular weight.
const sans = Hanken_Grotesk({ variable: "--font-sans-face", subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fashiontapboutik.com"),
  title: {
    default: "Fashion Tap Boutik · Accra",
    template: "%s · Fashion Tap Boutik",
  },
  description:
    "Clothes, T-shirts, shoes, bags, purses and clutches from Fashion Tap Boutik in Accra. Delivered nationwide across Ghana. Pay with Mobile Money or card.",
  openGraph: {
    title: "Fashion Tap Boutik",
    description: "Luxury pieces, delivered across Ghana.",
    siteName: "Fashion Tap Boutik",
    locale: "en_GH",
    type: "website",
    images: [{ url: editorial.og.src, width: 1400, height: 2100, alt: editorial.og.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Tap Boutik",
    description: "Luxury pieces, delivered across Ghana.",
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
    <html lang="en-GH" className={`${sans.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <CartHydrator />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
