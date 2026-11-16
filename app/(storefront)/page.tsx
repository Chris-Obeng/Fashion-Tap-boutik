import Image from "next/image";
import Link from "next/link";
import { CreditCard, MessageCircle, Truck } from "lucide-react";
import { categories, categoryHref, editorial } from "@/data/categories";
import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/shared/product-card";
import { ProductRail } from "@/components/shared/product-rail";
import { SectionHeading } from "@/components/shared/section-heading";
import { whatsappHref } from "@/lib/config";

const services = [
  { icon: Truck, title: "Delivery across Accra", text: "Usually within 1–2 days." },
  { icon: CreditCard, title: "Mobile Money or card", text: "Secure checkout by Paystack." },
  { icon: MessageCircle, title: "Help on WhatsApp", text: "Sizing, styling, anything.", href: whatsappHref() },
];

function FeatureBanner({
  image,
  alt,
  title,
  text,
  href,
  action,
  panel,
  reverse = false,
}: {
  image: string;
  alt: string;
  title: string;
  text: string;
  href: string;
  action: string;
  panel: string;
  reverse?: boolean;
}) {
  return (
    <section className="grid md:grid-cols-2" style={{ backgroundColor: panel }}>
      <div className={`relative aspect-square md:aspect-auto md:min-h-[600px] ${reverse ? "md:order-2" : ""}`}>
        <Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="flex flex-col items-start justify-center px-6 py-14 text-white sm:px-12 md:py-20 lg:px-20">
        <h2 className="display text-[40px] sm:text-[56px] lg:text-[64px]">{title}</h2>
        <p className="mt-3 max-w-[32ch] text-[17px] leading-7 text-white/75 sm:text-[19px]">{text}</p>
        <Link href={href} className="pill pill-light mt-8">
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

  return (
    <>
      {/* Hero: one scene on phones, a Beats-style triptych on wide screens. */}
      <section className="relative isolate h-[min(82svh,720px)] overflow-hidden bg-ink lg:h-[min(86svh,820px)]">
        <div className="hero-media absolute inset-0 -z-10">
          <Image
            src={editorial.heroMobile}
            alt="Model walking through the city in the Pleated Wrap Dress"
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 1px"
            className="object-cover object-[50%_35%] lg:hidden"
          />
          <div className="hidden h-full grid-cols-3 lg:grid">
            {editorial.heroTriptych.map((src, i) => (
              <div key={src} className="relative h-full">
                <Image
                  src={src}
                  alt={i === 1 ? "Model walking through the city in the Pleated Wrap Dress" : ""}
                  fill
                  loading="eager"
                  sizes="34vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/15 to-black/0" />
        <div className="hero-copy container-shell flex h-full flex-col items-center justify-end pb-12 text-center text-white sm:pb-16 lg:pb-20">
          <h1 className="display text-[52px] sm:text-[72px] lg:text-[96px]">The Luxe Edit</h1>
          <p className="mt-3 text-[17px] leading-6 text-white/85 sm:text-[20px] sm:leading-7">
            <span className="block">Dresses, shoes, bags and scent.</span>
            <span className="block">Delivered across Accra.</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="pill pill-light min-w-[140px]">
              Shop now
            </Link>
            <Link href="/shop?category=new" className="pill pill-ghost min-w-[140px]">
              New in
            </Link>
          </div>
        </div>
      </section>

      {/* Category row */}
      <nav aria-label="Shop by category" className="container-shell pt-8 sm:pt-12">
        <ul
          role="list"
          className="hide-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:justify-center lg:gap-5 lg:px-0"
        >
          {categories.map(c => (
            <li key={c.id} className="shrink-0 snap-start">
              <Link href={categoryHref(c.id)} className="press group flex w-[96px] flex-col items-center gap-2.5 sm:w-[120px] lg:w-[150px]">
                <span
                  className="tint-media media-zoom relative block aspect-square w-full overflow-hidden rounded-[24px]"
                  style={{ "--tint": c.tint } as React.CSSProperties}
                >
                  <Image src={c.image} alt="" data-studio fill sizes="150px" className="object-cover transition-transform duration-700 ease-[var(--ease-out)]" />
                </span>
                <span className="text-center text-[13px] font-semibold leading-4 text-ink sm:text-[14px]">{c.name}</span>
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
        image={editorial.jewellery}
        alt="Solitaire pendant in a navy velvet box on marble"
        title="Fine jewellery."
        text="Pendants made to be noticed, in silver or gold."
        href="/shop?category=accessories"
        action="Shop jewellery"
        panel="#1c2436"
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
        image={editorial.fragrance}
        alt="Rose Crystal Parfum bottle on black"
        title="Signature scents."
        text="Sculpted glass, soft florals, a trail people remember."
        href="/shop?category=beauty"
        action="Shop beauty"
        panel="#0d0d0d"
        reverse
      />

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
                  <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</span>
                  <span className="mt-0.5 block text-[15px] text-ink-soft">{text}</span>
                </span>
              </>
            );
            return (
              <li key={title} className="flex items-center gap-4 sm:flex-col sm:gap-4 sm:text-center">
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="press flex items-center gap-4 sm:flex-col">
                    {body}
                  </a>
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
