import Link from "next/link";
import { Phone } from "lucide-react";
import { categories, categoryHref } from "@/data/categories";
import { site, whatsappHref } from "@/lib/config";
import { Logo } from "@/components/shared/logo";
import { TikTokIcon, WhatsAppIcon } from "@/components/shared/social-icons";

const shopLinks = [{ name: "Shop everything", href: "/shop" }, ...categories.map(c => ({ name: c.name, href: categoryHref(c.id) }))];

const socials = [
  { name: "TikTok", label: site.tiktokHandle, href: site.tiktok, icon: <TikTokIcon className="size-[19px]" /> },
  { name: "WhatsApp", label: "Chat with us", href: whatsappHref(), icon: <WhatsAppIcon className="size-[21px]" /> },
  { name: "Call", label: site.phoneDisplay, href: site.phoneHref, icon: <Phone className="size-[19px]" /> },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="container-shell pb-10 pt-14 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo light className="h-[64px]" />
            <p className="mt-4 max-w-[30ch] text-[15px] leading-6 text-white/65">
              Quality shoes, bags, clothes, purses and watches. From Accra to anywhere in Ghana.
            </p>
            <ul role="list" className="mt-7 flex gap-3">
              {socials.map(s => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target={s.name === "Call" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={`${s.name}: ${s.label}`}
                    className="press flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-ink"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Shop">
            <p className="text-[13px] font-semibold text-white/50">Shop</p>
            <ul role="list" className="mt-3 grid grid-cols-2 gap-x-6 lg:grid-cols-1">
              {shopLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="inline-flex py-2 text-[15px] text-white/85 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[13px] font-semibold text-white/50">Help</p>
            <ul role="list" className="mt-3">
              <li>
                <Link href="/orders" className="inline-flex py-2 text-[15px] text-white/85 transition-colors hover:text-white">
                  Your orders
                </Link>
              </li>
              {socials.map(s => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target={s.name === "Call" ? undefined : "_blank"}
                    rel="noreferrer"
                    className="inline-flex py-2 text-[15px] text-white/85 transition-colors hover:text-white"
                  >
                    {s.name === "TikTok" ? `TikTok ${s.label}` : s.name === "Call" ? `Call ${s.label}` : `WhatsApp: ${s.label.toLowerCase()}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Fashion Tap Boutik · Accra, Ghana</p>
          <p>Delivery nationwide · Mobile Money &amp; card</p>
        </div>
      </div>
    </footer>
  );
}
