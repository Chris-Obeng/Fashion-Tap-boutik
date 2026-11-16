import { products } from "./products";
import type { CategoryId } from "@/types";

const bySlug = (slug: string) => products.find(p => p.slug === slug);
const image = (slug: string, index = 0) => bySlug(slug)?.images[index] ?? "";
const pexels = (id: number, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/**
 * Editorial imagery for the homepage. Pexels photos (free for commercial use, no
 * attribution required) of Ghanaian and West African women, chosen for a store whose
 * customers are in Ghana; plus lifestyle scenes from the catalogue itself.
 */
export const editorial = {
  hero: { src: pexels(15238827, 1400), alt: "Woman in a scarlet gown walking down a sunlit street" },
  heroTriptych: [
    { src: pexels(2562497, 1000), alt: "Two women in red dresses posing in a garden" },
    { src: pexels(15238827, 1000), alt: "Woman in a scarlet gown walking down a sunlit street" },
    { src: pexels(29037464, 1000), alt: "Woman in a blush evening gown on a city street" },
  ],
  bags: { src: pexels(27108129, 1400), alt: "Woman in a satin dress with a black leather handbag" },
  jewellery: { src: image("solitaire-pendant", 1), alt: "Solitaire pendant in a navy velvet box on marble" },
  fragrance: { src: image("rose-crystal-parfum", 4), alt: "Rose Crystal Parfum bottle on black" },
};

/**
 * The single source of truth for shop categories. "new" is a pseudo-category
 * (a tag filter, not a real category) but is surfaced everywhere a real one is.
 */
const tile = (id: CategoryId | "new", name: string, slug: string) => {
  const p = bySlug(slug);
  return { id, name, image: p?.images[0] ?? "", tint: p?.tint ?? "#f1f1f1", cutout: p?.cutout ?? false };
};

export const categories = [
  tile("new", "New in", "polka-dot-party-dress"),
  tile("women", "Women", "scarlet-corset-gown"),
  tile("men", "Men", "crisp-white-shirt"),
  tile("shoes", "Shoes", "gold-metallic-pumps"),
  tile("bags", "Bags", "aqua-saffiano-tote"),
  tile("accessories", "Watches & jewellery", "two-tone-jubilee-watch"),
  tile("beauty", "Beauty", "rose-crystal-parfum"),
] as const;

export type ShopCategoryId = (typeof categories)[number]["id"] | "all";

/** Category filter pills in display order. Nav, shop pills and validation all read from this. */
export const shopSections: { id: ShopCategoryId; name: string }[] = [
  { id: "all", name: "All" },
  ...categories.map(c => ({ id: c.id, name: c.name })),
];

export function categoryHref(id: ShopCategoryId) {
  return id === "all" ? "/shop" : `/shop?category=${id}`;
}

export const categoryName = (id: string) => categories.find(c => c.id === id)?.name ?? id;
