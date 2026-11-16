import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartHydrator } from "@/components/shared/cart-hydrator";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

const HERO_IMAGE =
  "https://images.pexels.com/photos/17533400/pexels-photo-17533400.jpeg?auto=compress&cs=tinysrgb&w=1200";

export const metadata: Metadata = {
  metadataBase: new URL("https://fashiontapboutik.com"),
  title: {
    default: "Fashion Tap Boutik — Considered style, made for Accra",
    template: "%s · Fashion Tap Boutik",
  },
  description:
    "Thoughtfully curated women's, men's and accessories from Accra. Delivery across Accra, easy returns, secure payment.",
  openGraph: {
    title: "Fashion Tap Boutik",
    description: "Considered style, made for Accra.",
    siteName: "Fashion Tap Boutik",
    locale: "en_GH",
    type: "website",
    images: [{ url: HERO_IMAGE, width: 1200, height: 630, alt: "Fashion Tap Boutik" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Tap Boutik",
    description: "Considered style, made for Accra.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  colorScheme: "light",
  themeColor: "#fbfbfd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" className={`${geistSans.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <CartHydrator />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
