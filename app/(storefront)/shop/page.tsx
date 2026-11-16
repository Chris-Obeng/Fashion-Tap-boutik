import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { shopSections, type ShopCategoryId } from "@/data/categories";
import { ShopClient } from "@/components/shop/shop-client";

export const metadata: Metadata = {
  title: "Shop the collection",
  description:
    "Shop women's, men's and accessories from Fashion Tap Boutik in Accra. A considered edit of everyday pieces.",
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const { category } = await searchParams;
  const active: ShopCategoryId = shopSections.some(s => s.id === category)
    ? (category as ShopCategoryId)
    : "all";
  const products = await getProducts(active);
  return <ShopClient products={products} category={active} />;
}
