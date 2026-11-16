import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { CartPanel } from "@/components/cart/cart-panel";
import { getProducts } from "@/lib/products";
import type { SearchItem } from "@/types";

export default async function StorefrontLayout({ children }: LayoutProps<"/">) {
  // Search runs fully client-side over the catalog, so the layout passes a
  // minimal snapshot down once — no API round-trips while typing.
  const products = await getProducts();
  const searchItems: SearchItem[] = products.map(p => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    category: p.category,
    image: p.images[0],
    soldOut: p.sizes.every(s => s.stock === 0),
  }));

  return (
    <>
      <Header searchItems={searchItems} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartPanel />
    </>
  );
}
