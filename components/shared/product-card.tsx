import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";

const soldOut = (p: Product) => p.sizes.every(s => s.stock === 0);

export function ProductCard({ product, preload = false }: { product: Product; preload?: boolean }) {
  const isSoldOut = soldOut(product);
  return (
    <article className="group min-w-0">
      <div className="card-media relative aspect-[4/5] overflow-hidden rounded-2xl bg-soft">
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="block size-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            preload={preload}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              data-secondary
              fill
              preload={false}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0"
            />
          )}
        </Link>
      </div>
      <div className="flex items-start justify-between gap-3 pt-3">
        <h3 className="text-[13px] font-medium leading-5 text-ink sm:text-sm">
          <Link href={`/product/${product.slug}`} className="transition-opacity hover:opacity-70">
            {product.name}
          </Link>
        </h3>
        <p className="shrink-0 text-[13px] tabular-nums sm:text-sm">
          {isSoldOut ? (
            <span className="text-ink-faint">Sold out</span>
          ) : product.compareAtPrice ? (
            <>
              <span className="text-sale">{formatPrice(product.price)}</span>{" "}
              <s className="text-ink-faint">{formatPrice(product.compareAtPrice)}</s>
            </>
          ) : (
            formatPrice(product.price)
          )}
        </p>
      </div>
    </article>
  );
}
