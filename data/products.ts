import curation from "./curation.json";
import scenesku from "./scenesku.json";
import dummyjson from "./dummyjson.json";
import type { CategoryId, Product } from "@/types";

/**
 * Placeholder catalogue, refreshed with `pnpm sync:products`:
 *   - SceneSKU packs (data/scenesku.json): photographed studio + lifestyle scenes.
 *   - DummyJSON items (data/dummyjson.json): 3D renders on transparent backgrounds.
 * Joined with our own merchandising in data/curation.json (names, copy, GH₵ prices,
 * colours, sizes, tints). Prices and stock are illustrative. Replace with Supabase.
 */
type Curated = {
  source?: "scenesku" | "dummyjson";
  id: string; slug: string; name: string; category: CategoryId; price: number; compareAtPrice?: number;
  tint: string; colors: [string, string][]; sizes: string[]; stockOut?: string[]; tags: ("new" | "featured")[];
  description?: string; details?: string[];
};
type Pack = { title: string | null; short: string | null; long: string | null; bullets: string[]; images: { url: string; title: string }[] };
type Render = { title: string; images: string[] };

const packs = scenesku as Record<string, Pack>;
const renders = dummyjson as Record<string, Render>;

// DummyJSON paths contain apostrophes ("women's"), which encodeURI leaves alone.
const safeUrl = (url: string) => encodeURI(url).replace(/'/g, "%27");

export const products: Product[] = (curation.products as Curated[]).flatMap((item, index) => {
  const isRender = item.source === "dummyjson";
  const pack = isRender ? undefined : packs[item.id];
  const render = isRender ? renders[item.id] : undefined;
  const images = (render?.images ?? pack?.images.map(i => i.url) ?? []).map(safeUrl);
  if (!images.length) return [];
  return [{
    id: `${item.source ?? "scenesku"}-${item.id}`,
    slug: item.slug,
    name: item.name,
    price: item.price,
    ...(item.compareAtPrice ? { compareAtPrice: item.compareAtPrice } : {}),
    description: item.description ?? pack?.short ?? "",
    story: isRender ? "" : pack?.long ?? "",
    images,
    cutout: isRender,
    tint: item.tint,
    category: item.category,
    colors: item.colors.map(([name, hex]) => ({ name, hex })),
    // Illustrative stock until inventory comes from the backend.
    sizes: item.sizes.map(name => ({ name, stock: item.stockOut?.includes(name) ? 0 : 3 + (index % 5) })),
    tags: item.tags,
    details: item.details ?? pack?.bullets ?? [],
  }];
});
