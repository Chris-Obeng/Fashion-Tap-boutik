import type { Product } from "@/types";
import { ProductCard } from "@/components/shared/product-card";

/** Mobile: edge-to-edge snap carousel. Desktop: a plain 4-column grid. */
export function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:gap-4 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:px-0">
      {products.map(product => (
        <div
          key={product.id}
          className="w-[68vw] max-w-[320px] shrink-0 snap-start sm:w-[40vw] lg:w-auto lg:max-w-none"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
