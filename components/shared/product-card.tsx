import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const soldOut = (p: Product) => p.sizes.every(s => s.stock === 0);

export function ProductCard({
  product,
  preload = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: {
  product: Product;
  preload?: boolean;
  sizes?: string;
}) {
  const isSoldOut = soldOut(product);
  const isNew = product.tags.includes("new");
  const href = `/product/${product.slug}`;
  const fit = product.cutout ? "object-contain p-[11%]" : "object-cover";
  return (
    <article className="group relative min-w-0">
      <div
        className="card-media tint-media relative aspect-[4/5] overflow-hidden rounded-[22px] transition-transform duration-200 ease-[var(--ease-out)] group-active:scale-[0.98]"
        style={{ "--tint": product.tint } as React.CSSProperties}
      >
        <Image
          src={product.images[0]}
          alt=""
          data-studio=""
          fill
          preload={preload}
          sizes={sizes}
          className={cn(fit, product.cutout && "transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]")}
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            data-secondary
            data-studio={product.cutout ? "" : undefined}
            fill
            preload={false}
            sizes={sizes}
            className={cn(fit, "opacity-0")}
          />
        )}
        {(isNew || product.compareAtPrice || isSoldOut) && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold leading-none",
              isSoldOut ? "text-ink-soft" : product.compareAtPrice ? "text-sale" : "text-brand"
            )}
          >
            {isSoldOut ? "Sold out" : product.compareAtPrice ? "Sale" : "New"}
          </span>
        )}
        {product.colors.length > 1 && (
          <span className="absolute bottom-3 left-3 flex gap-1.5">
            {product.colors.map(c => (
              <span key={c.name} className="size-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: c.hex }} />
            ))}
          </span>
        )}
      </div>
      <div className="px-1 pt-3">
        <h3 className="text-[15px] font-semibold leading-5 tracking-[-0.01em] text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-[22px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-[14px] tabular-nums">
          {product.compareAtPrice ? (
            <>
              <span className="font-medium text-sale">{formatPrice(product.price)}</span>{" "}
              <s className="text-ink-faint">{formatPrice(product.compareAtPrice)}</s>
            </>
          ) : (
            <span className="text-ink-soft">{formatPrice(product.price)}</span>
          )}
        </p>
      </div>
    </article>
  );
}
