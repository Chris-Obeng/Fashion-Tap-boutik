import { products } from "./products";
import type { CategoryId } from "@/types";

const bySlug = (slug: string) => products.find(p => p.slug === slug);
const image = (slug: string, index = 0) => bySlug(slug)?.images[index] ?? "";

/** Editorial imagery for the homepage: lifestyle scenes from the catalogue itself. */
export const editorial = {
  heroMobile: image("pleated-wrap-dress", 5),
  heroTriptych: [image("stand-collar-pleat-dress", 5), image("pleated-wrap-dress", 5), image("camel-leather-tote", 5)],
  jewellery: image("solitaire-pendant", 1),
  fragrance: image("rose-crystal-parfum", 4),
};

/**
 * The single source of truth for shop categories. "new" is a pseudo-category
 * (a tag filter, not a real category) but is surfaced everywhere a real one is.
 * Each tile shows a studio shot on its own colour field.
 */
export const categories = [
  { id: "new", name: "New in", image: image("sculpted-eau-de-parfum"), tint: "#f0e5d3" },
  { id: "women", name: "Women", image: image("stand-collar-pleat-dress"), tint: "#e1e5d2" },
  { id: "men", name: "Men", image: image("crisp-white-shirt"), tint: "#e4e9ef" },
  { id: "shoes", name: "Shoes", image: image("heritage-leather-boots"), tint: "#ead9cb" },
  { id: "accessories", name: "Bags & jewellery", image: image("camel-leather-tote"), tint: "#efdfcc" },
  { id: "beauty", name: "Beauty", image: image("rose-crystal-parfum"), tint: "#f2e0e3" },
] as const satisfies readonly { id: CategoryId | "new"; name: string; image: string; tint: string }[];

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
