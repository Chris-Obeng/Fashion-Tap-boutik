const pexels = (id: string, width = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

/** Editorial imagery used by the homepage hero. */
export const editorial = {
  hero: pexels("17533400", 2000),
};

/**
 * The single source of truth for shop categories. "new" is a pseudo-category
 * (a tag filter, not a real category) but is surfaced everywhere a real one is.
 */
export const categories = [
  { id: "women", name: "Women", image: pexels("38290948", 1000) },
  { id: "men", name: "Men", image: pexels("36652124", 900) },
  { id: "accessories", name: "Accessories", image: pexels("135620", 800) },
  { id: "new", name: "New in", image: pexels("13699269", 1000) },
] as const;

export type ShopCategoryId = (typeof categories)[number]["id"] | "all";

/** Category filter pills in display order — nav, shop pills and validation all read from this. */
export const shopSections: { id: ShopCategoryId; name: string }[] = [
  { id: "all", name: "All" },
  ...categories.map(c => ({ id: c.id, name: c.name })),
];

export function categoryHref(id: ShopCategoryId) {
  return id === "all" ? "/shop" : `/shop?category=${id}`;
}
