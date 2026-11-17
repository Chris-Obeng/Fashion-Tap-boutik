import { products } from "./products";
import type { CategoryId } from "@/types";

const bySlug = (slug: string) => products.find(p => p.slug === slug);
const pexels = (id: number, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/**
 * Editorial imagery for the homepage: Pexels photos (free for commercial use, no
 * attribution required) of West African women, plus lifestyle scenes from the catalogue.
 */
export const editorial = {
  // Phones open on our own shop floor, then cross-fade to knit and crochet looks (Pexels, free for
  // commercial use); desktop cross-fades between triptychs.
  heroMobile: [
    { src: "/products/shop-floor-hero.jpg", alt: "Two shoppers in striped knit polos at a rail in our Accra shop", position: "50% 30%" },
    { src: pexels(36699354, 1400), alt: "Man in a cream striped knit polo leaning on a stadium rail", position: "35% 30%" },
    { src: pexels(34626700, 1400), alt: "Man in a black and white striped crochet shirt against a brick wall", position: "50% 30%" },
  ],
  heroSlides: [
    {
      label: "Menswear",
      backdrop: "#cfc9d6",
      frames: [
        { src: pexels(28211217, 1100), alt: "Man in profile adjusting tortoiseshell glasses", position: "55% 30%" },
        { src: pexels(28211216, 1100), alt: "Man in a black puffer jacket and pearl necklace", position: "50% 25%" },
        { src: pexels(28211218, 1100), alt: "Man in a black puffer jacket, hands folded", position: "50% 30%" },
      ],
    },
    {
      label: "Womenswear",
      backdrop: "#8b8d70",
      frames: [
        { src: pexels(8498750, 1400), alt: "Woman with curly hair in a cream jacket, close-up", position: "35% 40%" },
        { src: pexels(8498706, 1100), alt: "Woman in a cream two-piece looking over her shoulder", position: "50% 25%" },
        { src: pexels(8498758, 1100), alt: "Woman in a cream two-piece seated on a yellow chair", position: "50% 30%" },
      ],
    },
    {
      label: "Knit polos & shirts",
      backdrop: "#e4e4e2",
      frames: [
        { src: pexels(8422379, 1100), alt: "Man in a cream knit polo and trousers, full length", position: "50% 30%" },
        { src: pexels(8422383, 1400), alt: "Man in a cream knit resort polo and round glasses", position: "50% 25%" },
        { src: pexels(8422386, 1100), alt: "Man in a cream knit polo, mid-stride", position: "50% 30%" },
      ],
    },
  ],
  // Social cards need an absolute URL, so they keep a Pexels portrait.
  og: { src: pexels(8498706, 1400), alt: "Woman in a cream two-piece looking over her shoulder" },
  bags: { src: pexels(8491011, 1400), alt: "Woman in a white ruched dress holding a gold cage clutch" },
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
