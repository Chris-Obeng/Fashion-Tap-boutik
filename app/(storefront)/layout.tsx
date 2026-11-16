import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { CartPanel } from "@/components/cart/cart-panel";
import { AddedToBag } from "@/components/cart/added-to-bag";
import { getProducts, toSearchItem } from "@/lib/products";

export default async function StorefrontLayout({ children }: LayoutProps<"/">) {
  // Search runs fully client-side over the catalogue, so the layout passes a
  // minimal snapshot down once: no API round-trips while typing.
  const products = await getProducts();
  const searchItems = products.map(toSearchItem);

  return (
    <>
      <Header searchItems={searchItems} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartPanel />
      <AddedToBag />
    </>
  );
}
