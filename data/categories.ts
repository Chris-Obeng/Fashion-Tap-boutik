import { products } from "./products";
import type { CategoryId } from "@/types";

const bySlug = (slug: string) => products.find(p => p.slug === slug);
const pexels = (id: number, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const shopFloor = { src: "/products/shop-floor-hero.jpg", alt: "Two shoppers in striped knit polos at a rail in our Accra shop", position: "50% 30%" };
const knitPolo = { src: pexels(36699354, 1400), alt: "Man in a cream striped knit polo leaning on a stadium rail", position: "35% 30%" };
const crochetShirt = { src: pexels(34626700, 1400), alt: "Man in a black and white striped crochet shirt against a brick wall", position: "50% 30%" };

/**
 * Editorial imagery for the homepage: our own shop photo plus Pexels photos (free for
 * commercial use, no attribution required) and studio renders from the catalogue.
 */
export const editorial = {
  // The same three looks on every screen: phones cross-fade between them one at a time, desktop
  // shows them side by side with our own shop floor in the wider centre panel.
  heroMobile: [shopFloor, knitPolo, crochetShirt],
  heroSlides: [{ label: "Our edit", backdrop: "#d9d4cc", frames: [knitPolo, shopFloor, crochetShirt] }],
  // Social cards need an absolute URL, so they keep a Pexels portrait.
  og: { src: pexels(8498706, 1400), alt: "Woman in a cream two-piece looking over her shoulder" },
  // Studio render from the catalogue, shown on its own colour field like the product cards.
  bags: { src: bySlug("cobalt-leather-handbag")?.images[0] ?? "", alt: "Cobalt blue structured leather handbag", tint: bySlug("cobalt-leather-handbag")?.tint, studio: true },
  gift: { src: pexels(13976057, 1400), alt: "White and red gift boxes tied with satin ribbon, a red rose on top" },
};

/**
 * The single source of truth for shop categories. "new" and "tees" are pseudo-categories
 * (tag filters, not real categories) but are surfaced everywhere a real one is.
 */
const tile = (id: CategoryId | "new" | "tees", name: string, slug: string) => {
  const p = bySlug(slug);
  return { id, name, image: p?.images[0] ?? "", tint: p?.tint ?? "#f1f1f1", cutout: p?.cutout ?? false };
};

export const categories = [
  tile("new", "New in", "polka-dot-party-dress"),
  tile("tees", "Knit polos & shirts", "heritage-stripe-knit-polo"),
  tile("women", "Women", "scarlet-corset-gown"),
  tile("men", "Men", "crisp-white-shirt"),
  tile("shoes", "Shoes", "gold-metallic-pumps"),
  tile("bags", "Bags, purses & clutches", "cognac-leather-hobo"),
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
