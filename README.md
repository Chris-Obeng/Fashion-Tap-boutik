# Fashion Tap Boutik

Storefront for [Fashion Tap Boutik](https://www.tiktok.com/@fashiontapboutik), Accra. Next.js 16 (App Router, Turbopack), Tailwind v4, HeroUI, Zustand. Frontend only for now; Supabase and an admin dashboard come next.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Catalogue (placeholder)

50 demo products, curated for a luxury edit:

- `data/curation.json`: what we list, plus our own name, category, GH₵ price (pesewas), colours, sizes, card tint and (for DummyJSON items) copy.
- `data/scenesku.json`: snapshot of SceneSKU photos and copy (26 items).
- `data/dummyjson.json`: snapshot of DummyJSON 3D renders (24 items: handbags, heels, watches, gowns, earrings).
- `pnpm sync:products`: refreshes both snapshots. Needs `SCENESKU_API_KEY` in `.env.local` (see `.env.example`). The site reads only the snapshots, so no key ships to the browser.
- Homepage editorial photos are from Pexels (free for commercial use).

Some DummyJSON renders carry real brand marks (a tote plate). Replace them with the store's own photos before launch.

Prices and stock are illustrative. When Supabase lands, swap the adapters in `lib/products.ts` and the payment boundary in `lib/payments.ts` (Paystack is mocked).

## Where things live

| Path | What |
| --- | --- |
| `app/(storefront)` | Home, shop, product, orders |
| `app/checkout` | Guest checkout (nationwide delivery or pickup in store) |
| `components/shared` | Header, footer, product card, search |
| `lib/config.ts` | Store contacts (TikTok, WhatsApp), nationwide delivery regions and fees |
| `lib/search.ts` | Search ranking and fashion synonyms |
| `lib/haptics.ts` | Haptic tick on add-to-bag and order placed |
| `PRODUCT.md` / `DESIGN.md` | Product truth and the visual system |
