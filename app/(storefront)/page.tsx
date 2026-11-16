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
  imagePosition = "50% 50%",
}: {
  image: { src: string; alt: string };
  title: string;
  text: string;
  href: string;
  action: string;
  panel: string;
  reverse?: boolean;
  imagePosition?: string;
}) {
  return (
    <section className="grid md:grid-cols-2" style={{ backgroundColor: panel }}>
      <div className={`relative aspect-[4/5] sm:aspect-square md:aspect-auto md:min-h-[640px] ${reverse ? "md:order-2" : ""}`}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: imagePosition }} />
      </div>
      <div className="flex flex-col items-start justify-center px-6 py-14 text-white sm:px-12 md:py-20 lg:px-20">
        <h2 className="display text-[36px] sm:text-[44px] lg:text-[52px]">{title}</h2>
        <p className="mt-2 max-w-[30ch] text-[17px] leading-7 text-white/80 sm:text-[19px]">{text}</p>
        <Link href={href} className="btn btn-light mt-7">
          {action}
        </Link>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const all = await getProducts();
  const loved = all.filter(p => p.tags.includes("featured")).slice(0, 8);
  const newIn = all.filter(p => p.tags.includes("new")).slice(0, 8);
  const heels = all.filter(p => p.category === "shoes" && p.cutout).slice(0, 8);

  return (
    <>
      {/* Hero, Beats-style: one studio shoot. A close portrait on phones, three frames side by side on wide screens. */}
      <section className="relative isolate h-[min(calc(100svh-96px),740px)] min-h-[540px] overflow-hidden bg-[#2a3a5e] lg:h-[min(calc(100svh-104px),720px)]">
        <div className="hero-media absolute inset-0 -z-10">
          <Image
            src={editorial.hero.src}
            alt={editorial.hero.alt}
            fill
            preload
            quality={85}
            sizes="(max-width: 1024px) 100vw, 1px"
            className="object-cover object-[42%_22%] lg:hidden"
          />
          <div className="hidden h-full grid-cols-[1fr_1.12fr_1fr] lg:grid">
            {editorial.heroTriptych.map((img, i) => (
              <div key={img.src} className="relative h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="eager"
                  quality={85}
                  sizes="38vw"
                  className={i === 0 ? "object-cover object-[30%_40%]" : i === 1 ? "object-cover object-[45%_25%]" : "object-cover object-[60%_30%]"}
                />
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 via-black/10 to-transparent lg:bg-gradient-to-t lg:from-black/35 lg:via-transparent" />
        <div className="hero-copy container-shell flex h-full flex-col items-center justify-end pb-11 text-center text-white sm:pb-14 lg:pb-16">
          <h1 className="display text-[44px] sm:text-[56px] lg:text-[64px]">Made to be noticed.</h1>
          <p className="mt-2 text-[17px] leading-6 text-white/90 sm:text-[20px] sm:leading-7">Luxury fashion, delivered across Ghana.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn btn-light">Shop now</Link>
            <Link href="/shop?category=new" className="btn btn-ghost-light">New in</Link>
          </div>
        </div>
      </section>

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
        text="Structured totes, soft hobos and evening handbags."
        href="/shop?category=bags"
        action="Shop bags"
        panel="#3b2416"
        imagePosition="50% 35%"
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

      <FeatureBanner
        image={editorial.jewellery}
        title="Watches & fine jewellery."
        text="Moonphase dials, two-tone bracelets and solitaire pendants."
        href="/shop?category=accessories"
        action="Shop watches"
        panel="#1c2436"
        reverse
      />

      {/* Heels */}
      <section className="bg-mist py-14 sm:py-20">
        <div className="container-shell">
          <SectionHeading title="Heels for every entrance" href="/shop?category=shoes" action="Shop shoes" />
          <ProductRail products={heels} />
        </div>
      </section>

      <FeatureBanner
        image={editorial.fragrance}
        title="Signature scents."
        text="Sculpted glass, soft florals, a trail people remember."
        href="/shop?category=beauty"
        action="Shop beauty"
        panel="#0d0d0d"
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
