import curation from "./curation.json";
import scenesku from "./scenesku.json";
import dummyjson from "./dummyjson.json";
import type { CategoryId, Product } from "@/types";

/**
 * Placeholder catalogue, refreshed with `pnpm sync:products`:
 *   - SceneSKU packs (data/scenesku.json): photographed studio + lifestyle scenes.
 *   - DummyJSON items (data/dummyjson.json): 3D renders on transparent backgrounds.
 *   - Pexels photo sets (ids in curation.json): tee, polo and shirt shoots, free for commercial use.
 * Joined with our own merchandising in data/curation.json (names, copy, GH₵ prices,
 * colours, sizes, tints). Prices and stock are illustrative. Replace with Supabase.
 */
type Curated = {
  source?: "scenesku" | "dummyjson" | "pexels";
  id: string; slug: string; name: string; category: CategoryId; price: number; compareAtPrice?: number;
  tint: string; colors: [string, string][]; sizes: string[]; stockOut?: string[]; tags: Product["tags"];
  description?: string; details?: string[];
  /** Pexels photo ids (source "pexels"): one shoot of the same garment. */
  images?: number[];
  /** Source image indexes to skip, e.g. lifestyle shots that crop the face mid-frame. */
  hideImages?: number[];
};
type Pack = { title: string | null; short: string | null; long: string | null; bullets: string[]; images: { url: string; title: string }[] };
type Render = { title: string; images: string[] };

const packs = scenesku as Record<string, Pack>;
const renders = dummyjson as Record<string, Render>;

const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

// DummyJSON paths contain apostrophes ("women's"), which encodeURI leaves alone.
const safeUrl = (url: string) => encodeURI(url).replace(/'/g, "%27");

export const products: Product[] = (curation.products as Curated[]).flatMap((item, index) => {
  const isRender = item.source === "dummyjson";
  const isPhotoSet = item.source === "pexels";
  const pack = isRender || isPhotoSet ? undefined : packs[item.id];
  const render = isRender ? renders[item.id] : undefined;
  const sourceImages = isPhotoSet ? (item.images ?? []).map(pexels) : (render?.images ?? pack?.images.map(i => i.url) ?? []).map(safeUrl);
  const images = sourceImages.filter((_, i) => !item.hideImages?.includes(i));
  if (!images.length) return [];
  return [{
    id: `${item.source ?? "scenesku"}-${item.id}`,
    slug: item.slug,
    name: item.name,
    price: item.price,
    ...(item.compareAtPrice ? { compareAtPrice: item.compareAtPrice } : {}),
    description: item.description ?? pack?.short ?? "",
    story: pack?.long ?? "",
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
