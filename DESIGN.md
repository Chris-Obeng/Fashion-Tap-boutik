# Design

Reference pinned by the owner: beatsbydre.com and apple.com. Image-led, generous, very little text. Mobile first.

## Colour

- Ground: white `--canvas`, Beats-gray sections `--mist #f1f1f1`, ink `#111`, secondary text `--ink-soft #595959`.
- Colour comes from the products. Every product has a pastel `tint` (in `data/curation.json`) that its card, gallery and thumbnails sit on. Studio shots use `mix-blend-mode: multiply` (`.tint-media img[data-studio]`) so white backdrops melt into the tint.
- Feature banners are full colour blocks matched to their photo (jewellery navy `#1c2436`, fragrance black).
- One brand accent, the logo's pink `--brand #d4006f` (logo artwork is #E5087F): "New" labels, bag badge, focus ring, selection, confirmations, the TikTok band. Sale price uses `--sale #c4161c`. No other accents.
- Logo: always the real artwork (`components/shared/logo.tsx`). `light` variant on dark surfaces. Never redraw it.

## Type

Figtree (next/font) for everything. Display: semibold, `-0.03em` tracking, `1.04` leading (`.display`). Body 15–17px. Never below 12px.

## Shape and controls

- Product tiles 22px radius, gallery 28px, pill buttons fully rounded, minimum touch target 44px (primary buttons 48–56px).
- Buttons follow Beats: full pills, medium weight. Classes in `globals.css`: `.btn` + `.btn-primary` (ink), `.btn-outline` (ink hairline, fills on hover), `.btn-soft`, `.btn-light`, `.btn-ghost-light`; sizes `.btn-sm` / `.btn-lg`; commerce actions add `.btn-caps` (ADD TO BAG, CHECKOUT, PAY). Use `buttonClass()` for links.
- Icons: lucide-react, 1.6–1.75 stroke. Brand marks (TikTok, WhatsApp) are inline SVG in `components/shared/social-icons.tsx`.

## Motion

- One authored moment: the hero photo settles from a slight push-in while the copy rises out of a blur (`hero-settle`, `rise-in`).
- Everything pressable scales to 0.97 on press. Card hover swaps to the lifestyle shot (pointer devices only).
- Added to bag: a card drops under the header (spring, swipe up to dismiss), the bag badge bumps, and phones get a short haptic tick (`lib/haptics.ts`).
- Cut-out renders (`product.cutout`) are contained with padding; all studio images and renders multiply into the tint.
- Custom curves only (`--ease-out`, `--ease-drawer`). Reduced motion removes movement and delays.

## Copy

Short. One line per idea. No eyebrows above headings. Never invent reviews, press or claims.
