import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories, categoryHref, editorial } from "@/data/categories";
import { getProducts } from "@/lib/products";
import { buttonClass } from "@/lib/button-class";
import { ProductCard } from "@/components/shared/product-card";
import { ProductRail } from "@/components/shared/product-rail";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export default async function HomePage() {
  const all = await getProducts();
  const newIn = all.filter(p => p.tags.includes("new")).slice(0, 4);
  const favourites = all.filter(p => p.tags.includes("featured")).slice(0, 4);

  return (
    <>
      <section className="container-shell pt-10 sm:pt-16 lg:pt-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="display text-[44px] text-ink sm:text-[56px] lg:text-[64px]">The everyday edit.</h1>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-ink-soft sm:text-lg sm:leading-8">
              Considered essentials, curated in Accra — pieces that feel like you.
            </p>
            <div className="mt-7 flex items-center justify-center gap-7">
              <Link href="/shop" className={buttonClass({ className: "h-12 px-7 text-[15px]" })}>
                Shop now
              </Link>
              <Link
                href="/shop?category=new"
                className="inline-flex min-h-11 items-center gap-0.5 text-[15px] font-medium text-ink transition-opacity hover:opacity-70"
              >
                New in
                <ChevronRight className="size-4 text-ink-faint" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-soft sm:mt-14 sm:aspect-[16/9]">
            <Image
              src={editorial.hero}
              alt="Model wearing an everyday outfit from the Fashion Tap Boutik edit"
              fill
              preload
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-shell pt-16 sm:pt-24">
        <Reveal>
          <h2 className="display text-[28px] text-ink sm:text-[36px]">Shop by category</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {categories.map(category => (
              <Link
                key={category.id}
                href={categoryHref(category.id)}
                className="media-zoom group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-soft"
              >
                <Image
                  src={category.image}
                  alt={`Shop ${category.name}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                <span className="absolute bottom-4 left-4 text-lg font-semibold tracking-[-0.01em] text-white">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-shell pt-16 sm:pt-24">
        <Reveal>
          <SectionHeading title="New in" href="/shop?category=new" action="Shop new in" />
          <ProductRail products={newIn} />
        </Reveal>
      </section>

      <section className="container-shell py-16 sm:py-24">
        <Reveal>
          <SectionHeading title="Our favourites" href="/shop" action="Shop all" />
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-11">
            {favourites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
