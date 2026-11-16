import Link from "next/link";
import { categories, categoryHref } from "@/data/categories";
import { site } from "@/lib/config";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/shared/social-icons";

type FooterLink = { name: string; href: string; external?: boolean };

const shopLinks: FooterLink[] = categories.map(c => ({ name: c.name, href: categoryHref(c.id) }));
const accountLinks: FooterLink[] = [{ name: "Your orders", href: "/orders" }];

const socials = [
  { name: "TikTok", href: site.tiktok, icon: <TikTokIcon className="size-[18px]" /> },
  { name: "Instagram", href: undefined, icon: <InstagramIcon className="size-[18px]" /> },
  { name: "Facebook", href: undefined, icon: <FacebookIcon className="size-[18px]" /> },
];

function FooterColumn({ label, links }: { label: string; links: FooterLink[] }) {
  return (
    <nav aria-label={label}>
      <p className="text-xs font-medium text-ink">{label}</p>
      <ul role="list" className="mt-3.5 space-y-1">
        {links.map(link => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="inline-flex py-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-soft">
      <div className="container-shell grid gap-10 py-12 sm:grid-cols-[1.5fr_1fr_1fr] lg:py-14">
        {/* Brand */}
        <div>
          <Link
            href="/"
            aria-label="Fashion Tap Boutik home"
            className="text-[15px] font-semibold tracking-[-0.01em] text-ink"
          >
            Fashion Tap Boutik
          </Link>
          <p className="mt-3 max-w-[28ch] text-sm leading-6 text-ink-soft">
            Good pieces, made for your everyday. Curated in Accra.
          </p>
          <div className="mt-5 flex items-center gap-1">
            {socials.map(social =>
              social.href ? (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Fashion Tap Boutik on ${social.name}`}
                  className="flex size-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white hover:text-ink"
                >
                  {social.icon}
                </a>
              ) : (
                <span
                  key={social.name}
                  title={`${social.name} — coming soon`}
                  aria-label={`${social.name} (coming soon)`}
                  className="flex size-9 items-center justify-center rounded-full text-ink-faint/70"
                >
                  {social.icon}
                </span>
              )
            )}
          </div>
        </div>

        <FooterColumn label="Shop" links={shopLinks} />
        <FooterColumn label="Account" links={accountLinks} />
      </div>

      <div className="container-shell border-t border-line py-6">
        <p className="text-xs text-ink-faint">© {new Date().getFullYear()} Fashion Tap Boutik · Accra, Ghana</p>
      </div>
    </footer>
  );
}
