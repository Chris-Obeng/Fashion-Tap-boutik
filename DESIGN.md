# Design

Reference pinned by the owner: beatsbydre.com and apple.com. Image-led, generous, very little text. Mobile first.

## Colour

- Ground: white `--canvas`, Beats-gray sections `--mist #f1f1f1`, ink `#111`, secondary text `--ink-soft #595959`.
- Colour comes from the products. Every product has a pastel `tint` (in `data/curation.json`) that its card, gallery and thumbnails sit on. Studio shots use `mix-blend-mode: multiply` (`.tint-media img[data-studio]`) so white backdrops melt into the tint.
- Feature banners are full colour blocks matched to their photo (jewellery navy `#1c2436`, fragrance black).
- One brand accent, emerald `--brand #0a6b4e`: "New" labels, bag badge, focus ring, selection, confirmation. Sale price uses `--sale #c4161c`. No other accents.

## Type

Figtree (next/font) for everything. Display: semibold, `-0.03em` tracking, `1.04` leading (`.display`). Body 15–17px. Never below 12px.

## Shape and controls

- Product tiles 22px radius, gallery 28px, pill buttons fully rounded, minimum touch target 44px (primary buttons 48–56px).
- Primary action: black pill. On photography: white pill plus a translucent outline pill (`.pill-light`, `.pill-ghost`).
- Icons: lucide-react, 1.6–1.75 stroke. Brand marks (TikTok, WhatsApp) are inline SVG in `components/shared/social-icons.tsx`.

## Motion

- One authored moment: the hero photo settles from a slight push-in while the copy rises out of a blur (`hero-settle`, `rise-in`).
- Everything pressable scales to 0.97 on press. Card hover swaps to the lifestyle shot (pointer devices only).
- Custom curves only (`--ease-out`, `--ease-drawer`). Reduced motion removes movement and delays.

## Copy

Short. One line per idea. No eyebrows above headings. Never invent reviews, press or claims.
