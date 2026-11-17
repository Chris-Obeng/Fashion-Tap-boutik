import Image from "next/image";
import Link from "next/link";
import { CreditCard, MessageCircle, Truck } from "lucide-react";
import { categories, categoryHref, editorial } from "@/data/categories";
import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/shared/product-card";
import { ProductRail } from "@/components/shared/product-rail";
import { ProductThumb } from "@/components/shared/product-thumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { TikTokIcon } from "@/components/shared/social-icons";
import { Hero } from "@/components/home/hero";
import { site, whatsappHref } from "@/lib/config";

const services = [
  { icon: Truck, title: "Delivery nationwide", text: "Same or next day in Accra, 2–4 days across Ghana." },
  { icon: CreditCard, title: "Mobile Money or card", text: "Secure checkout by Paystack." },
  { icon: MessageCircle, title: "Help on WhatsApp", text: "Sizing, styling, anything.", href: whatsappHref() },
];

function FeatureBanner({
  image,
  title,
  text,
  href,
  action,
  panel,
  reverse = false,
  external = false,
  imagePosition = "50% 50%",
}: {
  /** studio: a cutout render, contained on its tint instead of filling the frame. */
  image: { src: string; alt: string; tint?: string; studio?: boolean };
  title: string;
  text: string;
  href: string;
  action: string;
  panel: string;
  reverse?: boolean;
  /** Opens in a new tab (e.g. a WhatsApp chat) instead of navigating in the store. */
  external?: boolean;
  imagePosition?: string;
}) {
  return (
    <section className="grid md:grid-cols-2" style={{ backgroundColor: panel }}>
      <div
        className={`relative aspect-[4/5] sm:aspect-square md:aspect-auto md:min-h-[640px] ${image.studio ? "tint-media" : ""} ${reverse ? "md:order-2" : ""}`}
        style={image.studio ? ({ "--tint": image.tint } as React.CSSProperties) : undefined}
      >
        {image.studio ? (
          <Image src={image.src} alt={image.alt} data-studio="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-[12%]" />
        ) : (
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: imagePosition }} />
        )}
      </div>
      <div className="flex flex-col items-start justify-center px-6 py-14 text-white sm:px-12 md:py-20 lg:px-20">
        <h2 className="display text-[36px] sm:text-[44px] lg:text-[52px]">{title}</h2>
        <p className="mt-2 max-w-[30ch] text-[17px] leading-7 text-white/80 sm:text-[19px]">{text}</p>
        {external ? (
          <a href={href} target="_blank" rel="noreferrer" className="btn btn-light mt-7">
            {action}
          </a>
        ) : (
          <Link href={href} className="btn btn-light mt-7">
            {action}
          </Link>
        )}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const all = await getProducts();
  const loved = all.filter(p => p.tags.includes("featured")).slice(0, 8);
  const newIn = all.filter(p => p.tags.includes("new")).slice(0, 8);
  const heels = all.filter(p => p.category === "shoes" && p.cutout).slice(0, 8);
  // Best sellers in store: alternate men's and women's tees, polos and shirts so both show early in the rail.
  const menTees = all.filter(p => p.tags.includes("tee") && p.category === "men");
  const womenTees = all.filter(p => p.tags.includes("tee") && p.category === "women");
  const tees = Array.from({ length: Math.max(menTees.length, womenTees.length) }, (_, i) => [menTees[i], womenTees[i]])
    .flat()
    .filter((p): p is (typeof all)[number] => Boolean(p))
    .slice(0, 12);

  return (
    <>
      <Hero mobile={editorial.heroMobile} slides={editorial.heroSlides} />

      {/* Category row */}
      <nav aria-label="Shop by category" className="container-shell pt-8 sm:pt-12">
        <ul role="list" className="hide-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:justify-center lg:gap-4 lg:px-0">
          {categories.map(c => (
            <li key={c.id} className="shrink-0 snap-start">
              <Link href={categoryHref(c.id)} className="press group flex w-[92px] flex-col items-center gap-2.5 sm:w-[118px] lg:w-[146px]">
                <ProductThumb src={c.image} tint={c.tint} cutout={c.cutout} sizes="146px" className="media-zoom aspect-square w-full rounded-[24px]" />
                <span className="text-center text-[13px] font-medium leading-4 text-ink sm:text-[14px]">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Knit polos and shirts: the store’s best sellers */}
      <section className="container-shell pt-14 sm:pt-20">
        <SectionHeading title="Knit polos & shirts" href="/shop?category=tees" action="Shop all" />
        <ProductRail products={tees} />
      </section>

      {/* Most loved */}
      <section className="mt-12 bg-mist py-14 sm:mt-16 sm:py-20">
        <div className="container-shell">
          <SectionHeading title="Most loved" href="/shop" action="Shop all" />
          <ProductRail products={loved} />
        </div>
      </section>

      <FeatureBanner
        image={editorial.bags}
        title="The bag edit."
        text="Structured totes, mini purses and crystal evening clutches."
        href="/shop?category=bags"
        action="Shop bags"
        panel="#3b2416"
      />

      {/* New in */}
      <section className="container-shell py-14 sm:py-20">
        <SectionHeading title="New in" href="/shop?category=new" action="See all" />
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-12">
          {newIn.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Heels */}
      <section className="bg-mist py-14 sm:py-20">
        <div className="container-shell">
          <SectionHeading title="Heels for every entrance" href="/shop?category=shoes" action="Shop shoes" />
          <ProductRail products={heels} />
        </div>
      </section>

      {/* Gift boxes: any piece, packed and ribbon-tied. Ordered on WhatsApp. */}
      <FeatureBanner
        image={editorial.gift}
        title="Gift boxes."
        text="Choose any piece and we’ll pack it in a ribbon-tied box, ready to give."
        href={whatsappHref("Hi Fashion Tap Boutik, I’d like to order a gift box.")}
        external
        action="Order a gift box"
        panel="#6b0f2a"
        imagePosition="50% 40%"
      />

      {/* TikTok: the store's real community */}
      <section className="container-shell pt-14 sm:pt-20">
        <div className="flex flex-col items-center gap-5 rounded-[32px] bg-brand-soft px-6 py-12 text-center sm:py-14">
          <span className="flex size-14 items-center justify-center rounded-full bg-ink text-white">
            <TikTokIcon className="size-6" />
          </span>
          <div>
            <h2 className="display text-[30px] text-ink sm:text-[40px]">54K follow us on TikTok</h2>
            <p className="mt-2 text-[16px] text-ink-soft sm:text-[18px]">New arrivals, try-ons and restocks, first.</p>
          </div>
          <a href={site.tiktok} target="_blank" rel="noreferrer" className="btn btn-primary">
            Follow {site.tiktokHandle}
          </a>
        </div>
      </section>

      {/* Service strip */}
      <section aria-label="Shopping with us" className="container-shell py-14 sm:py-20">
        <ul role="list" className="grid gap-6 sm:grid-cols-3">
          {services.map(({ icon: Icon, title, text, href }) => {
            const body = (
              <>
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-mist">
                  <Icon className="size-6 stroke-[1.6] text-ink" aria-hidden />
                </span>
                <span className="block">
                  <span className="block text-[17px] font-semibold text-ink">{title}</span>
                  <span className="mt-0.5 block text-[15px] text-ink-soft">{text}</span>
                </span>
              </>
            );
            return (
              <li key={title} className="flex items-center gap-4 sm:flex-col sm:text-center">
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="press flex items-center gap-4 sm:flex-col">{body}</a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
