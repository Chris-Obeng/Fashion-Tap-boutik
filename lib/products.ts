import { products } from "@/data/products";
import { categoryName } from "@/data/categories";
import { buildKeywords, search } from "@/lib/search";
import type { Product, SearchItem } from "@/types";

// Replace these adapters with Supabase queries when the backend is ready.
export async function getProducts(category?: string): Promise<Product[]> {
  return products.filter(p => {
    if (!category || category === "all") return true;
    if (category === "new") return p.tags.includes("new");
    if (category === "tees") return p.tags.includes("tee");
    return p.category === category;
  });
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find(p => p.slug === slug);
}

export async function getRelated(product: Product, limit = 8): Promise<Product[]> {
  return products
    .filter(p => p.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, limit);
}

export function toSearchItem(p: Product): SearchItem {
  const catName = categoryName(p.category);
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    category: p.category,
    categoryName: catName,
    image: p.images[0],
    tint: p.tint,
    cutout: p.cutout,
    soldOut: p.sizes.every(s => s.stock === 0),
    isNew: p.tags.includes("new"),
    colors: p.colors.map(c => c.name),
    keywords: buildKeywords([p.name, catName, p.category, ...p.colors.map(c => c.name), p.description]),
  };
}

export async function searchProducts(query: string): Promise<Product[]> {
  const items = products.map(p => ({ product: p, ...toSearchItem(p) }));
  return search(items, query).map(i => i.product);
}
