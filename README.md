# Fashion Tap Boutik

Storefront for [Fashion Tap Boutik](https://www.tiktok.com/@fashiontapboutik), Accra. Next.js 16 (App Router, Turbopack), Tailwind v4, HeroUI, Zustand. Frontend only for now; Supabase and an admin dashboard come next.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Catalogue (placeholder)

Products are SceneSKU demo packs, curated for a luxury edit:

- `data/curation.json`: which packs we list, plus our own name, category, GH₵ price (pesewas), colours, sizes and card tint.
- `data/scenesku.json`: committed snapshot of SceneSKU images and copy. The site reads only this file, so no API key ships to the browser.
- `pnpm sync:products`: refreshes the snapshot. Needs `SCENESKU_API_KEY` in `.env.local` (see `.env.example`).

Prices and stock are illustrative. When Supabase lands, swap the adapters in `lib/products.ts` and the payment boundary in `lib/payments.ts` (Paystack is mocked).

## Where things live

| Path | What |
| --- | --- |
| `app/(storefront)` | Home, shop, product, orders |
| `app/checkout` | Guest checkout (delivery in Accra or pickup in Osu) |
| `components/shared` | Header, footer, product card, search |
| `lib/config.ts` | Store contacts (TikTok, WhatsApp), delivery fees |
| `PRODUCT.md` / `DESIGN.md` | Product truth and the visual system |
