import { products } from "@/data/products";
import type { Product } from "@/types";

// Replace these adapters with API calls when the catalog service is ready.
export async function getProducts(category?: string): Promise<Product[]> {
  return products.filter(p => !category || category === "all" || (category === "new" ? p.tags.includes("new") : p.category === category));
}
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find(p => p.slug === slug);
}
export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  return products.filter(p => p.id !== product.id).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, limit);
}
