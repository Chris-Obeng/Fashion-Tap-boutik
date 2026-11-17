import { products } from "./products";
import type { CategoryId } from "@/types";

const bySlug = (slug: string) => products.find(p => p.slug === slug);
const image = (slug: string, index = 0) => bySlug(slug)?.images[index] ?? "";
const pexels = (id: number, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/**
 * Editorial imagery for the homepage: Pexels photos (free for commercial use, no
 * attribution required) of West African women, plus lifestyle scenes from the catalogue.
 */
export const editorial = {
  // Clean studio shoots (Pexels, free for commercial use). Phones cross-fade between single
  // portraits (womenswear first, then the T-shirt edit); desktop cross-fades between triptychs.
  heroMobile: [
    { src: pexels(8498706, 1400), alt: "Woman in a cream two-piece looking over her shoulder", position: "50% 25%" },
    { src: pexels(8422383, 1400), alt: "Man in a cream knit resort polo and round glasses", position: "50% 25%" },
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
      label: "Tees, polos & shirts",
      backdrop: "#e4e4e2",
      frames: [
        { src: pexels(8422379, 1100), alt: "Man in a cream knit polo and trousers, full length", position: "50% 30%" },
        { src: pexels(8422383, 1400), alt: "Man in a cream knit resort polo and round glasses", position: "50% 25%" },
        { src: pexels(8422386, 1100), alt: "Man in a cream knit polo, mid-stride", position: "50% 30%" },
      ],
    },
  ],
  bags: { src: pexels(27108129, 1400), alt: "Woman in a satin dress with a black leather handbag" },
  jewellery: { src: image("solitaire-pendant", 1), alt: "Solitaire pendant in a navy velvet box on marble" },
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
  tile("tees", "Tees, polos & shirts", "cream-resort-polo"),
  tile("women", "Women", "scarlet-corset-gown"),
  tile("men", "Men", "crisp-white-shirt"),
  tile("shoes", "Shoes", "gold-metallic-pumps"),
  tile("bags", "Bags, purses & clutches", "gold-cage-clutch"),
  tile("accessories", "Watches & jewellery", "two-tone-jubilee-watch"),
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
