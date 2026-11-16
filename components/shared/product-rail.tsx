import type { Product } from "@/types";
import { ProductCard } from "@/components/shared/product-card";

/** Mobile: edge-to-edge snap carousel that peeks the next card. Desktop: a 4-column grid. */
export function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="hide-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:gap-4 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
      {products.map(product => (
        <div key={product.id} className="w-[64vw] max-w-[300px] shrink-0 snap-start sm:w-[38vw] lg:w-auto lg:max-w-none">
          <ProductCard product={product} sizes="(max-width: 640px) 64vw, (max-width: 1024px) 38vw, 25vw" />
        </div>
      ))}
    </div>
  );
}
