import curation from "./curation.json";
import scenesku from "./scenesku.json";
import type { CategoryId, Product } from "@/types";

/**
 * Placeholder catalogue: SceneSKU imagery and copy (data/scenesku.json, refreshed with
 * `pnpm sync:products`) joined with our own merchandising (data/curation.json).
 * Prices are illustrative GH₵ values. Replace with Supabase when the backend lands.
 */
type Curated = {
  id: string; slug: string; name: string; category: CategoryId; price: number; compareAtPrice?: number;
  tint: string; colors: [string, string][]; sizes: string[]; stockOut?: string[]; tags: ("new" | "featured")[];
};
type Pack = { title: string | null; short: string | null; long: string | null; bullets: string[]; images: { url: string; title: string }[] };

const packs = scenesku as Record<string, Pack>;

export const products: Product[] = (curation.products as Curated[]).flatMap((item, index) => {
  const pack = packs[item.id];
  if (!pack || !pack.images.length) return [];
  return [{
    id: item.id,
    slug: item.slug,
    name: item.name,
    price: item.price,
    ...(item.compareAtPrice ? { compareAtPrice: item.compareAtPrice } : {}),
    description: pack.short ?? "",
    story: pack.long ?? "",
    images: pack.images.map(i => i.url),
    tint: item.tint,
    category: item.category,
    colors: item.colors.map(([name, hex]) => ({ name, hex })),
    // Illustrative stock until inventory comes from the backend.
    sizes: item.sizes.map(name => ({ name, stock: item.stockOut?.includes(name) ? 0 : 3 + (index % 5) })),
    tags: item.tags,
    details: pack.bullets,
  }];
});
